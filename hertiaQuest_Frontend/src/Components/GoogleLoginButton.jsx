import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import GoogleImg from "../assets/googleImg.svg"

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = `${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const scope = "openid profile email";
    const responseType = "code";

    const authUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin} className='active:scale-95  flex gap-2 items-center border border-blue-600 px-4 py-2 rounded-md cursor-pointer'>
        <img src={GoogleImg} className='w-8 p-1' />
        <p>
        Continue with Google</p>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
