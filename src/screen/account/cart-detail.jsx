import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartApiContext } from "../../helpers/CartContext";
import { Col, Media, Row } from "reactstrap";
import { useAuthContext } from "../../helpers/authContext";

const CartDetail = () => {
  const { userData } = useAuthContext();
  const { cartList, removeFromCart } = useCartApiContext();
  const [loading, setLoading] = useState({});

  const handleDelete = async (id, type) => {
    setLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
    await removeFromCart(id, type);
    setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
  };

  return (
    <>
      <Row>
        <Col sm="12">
          {cartList?.loading ? (
            <div className="col-md-12 d-flex justify-content-center ">
              <div className="spinner-grow text-info my-4" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : cartList?.data?.tests?.length > 0 ||
            !!cartList?.data?.test_package ? (
            <section
              className="section-b-space"
              style={{ background: "#F1F3FA" }}
            >
              <div className="container">
                {/* cart box start */}
                <div className="cartWrapper">
                  <h2>
                    <i className="fa fa-user"></i> {userData?.name}
                  </h2>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover fs-5">
                      <thead align="left">
                        <tr>
                          <th width="60%">Test Name</th>
                          <th width="20%">Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(cartList?.data?.tests) &&
                          cartList?.data?.tests?.map(
                            ({ test_id, price, test_name }) => (
                              <tr key={test_id}>
                                <td>{test_name}</td>
                                <td>₹ {price}</td>
                                <td>
                                  <Link
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleDelete(test_id, "test")
                                    }
                                  >
                                    <i className="fa fa-trash"></i>{" "}
                                    {loading[test_id]
                                      ? "Deleting..."
                                      : "Delete"}
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                  {cartList?.data?.test_package && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-hover fs-5">
                        <thead align="left">
                          <tr>
                            <th width="60%">Package Name</th>
                            <th width="20%">Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{cartList?.data?.test_package}</td>
                            <td>₹ {cartList?.data?.package_price}</td>
                            <td>
                              <Link
                                className="btn btn-danger"
                                onClick={() =>
                                  handleDelete(
                                    cartList?.data?.package_id,
                                    "package"
                                  )
                                }
                              >
                                <i className="fa fa-trash"></i>{" "}
                                {loading[cartList?.data?.package_id]
                                  ? "Deleting..."
                                  : "Delete"}
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover fs-5">
                      <thead align="left">
                        <tr>
                          <th
                            className="bg-success bg-opacity-10 text-success"
                            width="60%"
                          >
                            All Total amount is
                          </th>
                          <th
                            className="bg-success bg-opacity-10 text-success"
                            width="40%"
                          >
                            ₹{" "}
                            {cartList?.data?.total_cart_amount ||
                              cartList?.data?.total_test_price}
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div align="right">
                    <Link
                      to="/page/account/checkout"
                      className="btn btn-solid btn btn-secondary btn-sm"
                    >
                      <i className="fa fa-shopping-cart"></i> Checkout
                    </Link>
                  </div>
                </div>
                {/* cart box end */}
              </div>
            </section>
          ) : (
            <section className="cart-section section-b-space">
              <Row>
                <Col sm="12">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      className="img-fluid mb-4 mx-auto"
                      alt="Empty Cart"
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Explore more and shortlist some items.</h4>
                  </div>
                </Col>
              </Row>
            </section>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartDetail;
