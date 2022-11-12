import axios from "axios";
import config from "../config/config";

export const public_instance = axios.create({
    baseURL:"http://localhost:4000/fetar/api/v1",
})

export const img_upload_inst = axios.create({
    baseURL : "https://api.imgbb.com/1/upload",
    params : {
        key : config.uploadApiKey
    },
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})
