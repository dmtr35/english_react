import 'dotenv/config'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import Collections from '../models/Collections.js'
import Words from '../models/Words.js'

import path from 'path'
import fs from 'fs'
import util from 'util'
const __dirname = path.resolve()




class CollectionsController {
    async createCollections(req, res) {
        try {
            const { userId } = req.params
            const { name, filterArrWord } = req.body
            console.log('userId:', userId);
            console.log('name:', name);
            // console.log('filterArrWord:', filterArrWord);



            const words = JSON.parse(filterArrWord)
            // console.log('arrWords:', arrWords);
            // const collections = await Collections.create({ userId, name })
            // console.log("collId:", collections._id);
            // const collectionId = collections._id

            // const words = await Words.create({ collectionId, arrWords })


            // const collections = await Collections.create({ userId, name })
            // const collId = collections._id
            // await Words.create({ collId, words })
            const session = await mongoose.startSession()
            await session.withTransaction(async () => {
                const collections = await Collections.create({ userId, name })
                await Words.create({ collId4: `${collections._id}`, words })
                return await res.json(collections)
            })
            
            
            
            // const session = await mongoose.startSession()
            // await session.withTransaction(async () => {
            //     const collections = await Collections.create({ userId, name })
            //     const collId = collections._id
            //     await Words.create({ collId, words })
            // })
            // session.commitTransaction()
            // session.endSession()
            
            
            session.commitTransaction()
            session.endSession()
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error11' })
        }
    }
    async createFromFile(req, res) {
        try {
            const { userId } = req.params
            const { name, filterArrWord } = req.body
            const words = JSON.parse(filterArrWord)
            const file = req.files.file
            await file.mv(path.resolve(__dirname, 'static', 'dictionary.txt'))
            const readFile = util.promisify(fs.readFile)
            const result = await readFile(path.resolve(__dirname, './static/dictionary.txt'), 'utf-8')
            result.split(/\r?\n/).forEach(line => {
                if (line.length === 0) {
                    return
                } else {
                    const word = `${line}`.split(';')
                    const objWord = Object.assign({ eng: word[0], rus: word[1] })
                    words.push(objWord)
                }
            })
            const collections = await Collections.create({ userId, name, words })
            fs.rm(path.resolve(__dirname, './static/dictionary.txt'), (err) => {
                if (err) {
                    throw err
                }
            })
            return res.json(collections)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error11' })
        }
    }

    async getCollections(req, res) {
        try {
            const { userId } = req.params
            const collections = await Collections.find({ userId })
            return res.json(collections)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error3' })
        }
    }

    async updateCollection(req, res) {
        try {
            const collectionId = req.params.id
            const name = req.body
            await Collections.findByIdAndUpdate(collectionId, name, { new: true })
            return res.json("update")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error4' })
        }
    }

    async deleteOneCollection(req, res) {
        try {
            const collectionId = req.params.id
            await Collections.findByIdAndDelete(collectionId)
            return res.json("collection delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error7' })
        }
    }

    async deleteManyCollection(req, res) {
        try {
            const { arrCollId } = req.body
            await Collections.deleteMany({ _id: { $in: arrCollId } })

            return res.json("selected collection delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error7' })
        }
    }

}




export default new CollectionsController()
