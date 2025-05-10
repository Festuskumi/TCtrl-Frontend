import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ContextShop = createContext();

const currency = "£";
const Postage_fee = 15;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Local storage keys
const CART_STORAGE_KEY = "localCart";
const WISHLIST_STORAGE_KEY = "localWishlist";

const initialState = {
  searchbar: "",
  showsearchbar: false,
  WishlistProducts: {},
  CartProducts: {},
};

const convertToStateFormat = (array) => {
  const formatted = {};
  array.forEach(({ product, productId, size, quantity }) => {
    const id = product?._id || productId;
    if (!formatted[id]) formatted[id] = {};
    formatted[id][size] = { quantity };
  });
  return formatted;
};

// Convert state format to array format for API
const convertToApiFormat = (stateObj) => {
  const result = [];
  Object.entries(stateObj).forEach(([productId, sizes]) => {
    Object.entries(sizes).forEach(([size, { quantity }]) => {
      result.push({ productId, size, quantity });
    });
  });
  return result;
};

// Load data from local storage
const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return {};
  }
};

// Save data to local storage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const shopReducer = (state, action) => {
  let updated;
  
  switch (action.type) {
    case "SET_SEARCHBAR":
      return { ...state, searchbar: action.payload };
    case "TOGGLE_SEARCHBAR":
      return { ...state, showsearchbar: !state.showsearchbar };
    case "ADD_TO_WISHLIST": {
      const { itemId, productSize } = action.payload;
      updated = { ...state.WishlistProducts };
      if (updated[itemId]?.[productSize]) {
        delete updated[itemId][productSize];
        if (Object.keys(updated[itemId]).length === 0) delete updated[itemId];
      } else {
        if (!updated[itemId]) updated[itemId] = {};
        updated[itemId][productSize] = { quantity: 1 };
      }
      
      // Save to local storage
      saveToLocalStorage(WISHLIST_STORAGE_KEY, updated);
      
      return { ...state, WishlistProducts: updated };
    }
    case "SET_WISHLIST":
      // Save to local storage
      saveToLocalStorage(WISHLIST_STORAGE_KEY, action.payload);
      return { ...state, WishlistProducts: action.payload };
    case "RESET_WISHLIST":
      // Clear local storage
      saveToLocalStorage(WISHLIST_STORAGE_KEY, {});
      return { ...state, WishlistProducts: {} };
    case "ADD_TO_CART": {
      const { cartItemId, cartSize } = action.payload;
      updated = { ...state.CartProducts };
      if (!cartSize) {
        toast.error("Please select a size");
        return state;
      }
      if (!updated[cartItemId]) updated[cartItemId] = {};
      updated[cartItemId][cartSize] = {
        quantity: (updated[cartItemId][cartSize]?.quantity || 0) + 1,
      };
      
      // Save to local storage
      saveToLocalStorage(CART_STORAGE_KEY, updated);
      
      return { ...state, CartProducts: updated };
    }
    case "UPDATE_QUANTITY": {
      const { updateItemId, size, quantity } = action.payload;
      updated = { ...state.CartProducts };
      if (quantity === 0) {
        delete updated[updateItemId]?.[size];
        if (Object.keys(updated[updateItemId] || {}).length === 0)
          delete updated[updateItemId];
      } else {
        if (!updated[updateItemId]) updated[updateItemId] = {};
        updated[updateItemId][size] = { quantity };
      }
      
      // Save to local storage
      saveToLocalStorage(CART_STORAGE_KEY, updated);
      
      return { ...state, CartProducts: updated };
    }
    case "SET_CART":
      // Save to local storage
      saveToLocalStorage(CART_STORAGE_KEY, action.payload);
      return { ...state, CartProducts: action.payload };
    case "RESET_CART":
      // Clear local storage
      saveToLocalStorage(CART_STORAGE_KEY, {});
      return { ...state, CartProducts: {} };
    default:
      return state;
  }
};

const ContextShopProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/products/list`);
        if (res.data.success) setProducts(res.data.products);
        else toast.error(res.data.message);
      } catch {
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  // Load token from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!token && stored) setToken(stored);
  }, [token]);

  // Load initial local cart and wishlist data
  useEffect(() => {
    if (isFirstLoad) {
      const localCart = loadFromLocalStorage(CART_STORAGE_KEY);
      const localWishlist = loadFromLocalStorage(WISHLIST_STORAGE_KEY);
      
      dispatch({ type: "SET_CART", payload: localCart });
      dispatch({ type: "SET_WISHLIST", payload: localWishlist });
      
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  // Merge local cart with server cart when user logs in
  useEffect(() => {
    const syncCartWithServer = async () => {
      try {
        // First get the server cart
        const res = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (res.data.success) {
          // Get local cart items
          const localCart = loadFromLocalStorage(CART_STORAGE_KEY);
          
          // Merge local and server carts
          const serverCart = convertToStateFormat(res.data.cart || []);
          const mergedCart = { ...localCart };
          
          // Add server items to merged cart
          Object.entries(serverCart).forEach(([productId, sizes]) => {
            if (!mergedCart[productId]) mergedCart[productId] = {};
            
            Object.entries(sizes).forEach(([size, details]) => {
              // If item exists in both, keep the higher quantity
              if (mergedCart[productId][size]) {
                mergedCart[productId][size] = {
                  quantity: Math.max(
                    mergedCart[productId][size].quantity,
                    details.quantity
                  ),
                };
              } else {
                mergedCart[productId][size] = details;
              }
            });
          });
          
          // Update state with merged cart
          dispatch({ type: "SET_CART", payload: mergedCart });
          
          // Sync merged cart to server
          const cartItemsToSync = convertToApiFormat(mergedCart);
          
          // Sync all cart items to server
          await axios.post(
            `${backendUrl}/api/cart/sync`,
            { items: cartItemsToSync },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (err) {
        console.error("Cart sync failed", err);
      }
    };
    
    const syncWishlistWithServer = async () => {
      try {
        // First get the server wishlist
        const res = await axios.post(
          `${backendUrl}/api/wishlist/get`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (res.data.success) {
          // Get local wishlist items
          const localWishlist = loadFromLocalStorage(WISHLIST_STORAGE_KEY);
          
          // Merge local and server wishlists
          const serverWishlist = convertToStateFormat(res.data.wishlist || []);
          const mergedWishlist = { ...localWishlist, ...serverWishlist };
          
          // Update state with merged wishlist
          dispatch({ type: "SET_WISHLIST", payload: mergedWishlist });
          
          // Sync merged wishlist to server
          const wishlistItemsToSync = convertToApiFormat(mergedWishlist);
          
          // Sync all wishlist items to server
          await axios.post(
            `${backendUrl}/api/wishlist/sync`,
            { items: wishlistItemsToSync },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (err) {
        console.error("Wishlist sync failed", err);
      }
    };
    
    // When token changes (user logs in), sync local data with server
    if (token && !isFirstLoad) {
      syncCartWithServer();
      syncWishlistWithServer();
    }
  }, [token, isFirstLoad]);

  const AddCart = async (itemId, productSize) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { cartItemId: itemId, cartSize: productSize },
    });

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          {
            ItemId: itemId,
            size: productSize,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to update cart on server.");
      }
    } else {
      // Show sign-in notification only if it hasn't been shown yet
      if (!isNotificationShown) {
        toast.info(
          "Item added to cart. Items will be saved locally and transferred to your account when you sign in.",
          {
            autoClose: 5000,
            onClick: () => navigate("/login"),
          }
        );
        setIsNotificationShown(true);
        
        // Reset the notification flag after 5 minutes
        setTimeout(() => {
          setIsNotificationShown(false);
        }, 300000); // 5 minutes in milliseconds
      }
    }
  };

  const AddToWishlist = async (itemId, productSize = "default") => {
    const isWishlisted = state.WishlistProducts?.[itemId]?.[productSize];

    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: { itemId, productSize },
    });

    if (token) {
      try {
        if (isWishlisted) {
          await axios.post(
            `${backendUrl}/api/wishlist/remove`,
            {
              productId: itemId,
              size: productSize,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else {
          await axios.post(
            `${backendUrl}/api/wishlist/add`,
            {
              productId: itemId,
              size: productSize,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
      } catch (err) {
        console.error(err);
        toast.error("Wishlist update failed.");
      }
    } else if (!isWishlisted) {
      // Only show notification for adding to wishlist, not removing
      toast.info(
        "Item added to wishlist. Items will be saved locally and transferred to your account when you sign in.",
        {
          autoClose: 3000,
          onClick: () => navigate("/login"),
        }
      );
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { updateItemId: itemId, size, quantity },
    });

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update-item`,
          {
            ItemId: itemId,
            size,
            quantity,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.error(err);
        toast.error("Quantity update failed.");
      }
    }
  };

  // Sync all local data to account after login
  const syncLocalDataToAccount = async () => {
    if (!token) return;
    
    try {
      // Convert state objects to arrays for API
      const cartItems = convertToApiFormat(state.CartProducts);
      const wishlistItems = convertToApiFormat(state.WishlistProducts);
      
      // Sync cart items
      await axios.post(
        `${backendUrl}/api/cart/sync`,
        { items: cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Sync wishlist items
      await axios.post(
        `${backendUrl}/api/wishlist/sync`,
        { items: wishlistItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Your cart and wishlist have been synced to your account");
    } catch (err) {
      console.error("Failed to sync data to account", err);
      toast.error("Failed to sync your cart and wishlist to your account");
    }
  };

  const GetCartNum = () =>
    Object.values(state.CartProducts).reduce(
      (acc, sizes) => acc + Object.values(sizes).reduce((sum, { quantity }) => sum + quantity, 0),
      0
    );

  const Getwishlistnum = () => 
    Object.values(state.WishlistProducts).reduce(
      (acc, sizes) => acc + Object.keys(sizes).length, 
      0
    );

  const GetCartTotal = () => {
    if (!products.length) return 0;
    return Object.entries(state.CartProducts).reduce((total, [itemId, sizes]) => {
      const item = products.find((p) => String(p._id) === String(itemId));
      if (!item) return total;
      const subtotal = Object.values(sizes).reduce(
        (sum, { quantity }) => sum + item.price * quantity,
        0
      );
      return total + subtotal;
    }, 0);
  };

  return (
    <ContextShop.Provider
      value={{
        products,
        currency,
        Postage_fee,
        backendUrl,
        token,
        setToken,
        navigate,
        dispatch,
        searchbar: state.searchbar,
        setsearchbar: (v) => dispatch({ type: "SET_SEARCHBAR", payload: v }),
        showsearchbar: state.showsearchbar,
        setShowSearchbar: () => dispatch({ type: "TOGGLE_SEARCHBAR" }),
        WishlistProducts: state.WishlistProducts,
        AddToWishlist,
        Getwishlistnum,
        CartProducts: state.CartProducts,
        AddCart,
        updateQuantity,
        GetCartNum,
        GetCartTotal,
        syncLocalDataToAccount,
      }}
    >
      {children}
    </ContextShop.Provider>
  );
};

export default ContextShopProvider;