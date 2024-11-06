import { useAuthContext } from "../../helpers/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PetAddModal from "../account/PetAddModal";
import { useEffect, useState } from "react";
import { useCartApiContext } from "../../helpers/CartContext";
import { CiCircleRemove } from "react-icons/ci";
import { Button } from "@mui/material";
import {
  Autocomplete,
  Box,
  Chip,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Spinner } from "reactstrap";

const CheckoutPage = () => {
  const { userData } = useAuthContext();
  const {
    cartList,
    removeFromCart,
    getProfessionalList,
    professionalList,
    getTimeSlot,
    timeSlotList,
    orderPlace,
    orderPlacedData,
  } = useCartApiContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checked, setChecked] = useState(true);
  const [file, setFiles] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [pet_id, setPetId] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const { address, pet, state, district, name, pincode } = userData || {};

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleDelete = async (id, type) => {
    if (id) {
      if (window.confirm("Are you sure to remove this item?")) {
        await removeFromCart(id, type);
      }
    }
  };

  if (
    cartList?.data &&
    cartList?.data?.package_id === null &&
    (!cartList?.data?.tests || cartList?.data?.tests?.length === 0)
  )
    navigate("/");

  const toISODate = (dateString) => `${dateString}T00:00:00.000+0000`;
  const isoFormattedDate = toISODate(date);

  const totalProfessionalCharges = selectedProducts.reduce((total, item) => {
    return total + item.expected_charges;
  }, 0);

  const totalCollectionCharges = cartList?.data?.tests?.reduce(
    (total, item) => {
      return total + item.collection_fee;
    },
    0
  );

  const finalAmount =
    (totalCollectionCharges || 0) +
    (cartList?.data?.test_package_total_collection_fee || 0) +
    (totalProfessionalCharges || 0) +
    (cartList?.data?.total_test_price || 0) +
    (cartList?.data?.package_price || 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isoFormattedDate || !state || !district || !address || !pincode) {
      alert("Please Update Your Profile First.");
      return;
    }

    if (!pet_id) {
      alert("Pet is missing.");
      return;
    }

    if (!file?.length) {
      alert("No prescription files uploaded.");
      return;
    }

    if (Object.entries(selectedSlot).length === 0) {
      alert("No time slot selected.");
      return;
    }

    const formData = new FormData();

    // Prepare tests as a separate field for each element
    cartList?.data?.tests.map(({ test_id, price }, index) => {
      formData.append(`tests[${index}][test]`, test_id);
      formData.append(`tests[${index}][price]`, price);
      formData.append(`tests[${index}][sample_id]`, "");
    });

    // Prepare professional_fees as a separate field for each element
    selectedProducts?.forEach(({ id, expected_charges }, index) => {
      formData.append(`professional_fees[${index}][professional_fee]`, id);
      formData.append(`professional_fees[${index}][price]`, expected_charges);
    });

    // Prepare the test_package if it exists
    if (cartList?.data?.package_id) {
      formData.append("package_id", cartList.data.package_id);
    }

    // Prepare the time_slot
    if (selectedSlot) {
      formData.append("start_time", selectedSlot.start_time);
      formData.append("end_time", selectedSlot.end_time);
    }

    // Append prescription files
    file.forEach((file, index) => {
      formData.append(`prescription`, file);
    });

    formData.append("booking_date", isoFormattedDate);
    formData.append("state", state);
    formData.append("district", district);
    formData.append("address", address);
    formData.append("pincode", pincode);
    formData.append("payment_status", "Unpaid");
    formData.append("pet_id", pet_id);
    formData.append("payment_mode", paymentMode);
    formData.append("total_amount", finalAmount);
    formData.append("collection_type", checked ? "Home Visit" : "Lab");
    orderPlace(formData);
  };

  useEffect(() => {
    if (professionalList?.data?.length === 0) getProfessionalList();
    if (timeSlotList?.data?.length === 0) getTimeSlot();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <section className="p-0">
        <section className="newCheckOut" style={{ background: "#eee" }}>
          <article
            className="container border p-4"
            style={{ background: "#fff" }}
          >
            {/* address part stat here  */}
            <aside className="row" style={{ alignItems: "center" }}>
              {!!address ? (
                <div className="col-md-8">
                  <h4 className="text-dark mb-2">
                    <b>Bill To</b>
                  </h4>
                  <h4>
                    Name: <b>{name}</b>
                  </h4>
                  <h4>{`${address} ${state} ${district} ${pincode}`}</h4>
                </div>
              ) : (
                <div className="col-md-8">
                  <h4 className="text-dark mb-0">
                    <b>no Address found. Please Update your Profile</b>
                  </h4>
                </div>
              )}
              <div className="col-md-4" align="right">
                <Link
                  to={`/account/update/my-profile?redirectUrl=${location.pathname}`}
                  className="btn-solid btn btn-xs"
                >
                  <i className="fa fa-edit"></i> Update YOur Address
                </Link>
              </div>
            </aside>
            {/* address part end here  */}

            <hr className="mb-2" />

            {/* pet list dropdown stat here  */}
            <div className="row" style={{ alignItems: "center" }}>
              <div className="col">
                <div className="text-dark mb-0">
                  <label htmlFor="pet" className="form-label">
                    Choose Your Pet
                  </label>
                  {pet?.length !== 0 ? (
                    <select
                      className="form-control mt-2"
                      name="pet"
                      id="pet"
                      style={{ maxWidth: "400px" }}
                      onChange={(e) => setPetId(e.target.value)}
                    >
                      <option value="">Select Pet</option>
                      {Array.isArray(pet) &&
                        pet.map(({ name, id }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <div className="col-md-8 mt-2">
                      <h4 className="text-dark mb-0">
                        <b>No pet found. Please Add Pet!</b>
                      </h4>
                    </div>
                  )}
                </div>
              </div>
              <div className="col" align="right">
                <PetAddModal />
              </div>
            </div>
            {/* pet list dropdown end here  */}

            {/* upload button stat here  */}
            <div className="row mt-4" style={{ alignItems: "center" }}>
              <div className="col-md-6" align="left">
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                  multiple // Allow multiple file selection
                  style={{ display: "none" }}
                  id="prescription-upload"
                />
                <label
                  htmlFor="prescription-upload"
                  className="btn-solid btn btn-xs"
                >
                  <i className="fa fa-cloud-upload"></i> Upload Prescription(s)
                </label>
                {file.length > 0 && (
                  <div className="mt-2">
                    <p>Selected files:</p>
                    <ul>
                      {file.map((file, index) => (
                        <li key={index}>
                          <b>{file.name}</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* upload button end here  */}

            <hr />
            {cartList?.loading ? (
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
              <>
                {/* lab test list stat here  */}
                <div className="col-md-12">
                  <h4 className="text-dark">
                    <b>Lab Test</b>
                  </h4>
                  <div className="table-responsive mt-2">
                    <table className="table table-bordered mb-2">
                      <tr align="left">
                        <th>Test Name</th>
                        <th>Price</th>
                        <th>Home Collection Fees</th>
                        <th>Action</th>
                      </tr>
                      {Array.isArray(cartList?.data?.tests) &&
                      cartList?.data?.tests?.length > 0 ? (
                        cartList?.data?.tests?.map(
                          ({ test_id, price, test_name, collection_fee }) => (
                            <tr key={test_id}>
                              <td>{test_name}</td>
                              <td>₹ {price}</td>
                              <td>₹ {collection_fee}</td>
                              <td>
                                <Button
                                  className=" btn-sm d-flex align-items-center"
                                  onClick={() => handleDelete(test_id, "test")}
                                >
                                  <CiCircleRemove />
                                </Button>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan={2}>You have not added any Tests</td>
                        </tr>
                      )}
                    </table>
                  </div>
                </div>
                {/* lab test list end here  */}

                {/* health package list stat here  */}
                {cartList?.data.package_id !== null && (
                  <div className="col-md-12 mt-2">
                    <h4 className="text-dark">
                      <b>Health Package</b>
                    </h4>
                    <div className="table-responsive mt-2">
                      <table className="table table-bordered mb-2">
                        <thead>
                          <tr align="left">
                            <th>Health Package Name</th>
                            <th>Price</th>
                            <th>Home Collection Fess</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{cartList?.data?.test_package}</td>
                            <td>₹ {cartList?.data?.package_price}</td>
                            <td>
                              ₹{" "}
                              {
                                cartList?.data
                                  ?.test_package_total_collection_fee
                              }
                            </td>
                            <td>
                              <Button
                                className=" btn-sm d-flex align-items-center"
                                onClick={() =>
                                  handleDelete(
                                    cartList?.data?.package_id,
                                    "package"
                                  )
                                }
                              >
                                <CiCircleRemove />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* health package list end here  */}
              </>
            )}

            <hr />

            {/* profession service stat here  */}
            <div className="col-md-8">
              <FormGroup>
                <FormLabel htmlFor="New">
                  Professional Service Suggested
                </FormLabel>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={professionalList?.data || []}
                  getOptionLabel={(option) =>
                    `${option?.name || ""} - ( ₹${
                      option?.expected_charges || "N/A"
                    } )`
                  }
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Professional Services"
                      placeholder="Select Professional Services..."
                    />
                  )}
                />
              </FormGroup>
            </div>
            {/* profession service end here  */}

            {/* home collection checked stat here  */}
            <div className="form-check mt-3">
              <input
                className="form-check-input mt-1"
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                id="flexCheckDefault"
                style={{ marginRight: "5px", width: "20px", height: "20px" }}
              />
              <label
                className="form-check-label fs-5"
                htmlFor="flexCheckDefault"
              >
                Home collection required
              </label>
            </div>
            {checked && (
              <>
                <h4 className="mt-4 mb-2">
                  <b>Preferred date and time:</b>
                </h4>
                <div className="col-md-2 mb-3">
                  <label className="form-label">Choose Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="date_of_birth"
                    required
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    marginBottom: "20px",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Choose Time Slots :
                  </Typography>
                  {timeSlotList?.data?.map((slot, index) => (
                    <Chip
                      key={index}
                      label={`${slot.start_time} - ${slot.end_time}`}
                      clickable
                      color={selectedSlot === slot ? "primary" : "default"}
                      onClick={() => setSelectedSlot(slot)}
                    />
                  ))}
                </Box>
              </>
            )}
            {/* home collection checked end here  */}

            {/* price table start */}
            <div className="table-responsive" style={{ maxWidth: "500px" }}>
              <table className="table table-bordered">
                <tr className="fs-6">
                  <td>Item Amount</td>
                  <td width="20%">
                    ₹{" "}
                    {cartList?.data?.total_cart_amount ||
                      cartList?.data?.total_test_price}{" "}
                  </td>
                </tr>
                <tr className="fs-6">
                  <td>Professional Service Charge</td>
                  <td>₹ {totalProfessionalCharges}</td>
                </tr>
                <tr className="fs-6">
                  <td>Home collection Charge</td>
                  <td>
                    ₹{" "}
                    {totalCollectionCharges +
                      cartList?.data?.test_package_total_collection_fee ||
                      cartList?.data?.test_package_total_collection_fee ||
                      0}
                  </td>
                </tr>
                <tr className="fs-6">
                  <td>All Total Amount is</td>
                  <td>₹ {finalAmount}</td>
                </tr>
              </table>
            </div>
            {/* price table end */}

            {/* payment mode stat here  */}
            <div className="mb-4 fs-6">
              <b>Payment Mode:&nbsp;</b>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadioA"
                  value="COD"
                  checked={paymentMode === "COD"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label className="form-check-label" htmlFor="inlineRadioA">
                  COD
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadioB"
                  value="UPI"
                  checked={paymentMode === "UPI"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label className="form-check-label" htmlFor="inlineRadioB">
                  UPI
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadioC"
                  value="Credit Card"
                  checked={paymentMode === "Credit Card"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label className="form-check-label" htmlFor="inlineRadioC">
                  Credit Card
                </label>
              </div>
            </div>
            {/* payment mode end here  */}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={orderPlacedData?.loading}
            >
              {orderPlacedData?.loading ? (
                <>
                  <Spinner size="sm" />
                  <span style={{ marginLeft: "0.5rem" }}>Submitting...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </article>
        </section>
      </section>
    </form>
  );
};

export default CheckoutPage;
