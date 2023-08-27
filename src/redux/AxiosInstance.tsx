import axios from "axios";

const baseURL="https://dummyjson.com";

const axiosInstance=axios.create({
    baseURL:baseURL
})

export default axiosInstance