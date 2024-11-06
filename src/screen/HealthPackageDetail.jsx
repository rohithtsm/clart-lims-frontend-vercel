import React, { useEffect, useState } from "react";
import CommonLayout from "../component/shop/common-layout";
import { Link, useParams } from "react-router-dom";
import { Collapse, Card, CardHeader, Button, Spinner } from "reactstrap";
import { usePackageApiContext } from "../helpers/PackagesContext";

const HealthPackageDetail = () => {
  const { getPackageDetail, packageDetail } = usePackageApiContext();
  const [openIndex, setOpenIndex] = useState(null);
  const params = useParams();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  console.log(packageDetail?.data);

  const {
    description,
    package_name,
    price,
    sample_type,
    sell_price,
    test_details,
  } = packageDetail?.data || {};

  useEffect(() => {
    getPackageDetail(params.id);
  }, [params.id]);

  return (
    <CommonLayout parent="home" title={"package detail" || "Loading..."}>
      {/* page body part start */}

      {packageDetail?.loading ? (
        <div style={{ height: "500px" }}>
          <div className="full-height-overlay">
            <Spinner
              size="lg"
              color="primary"
              className="premium-spinner searchResultHeight"
            />
          </div>
        </div>
      ) : (
        <section className="packDtls">
          <article className="container">
            <aside className="row">
              {/* left part start */}
              <div className="col-md-4">
                <div className="card dtlSidebar">
                  <div className="card-header">
                    <h4 className="mt-1 mb-1">
                      <b>{package_name}</b>
                    </h4>
                    <p className="mb-0">
                      <i>{description}</i>
                    </p>
                  </div>
                  <div className="card-body">
                    <ul>
                      {/* <li><i className='fa fa-calendar'></i> Next Slot: <b>06:00 AM, Tomorrow</b></li> */}
                      <li>
                        <i className="fa fa-file-text-o"></i> Reports in{" "}
                        <b>6-12 hours</b>
                      </li>
                      {/* <li><i className='fa fa-question-circle-o'></i> 10 - 12 Hr fasting is required</li> */}
                    </ul>
                    <hr />
                    <h5 className="badge text-bg-primary">TOP SELLING</h5>
                    <h2>₹{sell_price || price}</h2>
                    <p className="badge text-bg-success">
                      Includes Tests worth ₹ {price}
                    </p>
                    <div>
                      <Link className="btn btn-solid btn-primary" to="/">
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* left part end */}

              {/* right part start */}
              <div className="col-md-8">
                <div className="card dtlBody">
                  <div className="card-header">
                    <h4 className="mt-1 mb-1">
                      <i className="fa fa-stethoscope"></i>{" "}
                      <b>Tests Included ({test_details?.length})</b>
                    </h4>
                  </div>
                  <div
                    className="card-body"
                    style={{
                      background: "#f1f1f1",
                      borderRadius: "0 0 6px 6px",
                    }}
                  >
                    {Array.isArray(test_details) &&
                      test_details?.map((item, index) => (
                        <Card
                          key={index}
                          className="mb-3 border-0 faq-card"
                          style={{
                            borderRadius: "12px",
                            transition: "box-shadow 0.3s ease",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <CardHeader
                            onClick={() => toggle(index)}
                            style={{
                              background:
                                openIndex === index ? "#f1f3f5" : "#f8f9fa",
                              cursor: "pointer",
                              padding: "1.25rem",
                              fontWeight: "bold",
                              borderBottom:
                                openIndex === index
                                  ? "2px solid #007bff"
                                  : "none",
                              transition: "background-color 0.3s ease",
                            }}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <span>{item.test_name}</span>
                            <Button
                              color="link"
                              className="p-0 text-dark faq-toggle-btn"
                              aria-expanded={openIndex === index}
                            >
                              {openIndex === index ? "-" : "+"}
                            </Button>
                          </CardHeader>
                          <Collapse isOpen={openIndex === index}>
                            <div
                              className="card-body"
                              style={{ padding: "1.25rem" }}
                            >
                              <p className="text-muted">
                                {item.test_preparation}
                              </p>
                            </div>
                          </Collapse>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
              {/* right part end */}
            </aside>
          </article>
        </section>
      )}
      {/* page body part end */}
    </CommonLayout>
  );
};

export default HealthPackageDetail;
