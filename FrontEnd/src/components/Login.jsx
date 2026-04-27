import React from "react";

const Login = ({checkAuth}) => {
  const handleLogin=async()=>{
    window.location.href="https://daily-timetable-planner-fullstack.onrender.com/auth/google";
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-6">
          Daily TimeTable Planner
        </h1>

        <p className="text-gray-600 mb-6">
          Organize your day efficiently
        </p>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;