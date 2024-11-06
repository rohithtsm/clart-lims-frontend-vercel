
import CommonLayout from "../../component/shop/common-layout";
import CartDetail from "./cart-detail";


const CartPage = () => {
  return (
    <CommonLayout parent="home" title="cart">
      {/* page body part start */}
      <CartDetail />
      {/* page body part end */}
    </CommonLayout>
  );
};

export default CartPage;