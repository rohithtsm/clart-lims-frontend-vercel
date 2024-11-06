import { useEffect, useState } from "react";
import NavBar from "./common/navbar";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import TopBarDark from "./common/topbar-dark";
import Logo from "../../../public/assets/images/logo.png";
import CartContainer from "../containers/CartContainer";
import { useAuthContext } from "../../helpers/authContext";

const HeaderOne = ({ headerClass, topClass, noTopBar }) => {
  const { isLogin, userData } = useAuthContext();
  const Navigate = useNavigate()
  const [cartShow, setCartShow] = useState(false);
  const [inputData, setInputData] = useState("")

  const handleClick = () => {
    if (inputData.trim() !== "") {
      Navigate(`/show-search-result?keyword-search=${inputData}`);
    }
  };
  

  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display:none";
    }, 2000);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (number >= 300) {
      if (window.innerWidth < 581)
        document.getElementById("sticky")?.classList?.remove("fixed");
      else document.getElementById("sticky")?.classList?.add("fixed");
      setCartShow(true); 
    } else {
      document.getElementById("sticky")?.classList?.remove("fixed");
      setCartShow(false); 
    }
  };


  return (
    <div>
      <header id="sticky" className={`sticky ${headerClass}`}>
        <div className="mobile-fix-option"></div>
        {/*Top Header Component*/}
        {noTopBar ? "" : <TopBarDark topClass={topClass} />}
        <Container>
          <Row>
            <Col>
              <div className="main-menu" style={{height: '90px'}}>
                <div className="menu-left">
                  <div className="brand-logo">
                    <Link to="/">
                      <img src={Logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="menu-right pull-right">
                  <NavBar cartShow={cartShow} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      {/*********** search row work start here ***********/}
      <section className="navSearchBx">
        <article>
          <aside className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="input-group inputIcoBx">
                  <span className="input-group-text">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value="Kolkata"
                  />
                  <Link to="/" className="input-group-text">
                    <i className="fa fa-crosshairs"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-5 responsive">
                <div className="input-group inputIcoBx">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Tests (CBC, MRI, etc.)"
                    style={{ borderRadius: "6px 0px 0px 6px" }}
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                  />
                  <button onClick={handleClick} className="input-group-text">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="col-md-4 rightMenuLink">
                <ul>
                  {isLogin ? (
                    <li>
                      <Link to="/my-pet" className="nav-link">
                        <i className="fa fa-user"></i> {userData?.name}
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/login" className="nav-link">
                        <i className="fa fa-user"></i> Log in
                      </Link>
                    </li>
                  )}
                  <li className="searchCart cartLinkBx">{isLogin && <CartContainer liClass={'onhover-div mobile-cart'} />}</li>
                </ul>
              </div>
            </div>
          </aside>
        </article>
      </section>
      <h4 style={{}} className="text-center mt-2 mb-2">This website is under development stage</h4>
      {/*********** search row work end here ***********/}
    </div>
  );
};

export default HeaderOne;