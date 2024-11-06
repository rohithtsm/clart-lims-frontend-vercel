import React, { useState, useEffect } from "react";
import CommonLayout from "../../component/shop/common-layout";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../helpers/authContext";
import { usePackageApiContext } from "../../helpers/PackagesContext";

const EditMyProfile = () => {
  const { userData, updateUserProfile, updateLoading } = useAuthContext();
  const { getStateList, stateList, getDistrictList, districtList } =
    usePackageApiContext();
  const [state_id, setState_id] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData?.name || "",
        email: userData?.email || "",
        mobile: userData?.mobile || "",
        address: userData?.address || "",
        district: userData?.district || "",
        state: userData?.state || "",
        pincode: userData?.pincode || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    const selectedStateTitle = e.target.options[e.target.selectedIndex].text;
    setState_id(selectedStateId);
    setFormData({
      ...formData,
      state: selectedStateTitle,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  useEffect(() => {
    getStateList();
  }, []);

  useEffect(() => {
    if (state_id) {
      getDistrictList(state_id);
    }
  }, [state_id]);

  return (
    <CommonLayout parent="home" title="Update Profile">
      <section className="myProBg section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="dashboard-left">
                <div className="collection-mobile-back">
                  <Link to="/" className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true" /> back
                  </Link>
                </div>
                <Sidebar />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="dashboard-right">
                <div
                  className="dashboard border-0 rounded"
                  style={{ background: "#fff" }}
                >
                  <div className="welcome-msg">
                    <div className="page-title">
                      <h2>Edit My Account</h2>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit} className="row g-3">
                      {/* First Name */}
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                          Enter Your Pet Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={formData.name}
                          placeholder="Enter your first name"
                          onChange={handleChange}
                        />
                      </div>
                      {/* Email */}
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email ID
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          value={formData.email}
                          placeholder="Enter your email"
                          onChange={handleChange}
                        />
                      </div>
                      {/* Mobile */}
                      <div className="col-md-6">
                        <label htmlFor="mobile" className="form-label">
                          Mobile No.
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          placeholder="Enter your mobile number"
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                      {/* State */}
                      <div className="col-md-6">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <select
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={handleStateChange}
                          className="form-control"
                        >
                          {!formData.state && (
                            <option value="">{"Select State"}</option>
                          )}
                          {Array.isArray(stateList?.data) &&
                            stateList?.data?.map(({ state, id }) => (
                              <option key={id} value={id}>
                                {state}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* City */}
                      <div className="col-md-6">
                        <label htmlFor="district" className="form-label">
                          District
                        </label>
                        <select
                          name="district"
                          id="district"
                          value={formData.district}
                          onChange={handleChange}
                          className="form-control"
                          disabled={!districtList?.data}
                          // required
                        >
                          <option value="">
                            {formData.district || "Select District"}
                          </option>
                          {Array.isArray(districtList?.data) &&
                            districtList?.data?.map(({ district, id }) => (
                              <option key={id} value={district}>
                                {district}
                              </option>
                            ))}
                        </select>
                      </div>
                      {/* Postal Code */}
                      <div className="col-md-6">
                        <label htmlFor="pincode" className="form-label">
                          Postal Code
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          placeholder="Enter postal code"
                          onChange={handleChange}
                        />
                      </div>
                      {/* Address Line 1 */}
                      <div className="col-md-6">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          value={formData.address}
                          placeholder="Enter address line 1"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-solid btn-secondary mt-4"
                        >
                          {updateLoading ? "Updating..." : "Update Account"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CommonLayout>
  );
};

export default EditMyProfile;
