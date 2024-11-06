import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../helpers/authContext";
import profileUser from "/assets/images/profileUser.jpg";
import { FaEdit, FaPaw, FaShoppingCart, FaListAlt, FaPowerOff } from "react-icons/fa";

const Sidebar = () => {
  const { handleLogout, userData } = useAuthContext();

  return (
    <div className="accountSidebar">
      <div className="userInfo">
        <div className="profileImgBx">
          <img src={profileUser} alt="User Profile" />
        </div>
        <h4>{userData?.name}</h4>
        <h5>
          {userData?.email}
          <br />
          +91 {userData?.mobile}
        </h5>
        <NavLink
          to="/account/update/my-profile"
          className="btn btn-solid btn-secondary"
        >
          <FaEdit /> Edit Profile
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/my-pet">
            <FaPaw /> My Pet
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/cart">
            <FaShoppingCart /> My Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/my-order">
            <FaListAlt /> My Order
          </NavLink>
        </li>
        <li className="last">
          <button className="btn" onClick={handleLogout}>
            <FaPowerOff /> Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
