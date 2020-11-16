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
    createProfile: function() {
        return axios.post(this.api + "/api/chef")
    },
    login: function() {
        return axios.post(this.api + "/api/chef/login")
    }

}

export default API;