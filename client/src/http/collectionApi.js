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
    const limit = 8
    const page = 1
    const { data } = await $authHost.get(`collections/getCollections/${id}/?limit=${limit}&page=${page}`)
    return data
}
export const getWords = async (collId) => {
    const limit = 10
    const page = 1
    const response = await $authHost.post(`words/getWords/?limit=${limit}&page=${page}`, { collId })
    return response.data
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
export const deleteWord = async (wordId, id) => {
    const response = await $host.post(`words/deleteOneWord/${id}`, { wordId })
    console.log(response)
    return response.data.wordId
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



