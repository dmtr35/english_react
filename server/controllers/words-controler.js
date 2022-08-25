import 'dotenv/config'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import Collections from '../models/Collections.js'
import Words from '../models/Collections.js'
import path from 'path'
import fs from 'fs'
import util from 'util'
const __dirname = path.resolve()




class WordsController {

    async addWorlds(req, res) {
        try {
            const collectionId = req.params.id
            const { filterArrWord } = req.body
            const arrWord = JSON.parse(filterArrWord)

            await Collections.updateOne({ "_id": collectionId }, { "$push": { "words": { "$each": arrWord } } })
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
            const arrWord = JSON.parse(filterArrWord)
            const file = req.files.file
            await file.mv(path.resolve(__dirname, 'static', 'dictionary.txt'))
            const readFile = util.promisify(fs.readFile)
            const result = await readFile(path.resolve(__dirname, './static/dictionary.txt'), 'utf-8')
            result.split(/\r?\n/).forEach(line => {
                if (line.length === 0) {
                    return
                } else {
                    const word = `${line}`.split(';')
                    const objWord = Object.assign({eng: word[0], rus: word[1]})
                    arrWord.push(objWord)
                }
            })
            await Collections.updateOne({ "_id": collectionId }, { "$push": { "words": { "$each": arrWord } } })
            fs.rm(path.resolve(__dirname, './static/dictionary.txt'), (err) => {
                if (err) {
                    throw err
                }
            })
            return res.json("excellent")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error2' })
        }
    }


    // async getWords(req, res) {
    //     try {
    //         const { userId } = req.params
    //         const collections = await Collections.find({ userId })
    //         return res.json(collections)
    //     } catch (e) {
    //         console.log(e)
    //         res.status(500).json({ message: 'Create error3' })
    //     }
    // }


    async updateWords(req, res) {
        try {
            const { wordId } = req.params
            const arrWord = req.body

            const response = await Collections.findOneAndUpdate({ "words._id": wordId }, { "$set": { "words.$": arrWord } }, { new: true })
            return res.json(response)
        } catch (e) {
            res.status(500).json({ message: 'Create error5' })
        }
    }


    async deleteOneWord(req, res) {
        try {
            const collectionId = req.params.id
            const { wordId } = req.body
            await Collections.updateOne({ "_id": collectionId }, { "$pull": { "words": { "_id": wordId } } })
            return res.json("word delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error6' })
        }
    }


    async deleteAndMove(req, res) {
        try {
            const transferWord = req.params.id
            const { currentCollId, arrWord, wordId } = req.body
            const session = await mongoose.startSession()
            await session.withTransaction(async () => {
                await Collections.updateOne({ "_id": currentCollId }, { "$pull": { "words": { "_id": wordId } } })
                await Collections.updateOne({ "_id": transferWord }, { "$push": { "words": { "$each": arrWord } } })
            })
            session.commitTransaction()
            session.endSession()
            return res.json("collection delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error7' })
        }
    }
}




export default new CollectionsController()
