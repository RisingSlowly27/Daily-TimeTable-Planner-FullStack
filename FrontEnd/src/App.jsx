import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("https://daily-timetable-planner-fullstack.onrender.com/auth/me",{credentials:"include"});
      console.log(res.status);
      if(res.status==200){
        const data=await res.json();
        setUser(data);
      }
      else setUser(null); 
    } catch (err) {
      console.log(`Error : ${err}`);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to="/dashboard" /> : <Login checkAuth={checkAuth}/>}
        />
        <Route
          path="/dashboard"
          element={!user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;