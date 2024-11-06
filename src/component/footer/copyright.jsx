import React, { Fragment } from "react";
import { Container, Row, Col} from "reactstrap";
import { useCommonContext } from "../../helpers/CommonContext";

const CopyRight = ({ layout, fluid }) => {
  const { storeSetting } = useCommonContext();
  const currentYear = new Date().getFullYear();
  return (
    <Fragment>
      <div className={`sub-footer ${layout}`}>
        <Container fluid={fluid}>
          <Row>
            <Col xl="8" md="6" sm="12">
              <div className="footer-end">
                <p>
                  Clart Lims | All rights reserved ©{currentYear} 
                </p>
              </div>
            </Col>
           
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default CopyRight;
