import { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { useCommonContext } from "../../helpers/CommonContext";
import axios from "../../helpers/axios";
import { useAuthContext } from "../../helpers/authContext";
import { toast } from "react-toastify";

const PetAddModal = () => {
  const { token, getUserProfile } = useAuthContext();
  const { speciesList, getSpeciesList, breedList, getBreedList } =
    useCommonContext();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const initialPayload = {
    breed: "",
    name: "",
    date_of_birth: "",
    sex: "",
    color: "",
    species: "",
  };
  const [payload, setPayload] = useState(initialPayload);

  const toggle = () => {
    setModal(!modal);
    getSpeciesList();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { status, data } = await axios.post(
        "api/customer/pet/add",
        payload,
        { headers: { Authorization: token } }
      );
      if (status === 200) {
        toast.success(data.message);
        setPayload(initialPayload);
        setModal(!modal);
        getUserProfile();
      }
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (payload.species) getBreedList({ species: payload.species });
  }, [payload.species]);

  return (
    <div style={{ cursor: "pointer" }}>
      <Link onClick={toggle} className="btn btn-solid btn btn-secondary btn-sm">
        <i className="fa fa-plus"></i> Add New Pet
      </Link>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        className="modal-dialog-centered"
        style={{ maxWidth: "600px", padding: "10px" }}
      >
        <ModalHeader toggle={toggle} className="bg-light text-dark">
          Add New Pet
        </ModalHeader>
        <div>
          <ModalBody className="p-3">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Species</label>
                  <select
                    className="form-control"
                    name="species"
                    value={payload.species}
                    onChange={handleChange}
                    required
                  >
                    <option value=""> Select Species</option>
                    {Array.isArray(speciesList?.data) &&
                      speciesList?.data?.map(({ _id, title }) => (
                        <option value={title} key={_id}>
                          {title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Breed</label>
                  <select
                    className="form-control"
                    name="breed"
                    value={payload.breed}
                    onChange={handleChange}
                    disabled={!payload.species && breedList?.data}
                    required
                  >
                    <option value="">Select Breed</option>
                    {Array.isArray(breedList?.data) &&
                      breedList?.data?.map(({ breed, _id }) => (
                        <option value={breed}>{breed}</option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={payload.name}
                    onChange={handleChange}
                    disabled={!payload.breed}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    className="form-control"
                    type="date"
                    name="date_of_birth"
                    value={payload.date_of_birth}
                    onChange={handleChange}
                    disabled={!payload.name}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Sex</label>
                  <select
                    className="form-control"
                    name="sex"
                    value={payload.sex}
                    onChange={handleChange}
                    disabled={!payload.date_of_birth}
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Color</label>
                  <input
                    className="form-control"
                    type="text"
                    name="color"
                    value={payload.color}
                    onChange={handleChange}
                    disabled={!payload.sex}
                    required
                  />
                </div>
              </div>
              <ModalFooter>
                <Button onClick={handleSubmitForm} color="primary" size="md">
                  {loading ? "Adding..." : "Add"}
                </Button>
              </ModalFooter>
          </ModalBody>
        </div>
      </Modal>
    </div>
  );
};

export default PetAddModal;
