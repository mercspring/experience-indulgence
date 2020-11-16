import axios from "axios";

const API = {
    api : "https://fast-waters-05843.herokuapp.com/",
    getAllCuisines: () => axios.get(this.api + "/api/cuisine"),
    getAllSpecialties: () => axios.get(this.api + "/api/specialty"),
    getAllServices: () => axios.get(this.api + "/api/servicetype"),
    createProfile: () => axios.post(this.api + "/api/chef"),
    login: () => axios.post(this.api + "/api/chef/login")

}

export default API;