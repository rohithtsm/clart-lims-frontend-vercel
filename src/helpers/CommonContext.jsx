import { toast } from "react-toastify";
import axios from "./axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./authContext";

export const commonContext = createContext();

const CommonProvider = (props) => {
  const { token, isLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [storeSetting, setStoreSetting] = useState({});
  const [cms, setCms] = useState({ data: [], loading: false });
  const [cmsDetail, setCmsDetail] = useState({ data: {}, loading: false });
  const [BannerData, setBannerData] = useState({ loading: true, data: [] });
  const [faqData, setFaqData] = useState({ loading: false, data: [] });
  const [menu, setMenu] = useState({ loading: false, data: [] });
  const [mainLoading, setMainLoading] = useState({ contact: false });
  const [emailSubscribed, setEmailSubscribed] = useState({});
  const [speciesList, setSpeciesList] = useState({ data: [], loading: false });
  const [breedList, setBreedList] = useState({ data: [], loading: false });
  const [eventList, setEventList] = useState({ data: [], loading: false });
  const [eventDetail, setEventDetail] = useState({ data: {}, loading: false });
  const [searchData, setSearchData] = useState({ data: {}, loading: false });

  const getCms = async () => {
    try {
      setCms({ data: [], loading: false });
      const response = await axios.get(`api/cms-list`);
      if (response?.status === 200) {
        setCms({ data: response?.data?.data || [], loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setCms((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const getCmsDetail = async (slug) => {
    try {
      setCmsDetail({ data: [], loading: true });
      const response = await axios.post(
        `api/cms/detail`,
        { slug },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status === 200) {
        setCmsDetail({ data: response?.data?.data, loading: false });
      }
    } catch (error) {
      setCmsDetail({ data: [], loading: false });
      console.log("Error:", error.message);
    }
  };

  const getStoreBanners = async () => {
    setBannerData({ data: {}, loading: true });
    try {
      const { data, status } = await axios.get(`api/banners/list`, {
        headers: { Authorization: token },
      });
      if (status === 200) {
        setBannerData({ data: data?.data || {}, loading: false });
      }
    } catch (error) {
      console.log(error.message);
      setBannerData((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const getFaqs = async () => {
    try {
      setFaqData({ loading: true, data: [] });
      const response = await axios.get(`api/faq/list`);
      if (response?.status === 200) {
        setFaqData({ data: response?.data?.data, loading: false });
      }
    } catch (error) {
      setFaqData({ data: [], loading: false });
    }
  };

  const getMenus = async () => {
    try {
      setMenu({ ...menu, loading: true });
      const response = await axios.get(`api/customer/menu/list`);
      if (response.status === 200) {
        setMenu({ loading: false, data: response?.data?.data });
      }
    } catch (error) {
      setMenu({ ...menu, loading: false });
    }
  };

  const getSpeciesList = async () => {
    setSpeciesList({ data: [], loading: true });
    try {
      const { status, data } = await axios.post(
        "api/customer/species/list",
        {},
        { headers: { Authorization: token } }
      );
      status === 200 &&
        setSpeciesList({ data: data?.data || [], loading: false });
    } catch ({ message }) {
      setSpeciesList((prevState) => ({ ...prevState, loading: false }));
      console.log(message);
    }
  };

  const getBreedList = async (species) => {
    setBreedList({ data: [], loading: true });
    try {
      const { status, data } = await axios.post(
        "api/customer/breed/list",
        species,
        { headers: { Authorization: token } }
      );
      status === 200 &&
        setBreedList({ data: data?.data || [], loading: false });
    } catch ({ message }) {
      setBreedList((prevState) => ({ ...prevState, loading: false }));
      console.log(message);
    }
  };

  const getSearchResult = async (keyword_search) => {
    setSearchData({ data: {}, loading: true });
    try {
      const { status, data } = await axios.post(
        "api/customer/tests/list/search",
        keyword_search
      );
      status === 200 && setSearchData({ data: data || {}, loading: false });
    } catch ({ message }) {
      setSearchData({ data: {}, loading: false });
      console.log(message);
    }
  };

  const getEventList = async () => {
    setEventList({ data: [], loading: true });
    try {
      const { status, data } = await axios.get("api/news-events/list");
      status === 200 &&
        setEventList({ data: data?.data || [], loading: false });
    } catch ({ message }) {
      setEventList((prevState) => ({ ...prevState, loading: false }));
      console.log(message);
    }
  };

  const getEventDetail = async (id) => {
    setEventDetail({ data: {}, loading: true });
    try {
      const { status, data } = await axios.get(
        `api/customer/test-package/details/${id}`
      );
      status === 200 && setEventDetail({ data: data || {}, loading: false });
    } catch ({ message }) {
      setEventDetail({ data: {}, loading: false });
      console.log(message);
    }
  };

  return (
    <commonContext.Provider
      value={{
        loading,
        navigate,

        // all functions passed here
        getCms,
        getCmsDetail,
        getStoreBanners,
        getFaqs,
        getMenus,
        getSpeciesList,
        getBreedList,
        getSearchResult,
        getEventList,
        getEventDetail,
        // functions end here

        // data prop for all functions starts here
        storeSetting,
        cms,
        cmsDetail,
        BannerData,
        faqData,
        mainLoading,
        menu,
        emailSubscribed,
        speciesList,
        breedList,
        searchData,
        eventList,
        eventDetail
      }}
    >
      {props.children}
    </commonContext.Provider>
  );
};

export default CommonProvider;
export const useCommonContext = () => useContext(commonContext);
