import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Media } from "reactstrap";

const CartHeader = ({ item }) => {
  const removeFromCartlist = ''
  const remove = ''

  return (
    <Fragment>
      {!remove ? (
        <li>
          <div className="media">
            {/* <Link to={`/product-details/${item?.item_details?._id}`}>
              <Media
                alt=""
                className="me-3"
                src={`${item?.item_details.images[0]}`}
              />
            </Link> */}
            <div className="media-body">
              <Link to={`/product-details/${item?.item_details?._id}`}>
                <h6>{item?.item_details?.itemName}</h6>
              </Link>
              <h4>
                <span>₹ {item?.item_details?.price}</span>
              </h4>
            </div>
          </div>
          <div
            type="button"
            onClick={() => removeFromCartlist(item?.item_details?._id)}
            className="close-circle"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </li>
      ) : (
        <div className="col-md-12 d-flex justify-content-center ">
          <div className="spinner-grow text-info my-4" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CartHeader;
