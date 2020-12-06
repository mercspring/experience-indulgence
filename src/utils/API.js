import axios from "axios";

const API = {
    api : "https://fast-waters-05843.herokuapp.com",
    // api : "http://localhost:8080",
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
    },
    editChef: function(data,token) {
        return axios.put(this.api + "/api/chef/update/", data, { headers: { Authorization : `Bearer ${token}`}});
    },
    getAllChefs: function(){
        return axios.get(this.api + "/api/chef");
    },
    uploadPhoto: function(data, token) {
        return axios.post(this.api + "/api/photo/", data, { headers: { Authorization : `Bearer ${token}`}});
    },
    // id is PHOTO ID not CHEF ID for api/photo routes
    deletePhoto: function(id, token) {
        return axios.delete(this.api + "/api/photo/" + id, { headers: { Authorization : `Bearer ${token}`}});
    },
    updatePhoto: function(id, data, token) {
        return axios.post(this.api + "/api/photo/" + id, data, { headers: { Authorization : `Bearer ${token}`}});
    },
    createClient: function(payload) {
        return axios.post(this.api + "/api/client", payload)
    },
    getCurrentClient: function(token) {
        return axios.get(this.api + "/api/client", {}, { headers: { Authorization : `Bearer ${token}`}})
    },
    updateClient: function(token) {
        return axios.put(this.api + "/api/client", {}, { headers: { Authorization : `Bearer ${token}`}})
    },
    loginClient: function(payload) {
        return axios.post(this.api + "/api/client/login", payload)
    },
    getClient: function(id) {
        return axios.get(this.api + "/api/client/" + id);
    },
}

export default API;