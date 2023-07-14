
import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { loginContext } from "../contexts/logincontext";
function Navbar() {
 
    
    let [currentUser, error, userLoginStatus, loginUser, logoutUser] =
    useContext(loginContext);

  const activeLink = {
    color: "#ffaa00",
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  const inactiveLink = {
    color: "#EEF0F2",
    fontSize: "1.2rem",
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/WLM_logo-2.svg/404px-WLM_logo-2.svg.png"
            width="60px"
            className="shadow"
            alt=""
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink;
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/register"
                style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink;
                }}
              >
                Register
              </NavLink>
            </li>

            {!userLoginStatus ? (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  style={({ isActive }) => {
                    return isActive ? activeLink : inactiveLink;
                  }}
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  style={({ isActive }) => {
                    return isActive ? activeLink : inactiveLink;
                  }}
                  onClick={logoutUser}
                >
                  Logout
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/aboutus"
                style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink;
                }}
              >
                Aboutus
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>




  )



   {/* <div className='bg-warning'>
   <ul className="nav justify-content-center">
    <li className="nav-item"> 
      <Link className='nav-link' to="/">Home</Link>
      </li>
     
      <li className="nav-item">
      <Link className='nav-link' to="/register">Signup</Link>
      </li>
      <li className="nav-item">
      <Link className='nav-link' to="/login">Signin</Link>
      </li>
      <li className="nav-item">
      <Link className='nav-link' to="/technologies">Technologies</Link>
      </li>
          </ul>
  </div> */}
  

}

export default Navbar