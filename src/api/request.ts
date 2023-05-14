import axios from "axios";

export const request = axios.create({
    baseURL: "http://16.16.171.16:8080/api/v1",
})
