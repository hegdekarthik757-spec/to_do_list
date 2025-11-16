import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { message } from "antd";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function getUserDetails() {
    const storedUser = localStorage.getItem("todoAppUser");
    return storedUser ? JSON.parse(storedUser) : null;
  }

  useEffect(() => {
    const userInfo = getUserDetails();
    setUser(userInfo);
  }, []);

  function handleLogout() {
    localStorage.removeItem("todoAppUser");
    message.info("Logut successfull")
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <Link to="/Pricing">Pricing</Link>
      <Link to="/AboutUs">AboutUs</Link>

      {user ? (
        <>
          <span className="navbar-username">{user.username}</span>
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>  
          <Link to="/login">LogIn / Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
