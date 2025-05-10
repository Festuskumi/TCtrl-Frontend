import React, { useContext, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import Heading from '../Components/Heading';
import CartTotalCost from '../Components/CartTotalCost';
import PersonalInfoForm from '../Components/PersonalInfoForm';
import ShippingForm from '../Components/ShippingForm';
import { ContextShop } from '../Context/ContextShop';
import { toast } from 'react-toastify';
import {
  CreditCard, Truck, ShoppingBag, Loader, ChevronRight, CheckCircle,
  ShieldCheck, Lock, MapPin, Mail, Phone, User, Globe
} from 'lucide-react';

// Validation schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" })
});

const shippingInfoSchema = z.object({
  street: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  county: z.string().min(1, { message: "County is required" }),
  postcode: z.string().min(1, { message: "Postcode is required" }),
  country: z.string().min(1, { message: "Country is required" })
});

const checkoutSchema = personalInfoSchema.merge(shippingInfoSchema);

const OrderPlaced = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const {
    navigate,
    backendUrl,
    token,
    CartProducts,
    GetCartTotal,
    Postage_fee,
    products,
    dispatch,
  } = useContext(ContextShop);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid: isFormValid },
    getValues,
    trigger,
    watch
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      county: '',
      postcode: '',
      country: ''
    }
  });

  // Watch all form fields
  const personalInfoFields = watch(['firstName', 'lastName', 'email', 'phone']);
  const shippingInfoFields = watch(['street', 'city', 'county', 'postcode', 'country']);

  // Check if personal info is valid
  const isPersonalInfoValid = useMemo(() => {
    return personalInfoFields.every(field => field && field.trim().length > 0) && 
           !errors.firstName && 
           !errors.lastName && 
           !errors.email && 
           !errors.phone;
  }, [personalInfoFields, errors]);

  // Check if shipping info is valid
  const isShippingInfoValid = useMemo(() => {
    return shippingInfoFields.every(field => field && field.trim().length > 0) && 
           !errors.street && 
           !errors.city && 
           !errors.county && 
           !errors.postcode && 
           !errors.country;
  }, [shippingInfoFields, errors]);

  const paymentMethods = useMemo(() => [
    {
      id: 'stripe',
      name: 'Credit Card (Stripe)',
      description: 'Pay securely with Visa, Mastercard, AMEX, or Discover',
      icon: <CreditCard size={20} className="text-blue-600" />
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Fast, secure payments with PayPal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" className="text-blue-700">
          <path d="M7.144 19.532l1.049-5.751c.11-.606.691-1.002 1.304-.948 2.155.192 6.877.1 8.818-4.002 2.554-5.397-.59-7.769-6.295-7.769H7.43a1.97 1.97 0 0 0-1.944 1.655L2.77 19.507a.857.857 0 0 0 .846.994h2.368a1.18 1.18 0 0 0 1.161-.969z" />
          <path d="M7.967 22.522a.74.74 0 0 0 .666.416h2.313c.492 0 .923-.351 1.003-.837l.759-4.601c.095-.523.597-.866 1.127-.819 1.86.166 5.567-.118 6.698-3.27.797-2.216.175-5.207-3.846-5.207h-3.749a1.96 1.96 0 0 0-1.913 1.592l-.261 1.379" />
        </svg>
      )
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay in cash when your order is delivered',
      icon: <Truck size={20} className="text-green-600" />
    }
  ], []);

  const handleNextStep = async (nextStep) => {
    if (step === 1) {
      const isValid = await trigger(['firstName', 'lastName', 'email', 'phone']);
      if (isValid) setStep(nextStep);
    } else if (step === 2) {
      const isValid = await trigger(['street', 'city', 'county', 'postcode', 'country']);
      if (isValid) setStep(nextStep);
    }
  };

  const onSubmitOrder = async (data) => {
    setIsSubmitting(true);
    try {
      const orderProducts = [];

      for (const productId in CartProducts) {
        const sizeObj = CartProducts[productId];
        const product = products.find((p) => String(p._id) === String(productId));
        if (!product) continue;

        for (const size in sizeObj) {
          const quantity = sizeObj[size]?.quantity;
          if (quantity > 0) {
            orderProducts.push({
              productId: product._id,
              title: product.title,
              price: product.price,
              image: product.image,
              size,
              quantity,
            });
          }
        }
      }

      if (orderProducts.length === 0) {
        toast.warning("Cart is empty. Cannot place an order.");
        setIsSubmitting(false);
        return;
      }

      const orderDetails = {
        address: data,
        products: orderProducts,
        amount: GetCartTotal() + Postage_fee,
      };

      const endpoint =
        paymentMethod === 'stripe' ? '/api/order/stripe' :
        paymentMethod === 'paypal' ? '/api/order/paypal' :
        '/api/order/place';

      const response = await axios.post(`${backendUrl}${endpoint}`, orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        dispatch({ type: 'RESET_CART' });
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          toast.success('Order placed successfully');
          navigate('/orders');
        }
      } else {
        toast.error(response.data.message || 'Order failed');
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error('Something went wrong while placing your order');
      setIsSubmitting(false);
    }
  };

  const ProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="w-full absolute top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
        {[{ icon: <User />, stepNum: 1, label: "Information" },
          { icon: <MapPin />, stepNum: 2, label: "Shipping" },
          { icon: <CreditCard />, stepNum: 3, label: "Payment" }]
          .map(({ icon, stepNum, label }, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step > stepNum ? <CheckCircle size={20} /> : icon}
              </div>
              <span className="text-xs mt-2 font-medium">{label}</span>
            </div>
          ))}
      </div>
    </div>
  );

  const OrderSummary = () => {
    const formValues = getValues();
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <CartTotalCost />
        {step === 3 && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <h3 className="font-medium text-sm mb-2">Delivery Address</h3>
            <p>{formValues.firstName} {formValues.lastName}</p>
            <p>{formValues.street}</p>
            <p>{formValues.city}, {formValues.county}</p>
            <p>{formValues.postcode}</p>
            <p>{formValues.country}</p>
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="font-medium">3–5 Business Days</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <ProgressBar />
      <form onSubmit={handleSubmit(onSubmitOrder)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step === 1 && (
            <PersonalInfoForm
              register={register}
              errors={errors}
              handleNextStep={handleNextStep}
              isValid={isPersonalInfoValid}
            />
          )}
          {step === 2 && (
            <ShippingForm
              register={register}
              errors={errors}
              handleNextStep={handleNextStep}
              setStep={setStep}
              isValid={isShippingInfoValid}
            />
          )}
          {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard size={18} className="mr-2 text-blue-600" />
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? method.id === 'stripe'
                          ? 'border-blue-500 bg-blue-50/70'
                          : method.id === 'paypal'
                            ? 'border-blue-700 bg-blue-50/70'
                            : 'border-green-600 bg-green-50/70'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-5 h-5 mr-3 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id
                        ? method.id === 'stripe'
                          ? 'border-blue-500'
                          : method.id === 'paypal'
                            ? 'border-blue-700'
                            : 'border-green-600'
                        : 'border-gray-400'
                    }`}>
                      {paymentMethod === method.id && (
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          method.id === 'stripe'
                            ? 'bg-blue-500'
                            : method.id === 'paypal'
                              ? 'bg-blue-700'
                              : 'bg-green-600'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="mr-3">{method.icon}</div>
                        <div>
                          <p className="font-medium text-sm">{method.name}</p>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </div>
                    {paymentMethod === method.id && method.id !== 'cod' && (
                      <div className="absolute top-2 right-2">
                        <Lock size={16} className="text-green-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                <ShieldCheck size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-700">
                  Your payment information is secure. We use industry-standard encryption to protect your data.
                  We don't store your full payment details on our servers.
                </p>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <ChevronRight size={16} className="mr-1 transform rotate-180" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-md flex items-center ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} className="mr-2" />
                      Complete Order
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-sm mb-2 flex items-center">
              <ShieldCheck size={16} className="text-green-600 mr-2" />
              Secure Checkout Promise
            </h3>
            <p className="text-xs text-gray-600">
              We use secure payment processing and encryption to protect your personal and payment information.
              Shop with confidence and peace of mind.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderPlaced;