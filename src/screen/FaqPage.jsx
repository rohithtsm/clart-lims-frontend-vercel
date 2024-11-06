import React, { useEffect, useState } from "react";
import {
  Collapse,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { useCommonContext } from "../helpers/CommonContext";
import { useLocation } from "react-router-dom";
import CommonLayout from "../component/shop/common-layout";

const FaqPage = () => {
  const { getFaqs, faqData } = useCommonContext();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (faqData?.data?.length === 0) {
      getFaqs();
    }
  }, [])

  const isFaqPage = location.pathname === "/faq";
  const displayedFaqs = isFaqPage ? faqData?.data : faqData?.data?.slice(0, 5);

  const Content = (
    <section className="faq-section section-b-space">
      <Container>
        <Row>
          <Col md={{ size: 12, offset: 0 }}>
            <div className="title4">
              <h2 className="title-inner4">Frequently Asked Questions</h2>
              <div className="line">
                <span></span>
              </div>
            </div>
            {faqData?.loading && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {Array.isArray(displayedFaqs) &&
              displayedFaqs?.map((faq, index) => (
                <Card
                  key={index}
                  className="mb-3 shadow-lg border-0 faq-card"
                  style={{
                    borderRadius: "12px",
                    transition: "box-shadow 0.3s ease",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <CardHeader
                    onClick={() => toggle(index)}
                    style={{
                      background: activeIndex === index ? "#f1f3f5" : "#f8f9fa",
                      cursor: "pointer",
                      padding: "1.25rem",
                      fontWeight: "bold",
                      borderBottom:
                        activeIndex === index ? "2px solid #007bff" : "none",
                      transition: "background-color 0.3s ease",
                    }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{faq.question}</span>
                    <Button
                      color="link"
                      className="p-0 text-dark faq-toggle-btn"
                      aria-expanded={activeIndex === index}
                    >
                      {activeIndex === index ? "-" : "+"}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={activeIndex === index}>
                    <div className="card-body" style={{ padding: "1.25rem" }}>
                      <p className="text-muted">{faq.answer}</p>
                    </div>
                  </Collapse>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </section>
  );

  return isFaqPage ? <CommonLayout parent="home" title="Faqs">{Content}</CommonLayout> : Content;
};

export default FaqPage;