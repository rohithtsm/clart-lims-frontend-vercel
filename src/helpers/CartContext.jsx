import { toast } from "react-toastify";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./authContext";
import axios from "./axios";

export const CartContext = createContext();

const CartProvider = (props) => {
  const { token, isLogin } = useAuthContext();
  const navigate = useNavigate();
  const [cartList, setCartList] = useState({ data: {}, loading: false });
  const [professionalList, setProfessionalList] = useState({
    data: [],
    loading: false,
  });
  const [timeSlotList, setTimeSlotList] = useState({
    data: [],
    loading: false,
  });
  const [orderPlacedData, setOderPlacedData] = useState({
    data: {},
    loading: false,
  });
  const [orderList, setOrderList] = useState({ data: [], loading: false });
  const [orderDetail, setOrderDetail] = useState({ data: {}, loading: false });

  const getCartList = async () => {
    setCartList({ data: {}, loading: true });
    try {
      const { data, status } = await axios.get(`api/customer/cart/details`, {
        headers: { Authorization: token },
      });
      if (status === 200) {
        setCartList({ data: data?.data || {}, loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setCartList((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const addToCart = async (test_id, package_id) => {
    try {
      const { status, data } = await axios.post(
        "api/customer/add-to-cart",
        { test_id, package_id },
        { headers: { Authorization: token } }
      );
      status === 200 && (toast.success(data.message), await getCartList());
    } catch ({ message }) {
      console.log(message);
      toast.error(data.message || 'something went wrong');
    }
  };

  const removeFromCart = async (id, type) => {
    try {
      const { status, data } = await axios.post(
        `/api/customer/cart/test/remove`,
        type === 'package' ? { package_id: id } : { test_id: id },
        { headers: { Authorization: token } }
      );
      if (status === 200) {
        toast.success(data.message);
        await getCartList();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };
  

  const getTimeSlot = async () => {
    setTimeSlotList({ data: [], loading: true });
    try {
      const { data, status } = await axios.get(`api/customer/time-slots/list`, {
        headers: { Authorization: token },
      });
      if (status === 200) {
        setTimeSlotList({ data: data?.data || [], loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setTimeSlotList((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const getProfessionalList = async () => {
    setProfessionalList({ data: [], loading: true });
    try {
      const { data, status } = await axios.post(
        `api/customer/professional-fee/list`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      if (status === 200) {
        setProfessionalList({ data: data?.data || [], loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setProfessionalList((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const cartClear = async () => {
    try {
      const { status } = await axios.get(`api/customer/empty/cart`, {
        headers: { Authorization: token },
      });
      if (status === 200) {
        await getCartList();
        getOrderList();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const orderPlace = async (formData) => {
    setOderPlacedData({ data: {}, loading: true });
    try {
      const { data, status } = await axios.post(
        `api/customer/order/place`,
        formData,
        {
          headers: { Authorization: token },
        }
      );
      if (status === 200) {
        setOderPlacedData({ data: data?.data || {}, loading: false });
        toast.success(data?.message || "Order Placed successfully");
        cartClear();
        navigate("/page/account/order-success", { replace: true });
      } else {
        setOderPlacedData({ data: {}, loading: false });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
      setOderPlacedData({ data: {}, loading: false });
    }
  };

  const getOrderList = async (species) => {
    setOrderList({ data: [], loading: true });
    try {
      const { status, data } = await axios.post(
        "api/customer/orders/list",
        species,
        { headers: { Authorization: token } }
      );
      status === 200 &&
        setOrderList({ data: data?.data || [], loading: false });
    } catch ({ message }) {
      setOrderList((prevState) => ({ ...prevState, loading: false }));
      console.log(message);
    }
  };

  const getOrderDetail = async (order_id) => {
    setOrderDetail({ data: {}, loading: true });
    try {
      const { status, data } = await axios.post(
        "api/customer/order/details",
        order_id,
        { headers: { Authorization: token } }
      );
      status === 200 &&
        setOrderDetail({ data: data?.data || {}, loading: false });
    } catch (error) {
      setOrderDetail({ data: {}, loading: false });
      console.log(message);
      toast.error(data.message || 'something went wrong');
      navigate('/')
    }
  };

  return (
    <CartContext.Provider
      value={{
        token,
        navigate,
        addToCart,
        getCartList,
        removeFromCart,
        getProfessionalList,
        getTimeSlot,
        orderPlace,
        getOrderList,
        getOrderDetail,

        cartList,
        professionalList,
        timeSlotList,
        orderPlacedData,
        orderList,
        orderDetail,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCartApiContext = () => useContext(CartContext);
