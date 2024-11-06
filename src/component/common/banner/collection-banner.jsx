import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Media } from "reactstrap";
import petDiagnostic from "/assets/images/img1.png";
import Diagnostic from "/assets/images/img2.png";

const Data = [
  {
    img: petDiagnostic,
    about: "Comprehensive Pet Pathology Testing",
    offer: "Get Accurate Diagnostics for Your Pet",
    link: "/pathology-tests",
    class: "p-right text-center",
  },
  {
    img: Diagnostic,
    about: "Pet Vaccination and Health Care",
    offer: "Protect Your Pet with Timely Vaccinations",
    link: "/vaccination",
    class: "p-right text-center",
  },
];

const CollectionBanner = () => {
  return (
    <Fragment>
      {/* Collection Banner Section */}
      <section className="pt-5 pb-5 bg-warning bg-opacity-10">
        <Container>
          <Row className="partition2">
            {Data.map((data, i) => (
              <Col md="6" key={i}>
                <Link to={data.link}>
                  <div className={`collection-banner ${data.class}`}>
                    <Media
                      src={data.img}
                      className="img-fluid"
                      alt=""
                      style={{ height: "300px", objectFit: "cover", width: "100%" }}
                    />
                    <div
                      className="contain-banner"
                      style={{
                        padding: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white", 
                      }}
                    >
                      <h4 style={{ color: "#ffcc00" }}>{data.offer}</h4>
                      <h3 style={{ color: "#fff" }}>{data.about}</h3>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* Collection Banner End */}
    </Fragment>
  );
};

export default CollectionBanner;
