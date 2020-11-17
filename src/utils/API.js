import axios from "axios";

const API = {
    api : "https://fast-waters-05843.herokuapp.com",
    getAllCuisines: function() {
        return axios.get(this.api + "/api/cuisine");
    },
    getAllSpecialties: function() {
        return axios.get(this.api + "/api/specialty");
    },
    getAllServices: function() {
        return axios.get(this.api + "/api/servicetype")
    },
    createProfile: function(payload) {
        return axios.post(this.api + "/api/chef", payload)
    },
    login: function(payload) {
        return axios.post(this.api + "/api/chef/login", payload)
    }

}

export default API;