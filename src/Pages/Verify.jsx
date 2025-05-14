import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ContextShop } from '../Context/ContextShop';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useContext(ContextShop);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // 📌 Try to get email from state first, then fallback to URL
  useEffect(() => {
    const stateEmail = location.state?.email;
    const queryEmail = new URLSearchParams(location.search).get('email');
    if (stateEmail) setEmail(stateEmail);
    else if (queryEmail) setEmail(queryEmail);
  }, [location]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email || !code) {
      toast.error("Please enter both email and code.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify-code`, {
        email,
        code,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        toast.success("✅ Email verified! You are now logged in.");
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Verification error. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleVerify} className="bg-white p-8 shadow-md rounded-md w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify Your Email</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black"
            maxLength={6}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold transition duration-300 text-white ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Verifying...
            </span>
          ) : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

export default Verify;
