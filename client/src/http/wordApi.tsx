import { $authHost, $host } from "./index"
import { ICollectionWords } from "../model"


export const getWords = async (collId: any) => {
    const response = await $authHost.post<ICollectionWords[]>(`words/getWords/`, { collId })
    return response.data
}

export const addWords = async (id: any, words: any) => {
    const { data } = await $host.post<ICollectionWords[]>(`words/addWorlds/${id}`, words)
    return data
}

export const addWordsFromFile = async (id: any, formData: any) => {
    const { data } = await $host.post<ICollectionWords[]>(`words/addWordsFromFile/${id}`, formData)
    return data
}

export const deleteWord = async (wordId: any, id: any) => {
    const response = await $host.post(`words/deleteOneWord/${id}`, { wordId })
    return response.data.wordId
}

export const editWord = async (id: any, arrWords: any) => {
    const { data } = await $host.post(`words/updateWords/${id}`, arrWords)
    return data
}

export const deleteAndMove = async (transferWord: any, currentCollId: any, wordId: any, arrWord: any) => {
    const { data } = await $host.post(`words/deleteAndMove/${transferWord}`, { currentCollId, wordId, arrWord })
    return data
}



