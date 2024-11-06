import { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCommonContext } from "../../../helpers/CommonContext";
import CartContainer from "../../containers/CartContainer";
import { useAuthContext } from "../../../helpers/authContext";

const NavBar = ({ cartShow }) => {
  const { isLogin } = useAuthContext();
  const { menu, getMenus } = useCommonContext();
  const [navClose, setNavClose] = useState({ right: "0px" });
  const router = useLocation();

  useEffect(() => {
    if (menu?.data?.length === 0) {
      getMenus();
    }
  }, [menu?.data]);

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const openNav = () => {
    setNavClose({ right: "0px" });
    if (router.pathname == "/layouts/Gym")
      document.querySelector("#topHeader").classList.add("zindex-class");
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
    if (router.pathname == "/layouts/Gym")
      document.querySelector("#topHeader").classList.remove("zindex-class");
  };

  const openMblNav = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensubmenu"))
      event.target.nextElementSibling.classList.remove("opensubmenu");
    else {
      document.querySelectorAll(".nav-submenu").forEach(function (value) {
        value.classList.remove("opensubmenu");
      });
      document
        .querySelector(".mega-menu-container")
        .classList.remove("opensubmenu");
      event.target.nextElementSibling.classList.add("opensubmenu");
    }
  };

  return (
    <div>
      <div className="main-navbar">
        <div id="mainnav">
          <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div>
          <ul className="nav-menu" style={navClose}>
            <li className="back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-end">
                <span>Back navbar</span>
                <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
              </div>
            </li>

            {menu?.data?.map((item, i) => (
              <Fragment key={i}>
                {item.type === "link" && (
                  <li>
                    <Link to={item.path} className="nav-link">
                      {(item?.title)}
                    </Link>
                  </li>
                )}
                {item.type === "sub" && (
                  <li>
                    <a className="nav-link" onClick={(e) => openMblNav(e)}>
                      {item.title}
                      <span className="sub-arrow"></span>
                    </a>
                    <ul className="nav-submenu">
                      {item?.sub_menu?.map((item1, i) => (
                        <li key={i}>
                          <Link to={item1.path}>
                            {item1.title}
                            {item?.tag === "new" && (
                              <span className="new-tag">new</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </Fragment>
            ))}
            <li>
              {isLogin && cartShow && (
                <CartContainer
                  liClass={"onhover-div cartLinkBx"}
                  quentityClass={"cart-qty-cls"}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
