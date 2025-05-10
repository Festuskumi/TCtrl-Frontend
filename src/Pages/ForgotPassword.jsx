import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/send-reset-code`, { email });

      if (res.data.success) {
        localStorage.setItem("reset_email", email);
        toast.success("✅ Verification code sent to your email!");
        navigate('/verify-code');
      } else {
        toast.error(res.data.message || "❌ Email not found in our system");
      }
    } catch (err) {
      toast.error("🚫 Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and we’ll send you a code to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-2 text-white font-medium rounded-lg transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Sending Code...
              </>
            ) : (
              <>Send Code</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
// 