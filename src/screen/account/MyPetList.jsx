import React from "react";
import CommonLayout from "../../component/shop/common-layout";
import Sidebar from "./Sidebar";
import PetAddModal from "./PetAddModal";
import { useAuthContext } from "../../helpers/authContext";

const MyPetList = () => {
  const { userData } = useAuthContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <CommonLayout parent="home" title="My Pets">
      {/* page body part start */}
      <section className="myProBg section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 z-0">
              <div className="dashboard-left">
                <div className="collection-mobile-back">
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true" /> back
                  </span>
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
                  <div className="row">
                    <div className="col-md-9">
                      <h2 className="mb-0 text-primary">
                        <i className="fa fa-paw"></i> My Pet
                      </h2>
                    </div>
                    <div className="col-md-3" align="right">
                      <PetAddModal />
                    </div>
                  </div>
                  <hr className="mt-1" />
                  <div className="table-responsive">
                    {userData?.pet?.length === 0 ? (
                      <div className="text-center">
                        <p>No pets found.</p>
                      </div>
                    ) : (
                      <table className="table table-bordered table-striped table-hover">
                        <thead align="left">
                          <tr>
                            <th>Species</th>
                            <th>Breed</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Sex</th>
                            <th>Color</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(userData?.pet) &&
                            userData?.pet?.map((item) => (
                              <tr key={item?._id}>
                                <td>{item?.species} </td>
                                <td>{item?.breed}</td>
                                <td>{item?.name}</td>
                                <td>{formatDate(item?.date_of_birth)}</td>
                                <td>{item?.sex}</td>
                                <td>{item?.color}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page body part end */}
    </CommonLayout>
  );
};

export default MyPetList;
