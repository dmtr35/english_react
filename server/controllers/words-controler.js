import 'dotenv/config'
import mongoose from 'mongoose'
import Words from '../models/Words.js'
import path from 'path'
import fs from 'fs'
import filesService from '../service/file-service.js'
const __dirname = path.resolve()



class WordsController {

    async addWorlds(req, res) {
        try {
            const collectionId = req.params.id
            const words = req.body
            await Words.updateOne({ "collId": collectionId }, { "$push": { "words": { "$each": words } } })
            return res.json("excellent")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error2' })
        }
    }
    async addWordsFromFile(req, res) {
        try {
            const collectionId = req.params.id
            const { filterArrWord } = req.body
            const words = JSON.parse(filterArrWord)
            const file = await filesService.createFile(req.files.file)
            words.push(...file)
            await Words.updateOne({ "collId": collectionId }, { "$push": { "words": { "$each": words } } })
            // удалить файл
            // fs.rm(path.resolve(__dirname, './static/dictionary.txt'), (err) => {
            //     if (err) {
            //         throw err
            //     }
            // })
            return res.json("excellent")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error2' })
        }
    }


    async getWords(req, res) {
        try {
            const { collId } = req.body
            const words = await Words.find({ collId: { $in: collId } })
            return res.json(words)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Get words error' + e })
        }
    }


    async updateWords(req, res) {
        try {
            const { wordId } = req.params
            const arrWord = req.body
            await Words.findOneAndUpdate({ "words._id": wordId }, { "$set": { "words.$": arrWord } }, { new: true })
            return res.json("Word renamed")
        } catch (e) {
            res.status(500).json({ message: 'Word renamed, error:' + e })
        }
    }


    async deleteOneWord(req, res) {
        try {
            const collectionId = req.params.id
            const { wordId } = req.body
            await Words.updateOne({ "collId": collectionId }, { "$pull": { "words": { "_id": wordId } } })
            return res.status(200).json({ wordId })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Word not delete, error:' + e })
        }
    }


    async deleteAndMove(req, res) {
        try {
            const transferWord = req.params.id
            const { currentCollId, arrWord, wordId } = req.body
            const session = await mongoose.startSession()
            await session.withTransaction(async () => {
                await Words.updateOne({ "collId": currentCollId }, { "$pull": { "words": { "_id": wordId } } }, { session })
                await Words.updateOne({ "collId": transferWord }, { "$push": { "words": { "$each": arrWord } } }, { session })
                return await res.json("word moved")
            })
            // session.commitTransaction()
            session.endSession()
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'happened somewhere error:' + e })
        }
    }
}




export default new WordsController()
