import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://cyberdevblog.herokuapp.com/api"
})