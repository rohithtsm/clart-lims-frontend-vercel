import CommonLayout from "../../component/shop/common-layout";
import { Col, Container, Media, Row } from "reactstrap";
import thankyou from "/assets/images/thankyou.svg";
import healthReport from "/assets/images/health-report.svg";
import { useCartApiContext } from "../../helpers/CartContext";
const OrderSuccess = () => {
  const { orderPlacedData } = useCartApiContext();
  console.log(orderPlacedData?.data)

  // if (!orderPlacedData?.data?.order_id) navigate("/");

  return (
    <CommonLayout parent="home" title="order success">
      <section className="section-b-space white-1">
        <Container>
          <Row>
            <Col md="12">
              <div style={{ margin: "0 auto", maxWidth: "450px" }}>
                <img
                  src={thankyou}
                  className="img-fluid"
                  alt=""
                  style={{ maxWidth: "100%" }}
                />
              </div>

              <div
                className="alert alert-success"
                style={{ maxWidth: "650px", margin: "0 auto" }}
                align="center"
              >
                <h4>
                  <i
                    className="fa fa-check-circle"
                    style={{ fontSize: "20px" }}
                  ></i>{" "}
                  Payment is successfully processsed and your order is on the
                  way
                </h4>
                <h4 className="mb-0">
                  Order Id: {orderPlacedData?.data?.order_id}
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-b-space" style={{ background: "#f8f8f8" }}>
        <Container>
          <Row>
            <Col lg="6">
              <div className="product-order">
                <h3>your order details</h3>
                {Array.isArray(orderPlacedData?.data?.items) &&
                  orderPlacedData?.data?.items?.map((item, i) => (
                    <Row className="product-order-detail" key={i}>
                      <Col xs="3" key={i}>
                        <Media
                          // src={item?.images[0]}
                          alt=""
                          className="img-fluid blur-up lazyload"
                        />
                      </Col>
                      <Col xs="3" className="order_detail">
                        <div>
                          <h4>product name</h4>
                          <h5>{item.itemName}</h5>
                        </div>
                      </Col>
                      <Col xs="3" className="order_detail">
                        <div>
                          <h4>quantity</h4>
                          <h5>{item.quantity}</h5>
                        </div>
                      </Col>
                      <Col xs="3" className="order_detail">
                        <div>
                          <h4>price</h4>
                          <h5>₹{item.total_price}</h5>
                        </div>
                      </Col>
                    </Row>
                  ))}
              </div>
            </Col>
            <Col lg="6">
              <div
                className="table-responsive tableMd mb-4"
                style={{ background: "#fff" }}
              >
                <table className="table table-bordered border mb-0">
                  <tr align="left">
                    <th>
                      <h4 className="m-0 p-0 pt-2 pb-2">Summery</h4>
                    </th>
                    <th>
                      <h4 className="m-0 p-0 pt-2 pb-2">shipping address</h4>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <ul className="list-unstyled p-0">
                        <li>order ID: {orderPlacedData?.data?.order_id}</li>
                        <li>Order Date: October 22, 2023</li>
                        <li>Order Total: {orderPlacedData?.data?.final_amount} </li>
                      </ul>
                    </td>
                    <td>
                      <ul className="list-unstyled p-0">
                        <li>{`${orderPlacedData?.data?.shipping_address?.first_name} ${orderPlacedData?.data?.shipping_address?.last_name}`}</li>
                        <li>
                          {orderPlacedData?.data?.shipping_address?.address_line_1}
                        </li>
                        <li>
                          India, {orderPlacedData?.data?.shipping_address?.state},{" "}
                          {orderPlacedData?.data?.shipping_address?.city},{" "}
                          {orderPlacedData?.data?.shipping_address?.postal_code}{" "}
                        </li>
                        <li>
                          Contact No.{" "}
                          {orderPlacedData?.data?.shipping_address?.phone_number}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr align="left">
                    <th colspan="2" className="pt-2 pb-2">
                      <h4 className="m-0 p-0">payment method</h4>
                    </th>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p
                        className="m-0 p-0"
                        style={{ fontSize: "16px", lineHeight: "20px" }}
                      >
                        Pay on Delivery (Cash/Card). Cash on delivery (COD)
                        available. Card/Net banking acceptance subject to device
                        availability.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <div className="row">
                <div className="col-2" align="center">
                  <img src={healthReport} className="img-fluid" alt="" />
                </div>
                <div className="col-10" style={{ paddingLeft: "0" }}>
                  <h3>expected date of delivery</h3>
                  <h2>october 22, 2023</h2>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default OrderSuccess;
