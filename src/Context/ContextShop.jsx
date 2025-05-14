import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ContextShop = createContext();

const currency = "£";
const Postage_fee = 15;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

const convertToApiFormat = (stateObj) => {
  const result = [];
  Object.entries(stateObj).forEach(([productId, sizes]) => {
    Object.entries(sizes).forEach(([size, { quantity }]) => {
      result.push({ productId, size, quantity });
    });
  });
  return result;
};

const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
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
      saveToLocalStorage(WISHLIST_STORAGE_KEY, updated);
      return { ...state, WishlistProducts: updated };
    }
    case "SET_WISHLIST":
      saveToLocalStorage(WISHLIST_STORAGE_KEY, action.payload);
      return { ...state, WishlistProducts: action.payload };
    case "RESET_WISHLIST":
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
      saveToLocalStorage(CART_STORAGE_KEY, updated);
      return { ...state, CartProducts: updated };
    }
    case "SET_CART":
      saveToLocalStorage(CART_STORAGE_KEY, action.payload);
      return { ...state, CartProducts: action.payload };
    case "RESET_CART":
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
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!token && stored) setToken(stored);
  }, [token]);

  useEffect(() => {
    if (isFirstLoad) {
      dispatch({ type: "SET_CART", payload: loadFromLocalStorage(CART_STORAGE_KEY) });
      dispatch({ type: "SET_WISHLIST", payload: loadFromLocalStorage(WISHLIST_STORAGE_KEY) });
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    const syncCartWithServer = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/cart/get`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          const serverCart = convertToStateFormat(res.data.cart || []);
          const localCart = loadFromLocalStorage(CART_STORAGE_KEY);
          const mergedCart = { ...localCart };
          Object.entries(serverCart).forEach(([productId, sizes]) => {
            if (!mergedCart[productId]) mergedCart[productId] = {};
            Object.entries(sizes).forEach(([size, { quantity }]) => {
              mergedCart[productId][size] = Math.max(
                mergedCart[productId]?.[size]?.quantity || 0,
                quantity
              );
            });
          });
          dispatch({ type: "SET_CART", payload: mergedCart });
          await axios.post(
            `${backendUrl}/api/cart/sync`,
            { items: convertToApiFormat(mergedCart) },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (err) {
        console.error("Cart sync failed", err);
      }
    };

    const syncWishlistWithServer = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/wishlist/get`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          const serverWishlist = convertToStateFormat(res.data.wishlist || []);
          const localWishlist = loadFromLocalStorage(WISHLIST_STORAGE_KEY);
          const mergedWishlist = { ...localWishlist, ...serverWishlist };
          dispatch({ type: "SET_WISHLIST", payload: mergedWishlist });
          await axios.post(
            `${backendUrl}/api/wishlist/sync`,
            { items: convertToApiFormat(mergedWishlist) },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (err) {
        console.error("Wishlist sync failed", err);
      }
    };

    if (token && !isFirstLoad) {
      syncCartWithServer();
      syncWishlistWithServer();
    }
  }, [token, isFirstLoad]);

  const AddCart = async (itemId, productSize) => {
    dispatch({ type: "ADD_TO_CART", payload: { cartItemId: itemId, cartSize: productSize } });
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { ItemId: itemId, size: productSize },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        toast.error("Failed to update cart on server");
      }
    } else {
      toast.info("Added to cart locally. Log in to sync.");
    }
  };

  const AddToWishlist = async (itemId, productSize = "default") => {
    const isWishlisted = state.WishlistProducts?.[itemId]?.[productSize];
    dispatch({ type: "ADD_TO_WISHLIST", payload: { itemId, productSize } });
    if (token) {
      try {
        const url = isWishlisted ? "remove" : "add";
        await axios.post(
          `${backendUrl}/api/wishlist/${url}`,
          { productId: itemId, size: productSize },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        toast.error("Failed to update wishlist on server");
      }
    } else if (!isWishlisted) {
      toast.info("Added to wishlist locally. Log in to sync.");
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { updateItemId: itemId, size, quantity } });
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update-item`,
          { ItemId: itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        toast.error("Failed to update quantity on server");
      }
    }
  };

  const syncLocalDataToAccount = async () => {
    if (!token) return;
    try {
      await axios.post(
        `${backendUrl}/api/cart/sync`,
        { items: convertToApiFormat(state.CartProducts) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await axios.post(
        `${backendUrl}/api/wishlist/sync`,
        { items: convertToApiFormat(state.WishlistProducts) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Synced local data with account");
    } catch {
      toast.error("Failed to sync account data");
    }
  };

  const GetCartNum = () => Object.values(state.CartProducts).reduce((acc, sizes) => acc + Object.values(sizes).reduce((sum, { quantity }) => sum + quantity, 0), 0);
  const Getwishlistnum = () => Object.values(state.WishlistProducts).reduce((acc, sizes) => acc + Object.keys(sizes).length, 0);
  const GetCartTotal = () => {
    if (!products.length) return 0;
    return Object.entries(state.CartProducts).reduce((total, [itemId, sizes]) => {
      const item = products.find((p) => String(p._id) === String(itemId));
      if (!item) return total;
      const subtotal = Object.values(sizes).reduce((sum, { quantity }) => sum + item.price * quantity, 0);
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