import React, { useEffect, useState } from "react";
import CommonLayout from "../component/shop/common-layout";
import fullBodyCheckup from "/assets/images/Full_Body_Checkup.svg";
import { Link, useLocation } from "react-router-dom";
import { usePackageApiContext } from "../helpers/PackagesContext";
import { useAuthContext } from "../helpers/authContext";
import { useCartApiContext } from "../helpers/CartContext";
import { Spinner } from "reactstrap";

const LabTestList = ({ test }) => {
  const { handleRedirect, isLogin } = useAuthContext();
  const { addToCart } = useCartApiContext();
  const { getPopularTestList, popularLabTestList } = usePackageApiContext();
  const [loading, setLoading] = useState({});
  const location = useLocation();
  const isLabPage = location.pathname === "/find-a-test";

  const handleAddtoCart = async (test_id) => {
    setLoading((prevLoading) => ({ ...prevLoading, [test_id]: true }));
    await addToCart(test_id, "");
    setLoading((prevLoading) => ({ ...prevLoading, [test_id]: false }));
  };

  const displayedlab = isLabPage
    ? popularLabTestList?.data
    : popularLabTestList?.data?.slice(0, 6);

  useEffect(() => {
    if (popularLabTestList?.data?.length === 0) {
      getPopularTestList();
    }
  }, []);

  const content = (
    <section className="packegeSection" style={{ background: "#fcfff1" }}>
      <article className="container">
        {test && (
          <div className="title4">
            <h2 className="title-inner4">{test}</h2>
            <div className="line mb-4">
              <span></span>
            </div>
          </div>
        )}
        <aside className="row">
          {/* item start */}
          {Array.isArray(displayedlab) &&
            displayedlab?.map((item) => {
              const { _id, test_name, testcode, group_name, species, price } =
                item;
              const specie = species
                .map((animal) => animal.title)
                .slice(0, 4)
                .join(", ");

              return (
                <div className="col-md-4 col-sm-12 col-12" key={_id}>
                  <Link className="packegeItem d-block">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src={fullBodyCheckup}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="col-9" style={{ paddingLeft: "0" }}>
                        <h5 className="mb-0">
                          <b>
                            {test_name.length > 20
                              ? `${test_name.substring(0, 20)}...`
                              : test_name}
                          </b>{" "}
                        </h5>
                        <h6>({testcode})</h6>
                        <p className="badge text-bg-success mb-0 rounded-0">
                          {group_name}
                        </p>
                        <p
                          className="text-success mt-1 mb-0"
                          style={{ fontSize: "12px" }}
                        >
                          <b>Species: </b> {specie}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-8">
                        <p className="mt-3 mb-0">
                          <b className="text-dark" style={{ fontSize: "18px" }}>
                            <i className="fa fa-inr"></i>
                            {price}
                          </b>
                        </p>
                      </div>
                      <div className="col-4" align="right">
                        <button
                          onClick={
                            !isLogin
                              ? handleRedirect
                              : () => handleAddtoCart(item?._id)
                          }
                          className="btn btn-solid btn-primary btn-sm"
                          disabled={loading[item._id]}
                        >
                          {loading[item._id] ? <Spinner size="sm" /> : "Add"}
                        </button>
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <p className="mb-0">
                      <i className="fa fa-file-text-o"></i> Reports Duration{" "}
                      <strong>{item.duration || 0} hours</strong>
                    </p>
                  </Link>
                </div>
              );
            })}
          {/* item end */}
        </aside>
        {/* pagination part start */}
        {isLabPage ? (
          displayedlab?.length > 16 && (
            <div align="center">
              <nav aria-label="Page navigation">
                <ul className="pagination" style={{ display: "block" }}>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )
        ) : (
          <div className="mt-3 mb-3" align="center">
            <Link to="/find-a-test" className="btn btn-solid btn-primary">
              View All
            </Link>
          </div>
        )}
        {/* pagination part end */}
      </article>
    </section>
  );

  return isLabPage ? (
    <CommonLayout parent="home" title="Lab Test">
      {content}
    </CommonLayout>
  ) : (
    content
  );
};

export default LabTestList;
