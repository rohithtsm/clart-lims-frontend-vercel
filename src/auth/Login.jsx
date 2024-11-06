import { useState } from "react";
import CommonLayout from "../component/shop/common-layout";
import {
  Col,
  Container,
  Input,
  Label,
  Row,
  Form,
  Button,
  Spinner,
  Card,
  CardBody,
} from "reactstrap";
import { useAuthContext } from "../helpers/authContext";
import loginOtp from "/assets/images/login-otp.svg";

const Login = () => {
  const { sendOtp, verifyOtp, isLogin, navigate, loading } = useAuthContext();
  const [mobile, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  if (isLogin) {
    return navigate("/");
  }

  const sendOtpHandler = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      return alert("Mobile number is not valid.");
    }
    sendOtp({ mobile });
    setIsOtpSent(true);
  };

  const verifyOtpHandler = (e) => {
    e.preventDefault();
    verifyOtp({ mobile, otp });
  };

  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row className="justify-content-center">
            <Col lg="4" md="5" sm="12" align="center">
              <img src={loginOtp} alt="" />
            </Col>
            <Col lg="5" md="7" sm="12">
              <Card className="login-card">
                <CardBody>
                  <h4 className="fs-5">
                    <b>Continue With Mobile</b>
                  </h4>
                  <p className="mb-2">
                    we will send one time password in this mobile number
                  </p>
                  <hr className="mt-1" />
                  <Form
                    className="theme-form"
                    onSubmit={isOtpSent ? verifyOtpHandler : sendOtpHandler}
                  >
                    <div className="form-group mb-3">
                      <Label className="form-label" htmlFor="phone">
                        Enter Your Mobile Number
                      </Label>
                      <Input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="form-control premium-input"
                        placeholder="Enter your phone number"
                        required
                        disabled={isOtpSent}
                      />
                    </div>

                    {isOtpSent && (
                      <div className="form-group mb-5">
                        <Label className="form-label" htmlFor="otp">
                          Enter OTP
                        </Label>
                        <Input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="form-control premium-input"
                          placeholder="Enter the OTP sent to your phone"
                          required
                        />
                      </div>
                    )}

                    <Button type="submit" className="btn btn-solid" disabled={mobile?.length !== 10}>
                      {loading ? (
                        <Spinner size="sm" />
                      ) : isOtpSent ? (
                        "Verify OTP"
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;