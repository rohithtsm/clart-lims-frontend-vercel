import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./screen/Home";
import { Fragment, useEffect, useState } from "react";
import CartPage from "./screen/account/cart";
import ScrollToTop from "./ScrollToTop";
import Login from "./auth/Login";
import Checkout from "./screen/checkout/Checkout";
import NotFound from "./component/common/404";
import TapTop from "./component/common/tap-top";
import ProtectedRoute from "./ProtectedRoute";
import { InitialLoading } from "./component/common/InitialLoading";
import { useCommonContext } from "./helpers/CommonContext";
import Cms from "./screen/Cms";
import OrderSuccess from "./screen/checkout/OrderSuccess";
import EditMyProfile from "./screen/account/EditMyProfile";
import MyOrder from "./screen/account/MyOrder";
import MyOrderDetail from "./screen/account/MyOrderDetail";
import PackageList from "./screen/PackageList";
import HealthPackageDetail from "./screen/HealthPackageDetail";
import LabTestList from "./screen/LabTestList";
import MyPetList from "./screen/account/MyPetList";
import Contact from "./screen/contact-us";
import FaqPage from "./screen/FaqPage";
import OrderSlipDownload from "./screen/account/OrderSlipDownload";
import Services from "./screen/Services";
import SearchResultPage from "./screen/SearchResultPage";
import EventDetail from "./screen/events/EventDetail";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { cms, getCms } = useCommonContext();

  useEffect(() => {
    if (!cms?.data || cms?.data?.length === 0) {
      getCms();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Fragment>
      <ScrollToTop />
      {isLoading && <InitialLoading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="404" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/health-package-detail/:id"
          element={<HealthPackageDetail />}
        />
        <Route path="/event-detail/:id" element={<EventDetail />} />
        <Route path="/health-packages" element={<PackageList />} />
        <Route path="/find-a-test" element={<LabTestList />} />
        <Route path="/show-search-result" element={<SearchResultPage />} />

        {/* protected routers start Here  */}
        <Route path="/account/cart" element={<ProtectedRoute />}>
          <Route path="" element={<CartPage />} />
        </Route>
        <Route path="/page/account/checkout" element={<ProtectedRoute />}>
          <Route path="" element={<Checkout />} />
        </Route>
        <Route path="/page/account/order-success" element={<ProtectedRoute />}>
          <Route path="" element={<OrderSuccess />} />
        </Route>
        <Route path="/account/update/my-profile" element={<ProtectedRoute />}>
          <Route path="" element={<EditMyProfile />} />
        </Route>
        <Route path="/account/my-order" element={<ProtectedRoute />}>
          <Route path="" element={<MyOrder />} />
        </Route>
        <Route path="/account/my-order/detail/:id" element={<ProtectedRoute />}>
          <Route path="" element={<MyOrderDetail />} />
        </Route>
        <Route path="/my-pet" element={<ProtectedRoute />}>
          <Route path="" element={<MyPetList />} />
        </Route>
        <Route path="/download" element={<ProtectedRoute />}>
          <Route path="" element={<OrderSlipDownload />} />
        </Route>
        {/* protected routers end Here  */}

        {/* cmd page routing */}
        {Array.isArray(cms?.data) &&
          cms?.data?.map(
            (item) =>
              !["faq", "contact-us"].includes(item?.slug) && (
                <Route
                  key={item?._id}
                  path={`/${item?.slug}`}
                  element={<Cms slug={item?.slug} />}
                />
              )
          )}
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<Cms slug={"about-us"} />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
      <TapTop />
      <ToastContainer autoClose={1000} />
    </Fragment>
  );
}

export default App;
