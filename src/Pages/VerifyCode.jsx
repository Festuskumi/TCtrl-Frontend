import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ code }) => {
    const email = localStorage.getItem("reset_email");
    if (!email) return toast.error("No email found. Please restart the process.");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify-reset-code`, { email, code });
      if (res.data.success) {
        toast.success("Code verified! Set your new password.");
        navigate('/reset-password');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Enter Verification Code</h2>
      <input
        type="text"
        maxLength="6"
        {...register("code", { required: true })}
        placeholder="Enter 6-digit code"
        className="border p-2 w-full mb-4 text-center tracking-widest text-xl"
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full">Verify</button>
    </form>
  );
};

export default VerifyCode;
