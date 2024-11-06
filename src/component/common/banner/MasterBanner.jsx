import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass, color1, color2 }) => {
  return (
    <div>
      <div className={`home ${classes ? classes : "text-center"}`} style={{ backgroundImage: `url(${img})` }}>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4 style={color2 ? {color: color2} : {}}>{title}</h4>
                  <h1 style={color1 ? {color: color1} : {}}>{desc}</h1>
                  {/* <Link
                    to={link}
                    className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                    {btn ? btn : "Shop Now"}
                  </Link> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
