import axios from "axios";

const API = {
    api : "https://fast-waters-05843.herokuapp.com",
    getChef: function(username) {
        return axios.get(this.api + "/api/chef/" + username);
    },
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
    },
    getChefsByZip: function(zip){
        return axios.get(this.api + "/api/chef/zip/" + zip)
    }
}

export default API;