import { useEffect } from "react";
import Banner from "../component/common/banner/banner";
import CollectionBanner from "../component/common/banner/collection-banner";
import HeaderOne from "../component/Header/Header";
import MasterFooter from "../component/footer/footer";
import ModalComponent from "../component/common/modal";
import { useCommonContext } from "../helpers/CommonContext";
import { InitialLoading } from "../component/common/InitialLoading";
import Event from "./events/Event";
import Reasearch from "./Reasearch";
import PackageList from "./PackageList";
import LabTestList from "./LabTestList";
import FaqPage from "./FaqPage";
import WhyChooseUs from "./WhyChooseUs";
import Certified from "./Certified";
import BookingSteps from "./BookingSteps";

function Home() {

  const { getStoreBanners, BannerData } = useCommonContext();

  useEffect(() => {
    if (!BannerData?.data || BannerData?.data?.length === 0) {
      getStoreBanners();
    }
  }, []);

  return (
    <> 
      {BannerData?.loading && <InitialLoading />}
      <ModalComponent banner={BannerData?.data} />
      <HeaderOne topClass="top-header" />
      <Banner />

      {/*======== lab test part start ========*/}
      <LabTestList test={"Popular Lab Test"} />
      {/*======== lab test part end ========*/}

      {/*======== packages part work start here ========*/}
      <PackageList packages={"Popular Packages"} />
      {/*======== packages part work end here ========*/}

      {/*======== lab test part start ========*/}
      <BookingSteps />
      {/*======== lab test part end ========*/}

      {/*======== certified part start ========*/}
      <Certified />
      {/*======== certified part end ========*/}

      {/*======== whyChooseUs part start ========*/}
      <WhyChooseUs />
      {/*======== whyChooseUs part end ========*/}

      {/* FAQ Part start */}
      <FaqPage />
      {/* FAQ Part end */}

      <CollectionBanner />

      {/* research section start here */}
      <Reasearch />
      {/* research section end here */}

      {/* News & Events Section start here */}
      <Event />
      {/* News & Events Section end here */}

      {/* Footer */}
      <MasterFooter
        footerClass={`footer-light`}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
      />
    </>
  );
}

export default Home;
