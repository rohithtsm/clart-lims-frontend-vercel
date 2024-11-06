import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CommonLayout from "../component/shop/common-layout";
import { usePackageApiContext } from "../helpers/PackagesContext";
import { useAuthContext } from "../helpers/authContext";
import { useCartApiContext } from "../helpers/CartContext";
import { Spinner } from "reactstrap";

const PackageList = ({ packages }) => {
  const { handleRedirect, isLogin } = useAuthContext();
  const { addToCart } = useCartApiContext();
  const { getPackageList, packageList } = usePackageApiContext();
  const [loading, setLoading] = useState({});
  const location = useLocation();
  const isPackagePage = location.pathname === "/health-packages";

  const handleAddtoCart = async (package_id) => {
    setLoading((prevLoading) => ({ ...prevLoading, [package_id]: true }));
    await addToCart("", package_id);
    setLoading((prevLoading) => ({ ...prevLoading, [package_id]: false }));
  };

  const displayedpackage = isPackagePage
    ? packageList?.data
    : packageList?.data?.slice(0, 4);

  useEffect(() => {
    if (packageList.data.length === 0) {
      getPackageList();
    }
  }, []);

  const content = (
    <section className="packagesPart">
      <article className="container">
        {packages && (
          <div className="title4">
            <h2 className="title-inner4">{packages}</h2>
            <div className="line mb-4">
              <span></span>
            </div>
          </div>
        )}
        <aside className="row">
          {/* item start */}
          {Array.isArray(displayedpackage) &&
            displayedpackage.map((item) => {
              const { _id, package_name, test_details, sell_price, price } =
                item;
              const discountPercentage = ((price - sell_price) / price) * 100;
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
                      {Array.isArray(test_details) &&
                        test_details?.slice(0, 4)?.map(({ _id, test_name }) => (
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
                      </b>{" "}
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
                          : () => handleAddtoCart(item?._id)
                      }
                      className="btn btn-solid btn-primary"
                    >
                      {loading[item._id] ? <Spinner size="sm" /> : "Book"}
                    </Link>
                  </div>
                </Link>
              );
            })}
          {/* item end */}
        </aside>
        {/* pagination part start */}
        {isPackagePage ? (
          displayedpackage?.length > 16 && (
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
            <Link to="/health-packages" className="btn btn-solid btn-primary">
              View All
            </Link>
          </div>
        )}

        {/* pagination part end */}
      </article>
      <div></div>
    </section>
  );

  return isPackagePage ? (
    <CommonLayout parent="home" title="Packages List">
      {content}
    </CommonLayout>
  ) : (
    content
  );
};

export default PackageList;
