import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useCommonContext } from "../../../helpers/common/CommonContext";

const LogoImage = () => {
  const { storeSetting } = useCommonContext();

  return (
    <Fragment>
      <Link to={"/"} style={{width: '30%', maxWidth: '200px'}}>
        {/* <a> */}
        <img
          src={storeSetting?.store_logo}
          alt=""
          style={{width: '100%', maxWidth: '200px', objectFit: 'contain', height: '100px'}}
          className="img-fluid"
        />
        {/* </a> */}
      </Link>
    </Fragment>
  );
};

export default LogoImage;