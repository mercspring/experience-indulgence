import axios from "axios";

const API = {
    api : "http://localhost:8080",
    getAllCuisines: function() {
        return axios.get(this.api + "/api/cuisine");
    },
    getAllSpecialties: function() {
        return axios.get(this.api + "/api/specialty");
    },
    getAllServices: function() {
        return axios.get(this.api + "/api/servicetype")
    }
}

export default API;