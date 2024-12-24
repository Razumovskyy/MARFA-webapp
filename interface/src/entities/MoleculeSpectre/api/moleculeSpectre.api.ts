import { axiosInstance as axios } from "@/shared/api/axiosInstance"
import { headers } from "next/headers"
import { AxiosResponse } from "axios"
import { commandCreateResponse } from "@/entities/MoleculeSpectre/api/types"
import { chartSpectreFormData } from "@/entities/MoleculeSpectre/models/types"


axios.defaults.headers.common["Content-Type"] = "multipart/form-data"
export const getSpectre = async (params: Record<string, string | number | undefined>): Promise<AxiosResponse<commandCreateResponse>> =>
  axios.post("/calculate_spectre/", { ...params })

export const fetchChart = async (params: chartSpectreFormData, id: number)=>
  axios.put("/calculate_spectre/", { ...params, id: id })