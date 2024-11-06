import { useCommonContext } from "../helpers/CommonContext";
import { useEffect } from "react";
import CommonLayout from "../component/shop/common-layout";
import { Container, Spinner } from "reactstrap";

const Cms = ({ slug }) => {
  const { cmsDetail, getCmsDetail } = useCommonContext();

  useEffect(() => {
    if (slug) {
      getCmsDetail(slug);
    }
  }, [slug]);

  return (
    <>
      <CommonLayout parent="home" title={cmsDetail?.data?.title}>
        {cmsDetail?.loading ? (
          <div style={{ height: "500px" }}>
            <div className="full-height-overlay">
              <Spinner
                size="lg"
                color="primary"
                className="premium-spinner searchResultHeight"
              /> 
            </div> 
          </div>
        ) : (
          <Container>
            {cmsDetail?.data?.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: cmsDetail?.data?.description,
                }}
              />
            ) : (
              <div>No content available</div>
            )}
          </Container>
        )}
      </CommonLayout>
    </>
  );
};

export default Cms;
