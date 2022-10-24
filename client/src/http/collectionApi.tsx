import { $authHost, $host } from "./index"
import { ICollection } from "../model"


export const getCollections = async (id: any) => {
    const { data } = await $authHost.get<ICollection[]>(`collections/getCollections/${id}`)
    return data
}

export const createCollection = async (id: any, words: any, name: string) => {
    const response = await $host.post<ICollection[]>(`collections/createCollections/${id}`, {words, name})
    return response
}

export const createFromFile = async (id: any, formData: any) => {
    const { data } = await $host.post<ICollection[]>(`collections/createFromFile/${id}`, formData)
    return data
}

export const deleteCollection = async (id: any) => {
    const { data } = await $host.delete(`collections/deleteOneCollection/${id}`)
    return data
}

export const deleteManyCollection = async (arrCollId: any) => {
    const { data } = await $host.post(`collections/deleteManyCollection/`, arrCollId)
    return data
}

export const editCollection = async (id: any, name: any) => {
    const { data } = await $host.post(`collections/updateCollection/${id}`, { name })
    return data
}


