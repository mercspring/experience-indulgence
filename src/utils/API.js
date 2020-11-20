import axios from "axios";

const API = {
    api : "https://fast-waters-05843.herokuapp.com",
    //api : "http://localhost:8080",
    getChef: function(id) {
        return axios.get(this.api + "/api/chef/" + id);
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
    getCurrentChef: function(token) {
        return axios.get(this.api + "/api/chef/profile", {}, { headers: { Authorization : `Bearer ${token}`}})
    },
    getChefsByZip: function(zip){
        return axios.get(this.api + "/api/chef/zip/" + zip)
    }
}

export default API;