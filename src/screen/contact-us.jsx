import React, { useState } from "react";
import { Container, Row, Col, Form, Label, Input } from "reactstrap";
import { useCommonContext } from "../helpers/CommonContext";
import { toast } from "react-toastify";
import CommonLayout from "../component/shop/common-layout";

const Data = [
  {
    img: "fa-phone",
    title: "Contact us",
    desc1: "+91-33 2977 2506",
  },
  {
    img: "fa-map-marker",
    title: "ADDRESS",
    desc1: "Buddha Park, B 14, Block B, Kalyani,",
    desc2: " West Bengal 741235",
  },
  {
    
    img: "fa-envelope-o",
    title: "Email",
    desc1: "clart@wbldc.in",
    // desc2: "info@shopcart.com",
  },
];

const ContactDetail = ({ img, title, desc1, desc2 }) => {
  return (
    <li>
      <div className="contact-icon">
        <i className={`fa ${img}`} aria-hidden="true"></i>
        <h6>{title}</h6>
      </div>
      <div className="media-body">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </li>
  );
};

const Contact = () => {
  const { mainLoading} = useCommonContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !message) {
      toast.warning("Please fill in all required fields.");
      return;
    }
    // getEnquiry({
    //   first_name: firstName,
    //   last_name: lastName,
    //   email,
    //   phone_number: phone,
    //   message,
    // });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <CommonLayout parent="home" title="Contact">
      <section className="contact-page section-b-space">
        <Container>
          <Row className="section-b-space">
            <Col lg="7" className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1605.811957341231!2d25.45976406005396!3d36.3940974010114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1550912388321"
                allowFullScreen
              ></iframe>
            </Col>
            <Col lg="5">
              <div className="contact-right">
                <ul>
                  {Data.map((data, i) => {
                    return (
                      <ContactDetail
                        key={i}
                        img={data.img}
                        title={data.title}
                        desc1={data.desc1}
                        desc2={data.desc2}
                      />
                    );
                  })}
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Form className="theme-form">
                <Row>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter Your first name"
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      id="last-name"
                      placeholder="Enter Your last name"
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">
                      Phone number
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your number"
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      required
                    />
                  </Col>
                  <Col md="12">
                    <Label className="form-label" for="review">
                      Write Your Message
                    </Label>
                    <textarea
                      className="form-control"
                      placeholder="Write Your Message"
                      id="exampleFormControlTextarea1"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="6"
                      required
                    />
                  </Col>
                  <Col md="12">
                    <button
                      className="btn btn-solid"
                      // type="submit"
                      onClick={handleSubmit}
                    >
                      {mainLoading?.contact ? "Sending..." : "Send Your Message"}
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Contact;
