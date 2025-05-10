import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = async ({ newPassword, confirmPassword }) => {
    const email = localStorage.getItem("reset_email");
    if (!email) return toast.error("No email found. Please restart the process.");
    if (newPassword !== confirmPassword) return toast.error("❌ Passwords do not match.");

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password-code`, {
        email,
        newPassword,
      });

      if (res.data.success) {
        toast.success("✅ Password reset successfully!");
        localStorage.removeItem("reset_email");
        navigate('/login');
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("⚠️ Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter and confirm your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPass ? 'text' : 'password'}
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters"
                  }
                })}
                placeholder="Create a new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(prev => !prev)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                {...register("confirmPassword", {
                  required: "Please confirm your password"
                })}
                placeholder="Repeat your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(prev => !prev)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 text-white rounded-lg transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Resetting...
              </>
            ) : (
              <>Reset Password</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
