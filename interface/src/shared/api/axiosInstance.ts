import axios from "axios"
import { baseUrl } from "@/shared/config"


export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    common: {
      "Content-Type": "application/json"
    }
  }
})