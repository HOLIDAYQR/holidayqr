import React from "react";
import { useNavigate } from "react-router-dom";

const FakeLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user_token", "dummy_token_123");
    navigate("/upload");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Fake Login</h2>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login as Dummy User
      </button>
    </div>
  );
};

export default FakeLogin;
