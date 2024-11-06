import React, { useEffect } from "react";
import CommonLayout from "../../component/shop/common-layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCartApiContext } from "../../helpers/CartContext";
import Sidebar from "./Sidebar";
import "./MyProfile.css";

const MyOrderDetail = () => {
  const { getOrderDetail, orderDetail } = useCartApiContext();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOrderDetail({ order_id: params.id });
  }, [params.id]);
  console.log(!orderDetail?.data?.order_id);

  // useEffect(() => {
  //   // Check if order_id is present; if not, navigate to the homepage
  //   if (!orderDetail?.data?.order_id) {
  //     navigate('/');
  //   }
  // }, [orderDetail?.data?.order_id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <CommonLayout parent="home" title="Order Details">
      <section className="section-b-space premium-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className="dashboard-right premium-dashboard">
                <div className="dashboard">
                  <div className="page-title">
                    <h2>Order Details</h2>
                  </div>
                  <hr />
                  {orderDetail.loading ? (
                    <div className="col-md-12 d-flex justify-content-center">
                      <div
                        className="spinner-grow text-info my-4"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Customer and Order Info */}
                      <div className="info-row">
                        <div className="info-box">
                          <h5>Customer Info</h5>
                          <p>
                            <b>Name:</b> {orderDetail?.data?.customer_name}
                          </p>
                          <p>
                            <b>Phone:</b> {orderDetail?.data?.customer_phone}
                          </p>
                          <p>
                            <b>Address:</b> {orderDetail?.data?.address},{" "}
                            {orderDetail?.data?.district},{" "}
                            {orderDetail?.data?.state},{" "}
                            {orderDetail?.data?.pincode}
                          </p>
                        </div>
                        <div className="info-box">
                          <h5>Order Info</h5>
                          <p>
                            <b>Order ID:</b> {orderDetail?.data?.order_id}
                          </p>
                          <p>
                            <b>Booking Date:</b>{" "}
                            {formatDate(orderDetail?.data?.booking_date)}
                          </p>
                          <p>
                            <b>Status:</b> {orderDetail?.data?.status}
                          </p>
                          <p>
                            <b>Payment:</b> {orderDetail?.data?.payment_status}{" "}
                            ({orderDetail?.data?.payment_mode})
                          </p>
                        </div>
                      </div>

                      {/* Package and Collection Details */}
                      <div className="info-row">
                        <div className="info-box">
                          <h5>Package Details</h5>
                          <p>
                            <b>Package:</b>{" "}
                            {orderDetail?.data?.package_details?.package_name}
                          </p>
                          <p>
                            <b>Price:</b> ₹
                            {orderDetail?.data?.package_details?.price}
                          </p>
                        </div>
                        <div className="info-box">
                          <h5>Collection Details</h5>
                          <p>
                            <b>Type:</b> {orderDetail?.data?.collection_type}
                          </p>
                          <p>
                            <b>Time Slot:</b>{" "}
                            {orderDetail?.data?.time_slot?.start_time} -{" "}
                            {orderDetail?.data?.time_slot?.end_time}
                          </p>
                          <p>
                            <b>Pet Name:</b> {orderDetail?.data?.pet_name}
                          </p>
                        </div>
                      </div>

                      {/* Tests Table */}
                      <div className="mt-4">
                        <h5 className="section-title">Tests</h5>
                        <table className="table table-bordered premium-table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Test Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderDetail?.data?.tests?.map((test, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{test?.test_name}</td>
                                <td>₹{test?.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Professional Services Table */}
                      <div className="mt-4">
                        <h5 className="section-title">Professional Services</h5>
                        <table className="table table-bordered premium-table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Service Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderDetail?.data?.professional_services?.map(
                              (service, index) => (
                                <tr
                                  key={index + orderDetail?.data?.tests?.length}
                                >
                                  <td>
                                    {index +
                                      1 +
                                      orderDetail?.data?.tests?.length}
                                  </td>
                                  <td>{service?.professional_service}</td>
                                  <td>₹{service?.price}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Total Amount */}
                      <div className="total-amount-box d-flex align-items-center justify-content-between py-3">
                        <Link
                          className="btn btn-outline btn-secondary download-btn"
                          to="/download"
                          target="_blank"
                        >
                          <i className="fa fa-download me-2"></i>Download Report
                        </Link>
                        <h4 className="mb-0">
                          Total Amount: ₹ {orderDetail?.data?.total_amount}
                        </h4>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CommonLayout>
  );
};

export default MyOrderDetail;
