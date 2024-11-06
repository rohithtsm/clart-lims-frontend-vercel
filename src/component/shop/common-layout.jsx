import HeaderOne from "../Header/Header";
import MasterFooter from "../footer/footer";
import Breadcrubs from "../common/breadcrubs";

const CommonLayout = ({ children, title, parent}) => {
  return (
    <>
      <HeaderOne topClass="top-header" logoName="logo.png" />
      <Breadcrubs title={title} parent={parent}  />
      <>{children}</>
      <MasterFooter
        footerClass={`footer-light `}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
      />
    </>
  );
};

export default CommonLayout;
