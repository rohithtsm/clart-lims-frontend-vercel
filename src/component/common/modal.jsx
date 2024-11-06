import React, { useEffect, useState } from "react";
import {
  Col,
  Media,
  Row,
  Modal,
  ModalBody,
  Input,
  Form,
  Button,
} from "reactstrap";
import { useCommonContext } from "../../helpers/CommonContext";
import modalBanner from "/assets/images/modal-banner.jpg";

const ModalComponent = ({ banner }) => {
  const [modal, setModal] = useState(false);
  const {  emailSubscribed } = useCommonContext();
  const [src, setSrc] = useState(null);
  const [email, setEmail] = useState("");

  const toggle = () => setModal(!modal);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // emailSubscription(email);
    }
    setEmail("");
  };

  useEffect(() => {
    const lastShown = localStorage.getItem("modalLastShown");
    const now = Date.now();
    if (!lastShown || now - lastShown > 86400000) {
      setModal(true);
      localStorage.setItem("modalLastShown", now); 
    }
  }, []);

  useEffect(() => {
    if (banner?.length > 0) {
      const image = banner?.filter((item) => item.type === "popup");
      if (image?.length > 0) {
        setSrc(image[0]?.image || null);
      }
    }
  }, [banner]);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className="theme-modal modal-lg"
      centered
    >
      <div>
        <ModalBody className="modal1">
          <Row className="compare-modal">
            <Col lg="12">
              <div className="modal-bg">
                <Button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggle}
                ></Button>
                <div className="offer-content">
                  {src && (
                    <Media
                      src={src}
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  )}
                  <img className="img-fluid" src={modalBanner} alt="" />
                  <Form
                    className="auth-form needs-validation newsForm"
                    onSubmit={handleEmailSubmit}
                  >
                    <h2 className="d-block d-sm-none d-md-none">
                      newsletter&nbsp;
                    </h2>
                    <div className="form-group mx-sm-3">
                      <h2 className="pt-2 m-0 d-none d-md-block">
                        newsletter&nbsp;
                      </h2>
                      <Input
                        type="text"
                        className="form-control"
                        name="EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                      <Button
                        type="submit"
                        className="btn btn-solid"
                        id="mc-submit"
                      >
                        {emailSubscribed?.loading
                          ? "Subscribing..."
                          : "Subscribe"}
                      </Button>
                    </div>
                    {emailSubscribed?.data && (
                      <h5 className="alert alert-success mt-4 p-2">
                        <b>{emailSubscribed.data}</b>
                      </h5>
                    )}
                    {emailSubscribed?.error && (
                      <h5 className="alert alert-danger mt-4 p-2">
                        <b>{emailSubscribed.error}</b>
                      </h5>
                    )}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default ModalComponent;
