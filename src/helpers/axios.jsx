import axios from "axios";
const instance = axios.create({
    baseURL: "https://lab.clart.in/"
    // baseURL: "https://clart-lims-r7ne.onrender.com/"
});

export default instance;