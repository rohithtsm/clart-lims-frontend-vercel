import { useEffect } from "react";
import CommonLayout from "../../component/shop/common-layout";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useCartApiContext } from "../../helpers/CartContext";

const MyOrder = () => {
  const { getOrderList, orderList } = useCartApiContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    if (orderList.data.length === 0) getOrderList();
  }, []);

  return (
    <CommonLayout parent="home" title="My-Order">
      {/* page body part start */}
      <section
        className="section-b-space myProBg"
        style={{ marginBottom: "0" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 z-0">
              <div className="dashboard-left">
                <div className="collection-mobile-back">
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true" /> back
                  </span>
                </div>
                <Sidebar />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="dashboard-right">
                <div
                  className="dashboard border-0 rounded"
                  style={{ background: "#fff" }}
                >
                  <div className="welcome-msg">
                    <div className="page-title">
                      <h2>MY ORDERS</h2>
                    </div>
                    {/* Handle Loading State */}
                    {orderList?.loading ? (
                      <div className="col-md-12 d-flex justify-content-center">
                        <div
                          className="spinner-grow text-info my-4"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : orderList?.data?.length > 0 ? (
                      <>
                        {/* <div className="row">
                          <div className="col-md-4 mb-4">
                            <input
                              className="form-control"
                              type="date"
                              placeholder="Filter by date"
                            />
                          </div>
                        </div> */}

                        {/* Order List Table */}
                        <div className="table-responsive tableMd">
                          <table className="table table-bordered border">
                            <tr align="left">
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Customer Name</th>
                              <th>Pet Name</th>
                              <th>Status</th>
                            </tr>
                            {orderList?.data.map((item) => (
                              <tr key={item._id}>
                                <td>{item?.order_id}</td>
                                <td>{formatDate(item?.booking_date)}</td>
                                <td>{item?.customer_name}</td>
                                <td>{item?.pet_name}</td>
                                <td>
                                  <span className="badge bg-warning text-dark">
                                    {item?.status}
                                  </span>
                                  &nbsp;
                                  <Link
                                    className="btn btn-outline btn-secondary rounded"
                                    to="/download"
                                    target="_blank"
                                    style={{
                                      padding: ".2rem .5rem",
                                      border: "1px solid #0d6efd",
                                    }}
                                  >
                                    <i className="fa fa-download"></i>
                                  </Link>
                                </td>
                                <Link
                                  className=" btn-secondary rounded"
                                  to={`/account/my-order/detail/${item._id}`}
                                  // style={{
                                  //   padding: ".2rem .5rem",
                                  //   border: "1px solid #0d6efd",
                                  // }}
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </tr>
                            ))}
                          </table>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <h3>No orders found.</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page body part end */}
    </CommonLayout>
  );
};

export default MyOrder;
