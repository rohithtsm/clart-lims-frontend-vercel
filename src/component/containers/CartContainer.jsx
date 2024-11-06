import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartApiContext } from "../../helpers/CartContext";

const CartContainer = ({ liClass }) => {
  const { cartList, getCartList} = useCartApiContext()

  useEffect(() => {
    if (cartList?.data && Object.keys(cartList.data).length === 0) {
      getCartList();
    }
  }, []);  

  return (
    <Fragment>
      <div className="nav-link">
        <div className={` ${liClass}`}>
          {cartList.loading ? (
            <div className="cart-qty-cls">
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="cart-qty-cls">
              {(cartList?.data?.tests?.length ? cartList.data.tests.length : 0) + (cartList?.data?.package_id ? 1 : 0)}

            </div>
          )}
          <Link className="nav-link" to={`/account/cart`}>
            <i className="fa fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default CartContainer;
