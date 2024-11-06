import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Collapse } from "reactstrap";
import CopyRight from "./copyright";
import LogoLight from "/assets/images/logo-light.png";
import { useCommonContext } from "../../helpers/CommonContext";

const MasterFooter = ({
  layoutClass,
  footerClass,
  belowSection,
  belowContainerFluid,
  CopyRightFluid,
}) => {
  const { storeSetting, cms } = useCommonContext();
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const width = window.innerWidth <= 767;

  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth <= 767) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };
    window.addEventListener("resize", changeCollapse);
    return () => {
      window.removeEventListener("resize", changeCollapse);
    };
  }, []);

  return (
    <div>
      <footer className={footerClass}>
        <section className={belowSection}>
          <Container fluid={belowContainerFluid ? belowContainerFluid : ""}>
            <Row className="footer-theme partition-f">
              <Col lg="4" md="6">
                <div
                  className={`footer-title ${
                    isOpen && collapse == 1 ? "active" : ""
                  } footer-mobile-title`}
                >
                  <h4
                    onClick={() => {
                      setCollapse(1);
                      setIsOpen(!isOpen);
                    }}
                  >
                    about
                    <span className="according-menu"></span>
                  </h4>
                </div>
                <Collapse
                  isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                >
                  <div className="footer-contant">
                    <div className="footer-logo d-flex">
                      <img src={LogoLight} alt="" />
                    </div>
                    <p>
                      Established on 29th December 2017, Centre for Laboratory
                      Animal Research and Training (CLART) under West Bengal
                      Livestock Development Corporation Ltd. is located...
                      <Link to="/about-us">
                        <b>View More</b>
                      </Link>
                    </p>
                    <p> {storeSetting?.store_description} </p>
                    <div className="footer-social">
                      <ul>
                        <li>
                          <a href={storeSetting?.facebook} target="_blank">
                            <i
                              className="fa fa-facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href={storeSetting?.twitter} target="_blank">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href={storeSetting?.instagram} target="_blank">
                            <i
                              className="fa fa-instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href={storeSetting?.linkedin} target="_blank">
                            <i
                              className="fa fa-linkedin"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </Col>
              <Col className="offset-xl-1">
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 2 ? "active" : ""
                    } `}
                  >
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(2);
                        } else setIsOpen(true);
                      }}
                    >
                      Categories
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul>
                        <li>
                          <Link to="/services"> Services</Link>
                        </li>
                        <li>
                          <Link to="/find-a-test"> Find a Test</Link>
                        </li>
                        <li>
                          <Link to="/health-packages">Health Packages</Link>
                        </li>
                        <li>
                          <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link to="/faq">FAQs</Link>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 3 ? "active" : ""
                    } `}
                  >
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(3);
                        } else setIsOpen(true);
                      }}
                    >
                      why we choose
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 3 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul>
                        {Array.isArray(cms?.data) &&
                          cms?.data?.map(
                            item =>
                              !["FAQs", "Blog", "FAQ"].includes(item?.title) && (
                                <li key={item._id}>
                                  <Link to={`/${item.slug}`}>{item.title}</Link>
                                </li>
                              )
                          )}
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 4 ? "active" : ""
                    } `}
                  >
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(4);
                        } else setIsOpen(true);
                      }}
                    >
                      store information
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 4 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul className="contact-list">
                        {/* <li>
                          <i className="fa fa-map-marker"></i>{" "}
                          {storeSetting?.address}
                        </li> */}
                        {/* <li>
                          <i className="fa fa-phone"></i>Call Us:{" "}
                          {storeSetting?.support_phone}
                        </li> */}
                        <li>
                          <i className="fa fa-envelope-o"></i>Email Us:{" "}
                          <a>{storeSetting?.support_email}</a>
                        </li>
                        {/* <li>
                          <i className="fa fa-fax"></i>Fax: 123456
                        </li> */}
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <CopyRight
          layout={layoutClass}
          fluid={CopyRightFluid ? CopyRightFluid : ""}
        />
      </footer>
    </div>
  );
};
export default MasterFooter;
