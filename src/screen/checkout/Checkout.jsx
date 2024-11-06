import CommonLayout from "../../component/shop/common-layout";
import CheckoutPage from "./CheckoutPage";

const Checkout = () => {
  return (
    <>
      <CommonLayout parent="home" title="checkout">
        <CheckoutPage />
      </CommonLayout>
    </>
  );
};

export default Checkout;
