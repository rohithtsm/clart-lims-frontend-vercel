import { toast } from "react-toastify";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./authContext";
import axios from "./axios";
export const PackageContext = createContext();

const PackageProvider = (props) => {
  const { token, isLogin } = useAuthContext();
  const navigate = useNavigate();
  const [packageList, setPackageList] = useState({ data: [], loading: false });
  const [packageDetail, setPackageDetail] = useState({ data: {}, loading: false });
  const [popularLabTestList, setPopularLabTestList] = useState({
    data: [],
    loading: false,
  });
  const [stateList, setStateList] = useState({ data: [], loading: false });
  const [districtList, setDistrictList] = useState({
    data: [],
    loading: false,
  });

  const getPackageList = async () => {
    try {
      setPackageList({ data: [], loading: true });
      const response = await axios.post(`api/customer/test-packages/list`, {});
      if (response?.status === 200) {
        setPackageList({ data: response?.data?.data || [], loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setPackageList((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const getPackageDetail = async (id) => {
    setPackageDetail({ data: {}, loading: true });
    try {
      const { status, data } = await axios.get(
        `api/customer/test-package/details/${id}`
      );
      status === 200 &&
        setPackageDetail({ data: data?.data || {}, loading: false });
    } catch (error) {
      console.log(error.message);
      setPackageDetail({ data: {}, loading: false });
    }
  };

  const getPopularTestList = async () => {
    try {
      setPopularLabTestList({ data: [], loading: true });
      const response = await axios.post(`api/popular/test/list`, {});
      if (response?.status === 200) {
        setPopularLabTestList({
          data: response?.data?.data || [],
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message);
      setPopularLabTestList((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const getStateList = async () => {
    setStateList({ data: {}, loading: true });
    try {
      const { data, status } = await axios.get(`api/customer/state/list`, {
        headers: { Authorization: token },
      });
      if (status === 200) {
        setStateList({ data: data?.data || {}, loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setStateList((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const getDistrictList = async (state_id) => {
    setDistrictList({ data: {}, loading: true });
    try {
      const { data, status } = await axios.post(
        `api/customer/districts/list`,
        { state_id },
        {
          headers: { Authorization: token },
        }
      );
      if (status === 200) {
        setDistrictList({ data: data?.data || {}, loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setDistrictList((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <PackageContext.Provider
      value={{
        navigate,
        getPackageList,
        getPopularTestList,
        getStateList,
        getDistrictList,
        getPackageDetail,

        districtList,
        stateList,
        packageList,
        popularLabTestList,
        packageDetail
      }}
    >
      {props.children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;
export const usePackageApiContext = () => useContext(PackageContext);
