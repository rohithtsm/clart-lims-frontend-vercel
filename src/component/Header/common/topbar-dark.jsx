import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../helpers/authContext";
import { useEffect } from "react";
import { useCommonContext } from "../../../helpers/CommonContext";

const TopBarDark = ({ topClass, fluid }) => {
  const { handleLogout, isLogin, getUserProfile, userData } = useAuthContext();
  const { storeSetting } = useCommonContext();

  useEffect(() => {
    if (isLogin && (!userData || !userData._id)) {
      getUserProfile();
    }
    // eslint-disable-next-line
  }, []);


  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to {storeSetting?.store_name}</li>
                <li>
                <i className="fa fa-phone" aria-hidden="true"></i>
                  Contact Us: {storeSetting?.support_phone}
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="onhover-dropdown mobile-account">
                <Link to='/my-pet'> 
                {userData?.name ? ` Welcome , ${userData?.name}` : " My Account"}
                <i className="fa fa-user " style={{marginLeft:'6px'}} aria-hidden="true"></i>{" "}
                </Link>
                <ul className="onhover-show-div">
                  {!isLogin && (
                    <li>
                      <Link to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                  {isLogin && (
                    <li onClick={handleLogout}>
                      <a>Logout</a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
