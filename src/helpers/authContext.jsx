import React from "react";
import { toast } from "react-toastify";
import axios from "./axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const tk = localStorage.getItem("token");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [isreggistered, setIsReggistered] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setuserData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  const sendOtp = async (number) => {
    try {
      setLoading(true);
      const response = await axios.post(`api/customer/send-otp`, number, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("OTP sent successfully");
        setIsReggistered(response?.data?.isAlreadyRegistered);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (payload) => {
    const paramValue = new URLSearchParams(location.search).get("redirect");
    try {
      setLoading(true);
      const { data, status } = await axios.post(
        `api/customer/verify-otp`,
        payload
      );
      if (status === 200) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsLogin(true);
        toast.success(data.message);
        navigate(
          paramValue || (isreggistered ? "/" : "/account/update/my-profile")
        );
      }
    } catch (error) {
      setIsLogin(false);
      setToken("");
      toast.error("Login failed");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // userProfile function
  const getUserProfile = async () => {
    try {
      const response = await axios.get(`api/customer/profile/details`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status === 200) {
        setuserData(response?.data?.data);
      }
    } catch (error) {
      // toast.error("Something went wrong");
      localStorage.removeItem("token");
      setIsLogin(false);
      setToken("");
      setuserData({});
      navigate("/login");
      console.log(error.message);
    }
  };

  const updateUserProfile = async (payload) => {
    const paramValue = new URLSearchParams(location.search).get("redirectUrl");
    try {
      setUpdateLoading(true);
      const response = await axios.post(
        `api/customer/profile/update`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User profile updated successfully");
        navigate(paramValue || "/my-pet");
        getUserProfile();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setToken("");
    setuserData({});
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleRedirect = (path) => {
    if (isLogin) {
      navigate(path);
    } else {
      toast.warning("please Login first");
      setTimeout(() => {
        navigate(`/login?redirect=${location.pathname}`);
      }, 1000);
    }
  };

  useEffect(() => {
    if (token) {
      setToken(token);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [tk]);

  return (
    <AuthContext.Provider
      value={{
        token,
        // SignupUser,
        loading,
        isLogin,
        setIsLogin,
        navigate,
        verifyOtp,
        sendOtp,
        handleLogout,
        getUserProfile,
        userData,
        handleRedirect,
        updateUserProfile,
        updateLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// Export AuthProvider component and hook
export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
