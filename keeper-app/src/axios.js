import axios from "axios";

const instance = axios.create({
    baseURL: "https://keeper-app-backend-a.herokuapp.com/",
});

export default instance;