import React, { useEffect, useState } from "react";
import CommonLayout from "../component/shop/common-layout";
import { Link, useLocation } from "react-router-dom";
import { useCommonContext } from "../helpers/CommonContext";
import { useAuthContext } from "../helpers/authContext";
import { useCartApiContext } from "../helpers/CartContext";
import fullBodyCheckup from "/assets/images/Full_Body_Checkup.svg";
import { Spinner } from "reactstrap";

const SearchResultPage = () => {
  const { isLogin, handleRedirect } = useAuthContext();
  const { getSearchResult, searchData } = useCommonContext();
  const { addToCart } = useCartApiContext();
  const [loading, setLoading] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keywordSearch = queryParams.get("keyword-search");

  const handleAddtoCart = async (test_id, package_id) => {
    const loadingKey = test_id || package_id;
    setLoading((prevLoading) => ({ ...prevLoading, [loadingKey]: true }));
    await addToCart(test_id || "", package_id || "");
    setLoading((prevLoading) => ({ ...prevLoading, [loadingKey]: false }));
  };

  useEffect(() => {
    getSearchResult({ keyword_search: keywordSearch });
  }, [keywordSearch]);

  return (
    <CommonLayout parent="Home" title="Search Result">
      {/* Loading spinner */}
      {searchData?.loading ? (
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
        <>
          {/* No data found message */}
          {!searchData?.data?.tests?.length &&
            !searchData?.data?.test_packages?.length && (
              <div className="text-center" style={{ height: "100%" }}>
                <h4 className="searchResultHeight">No data found</h4>
              </div>
            )}

          <>
            {/* Test List */}
            {searchData?.data?.tests?.length > 0 && (
              <section
                className="packegeSection"
                style={{ background: "#fcfff1", minHeight: "700px" }}
              >
                <article className="container">
                  <div className="title4">
                    <h2 className="title-inner4">Test List</h2>
                    <div className="line mb-4">
                      <span></span>
                    </div>
                  </div>
                  <aside className="row mb-5">
                    {searchData?.data?.tests.map((item) => {
                      const {
                        _id,
                        test_name,
                        testcode,
                        group_name,
                        species,
                        price,
                      } = item;
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
                              <div
                                className="col-9"
                                style={{ paddingLeft: "0" }}
                              >
                                <h5 className="mb-0">
                                  <b>
                                    {test_name.length > 20
                                      ? `${test_name.substring(0, 20)}...`
                                      : test_name}
                                  </b>
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
                                  <b
                                    className="text-dark"
                                    style={{ fontSize: "18px" }}
                                  >
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
                                      : () => handleAddtoCart(item?._id, "")
                                  }
                                  className="btn btn-solid btn-primary btn-sm"
                                  disabled={loading[item._id]}
                                >
                                  {loading[item._id] ? (
                                    <Spinner size="sm" />
                                  ) : (
                                    "Add"
                                  )}
                                </button>
                              </div>
                            </div>
                            <hr className="mt-2 mb-2" />
                            <p className="mb-0">
                              <i className="fa fa-file-text-o"></i> Reports
                              Duration{" "}
                              <strong>{item.duration || 0} hours</strong>
                            </p>
                          </Link>
                        </div>
                      );
                    })}
                  </aside>
                </article>
              </section>
            )}

            {/* Test Packages List */}
            {searchData?.data?.test_packages?.length > 0 && (
              <section className="packagesPart" style={{ minHeight: "700px" }}>
                <article className="container">
                  <div className="title4">
                    <h2 className="title-inner4">Test Packages List</h2>
                    <div className="line mb-4">
                      <span></span>
                    </div>
                  </div>
                  <aside className="row">
                    {searchData?.data?.test_packages.map((item) => {
                      const {
                        _id,
                        package_name,
                        test_details,
                        sell_price,
                        price,
                      } = item;
                      const discountPercentage =
                        ((price - sell_price) / price) * 100;

                      return (
                        <Link
                          to={`/health-package-detail/${_id}`}
                          className="col-md-3 col-sm-6 col-12"
                          key={_id}
                        >
                          <div className="packItem">
                            <h4>{package_name}</h4>
                            <h6 style={{ marginTop: "-10px" }}>
                              Include <b>{test_details?.length}</b> Test
                            </h6>
                            <ul style={{ height: "100px" }}>
                              {test_details
                                ?.slice(0, 4)
                                ?.map(({ _id, test_name }) => (
                                  <li style={{ fontSize: "12px" }} key={_id}>
                                    {test_name.length > 20
                                      ? `${test_name.substring(0, 20)}...`
                                      : test_name}
                                  </li>
                                ))}
                              {test_details?.length >= 4 && (
                                <li>
                                  <Link to={`/health-package-detail/${_id}`}>
                                    <b>+ More</b>
                                  </Link>
                                </li>
                              )}
                            </ul>

                            <p className="mb-2">
                              report in <b>24 hours</b>
                            </p>
                            <h5 className="mb-0">
                              <b>
                                <i className="fa fa-inr"></i>
                                {sell_price || price}
                              </b>
                              {sell_price && (
                                <>
                                  <s>
                                    <i className="fa fa-inr"></i>
                                    {price}
                                  </s>
                                  <span className="badge text-bg-success">
                                    {Math.round(discountPercentage)}% Off
                                  </span>
                                </>
                              )}
                            </h5>
                            <Link
                              onClick={
                                !isLogin
                                  ? handleRedirect
                                  : () => handleAddtoCart("", item?._id)
                              }
                              className="btn btn-solid btn-primary"
                            >
                              {loading[item._id] ? (
                                <Spinner size="sm" />
                              ) : (
                                "Book"
                              )}
                            </Link>
                          </div>
                        </Link>
                      );
                    })}
                  </aside>
                </article>
              </section>
            )}
          </>
        </>
      )}
    </CommonLayout>
  );
};

export default SearchResultPage;
