import { $authHost, $host } from "./index"


export const createCollection = async (id, formData) => {
    const response = await $host.post(`collections/createCollections/${id}`, formData)
    return response
}

export const createFromFile = async (id, formData) => {
    const { data } = await $host.post(`collections/createFromFile/${id}`, formData)
    return data
}

export const getCollections = async (id) => {
    const { data } = await $authHost.get(`collections/getCollections/${id}`)
    return data
}
export const getWords = async (collId) => {
    const { data } = await $host.post(`words/getWords/`, {collId})
    return data
}

export const addWords = async (id, formData) => {
    const { data } = await $host.post(`words/addWorlds/${id}`, formData)
    return data
}
export const addWordsFromFile = async (id, formData) => {
    const { data } = await $host.post(`words/addWordsFromFile/${id}`, formData)
    return data
}




export const deleteCollection = async (id) => {
    const { data } = await $host.delete(`collections/deleteOneCollection/${id}`)
    return data
}
export const deleteWord = async (id, wordId) => {
    const { data } = await $host.post(`words/deleteOneWord/${id}`, { wordId })
    return data
}
export const deleteManyCollection = async (arrCollId) => {
    const { data } = await $host.post(`collections/deleteManyCollection/`, { arrCollId })
    return data
}


export const editCollection = async (id, name) => {
    const { data } = await $host.post(`collections/updateCollection/${id}`, { name })
    return data
}
export const editWord = async (id, arrWords) => {
    const { data } = await $host.post(`words/updateWords/${id}`, arrWords)
    return data
}


export const deleteAndMove = async (transferWord, currentCollId, wordId, arrWord) => {
    const { data } = await $host.post(`words/deleteAndMove/${transferWord}`, { currentCollId, wordId, arrWord })
    return data
}



