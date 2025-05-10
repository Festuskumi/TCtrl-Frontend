import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify?token=${token}`)
        .then(() => {
          setTimeout(() => {
            navigate('/'); // ✅ Redirect home after success
          }, 2000);
        })
        .catch(() => {
          alert("❌ Verification failed or expired.");
          navigate('/');
        });
    } else {
      alert("⛔ Invalid verification token.");
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-xl font-semibold">Verifying email...</h1>
    </div>
  );
};

export default Verify;
