import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import util from 'util'



@Injectable()
export class FilesService {

    async createFile(file): Promise<any> {
        try {

            const fileWords = []
            const fileName = 'dictionary.txt'
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            const result = await fs.readFileSync(path.resolve(__dirname, '..', 'static', 'dictionary.txt'), 'utf-8')
            result.split(/\r?\n/).forEach(line => {
                if (line.length === 0) {
                    return
                } else {
                    const word = `${line}`.split(';')
                    const objWord = Object.assign({ eng: word[0], rus: word[1] })
                    fileWords.push(objWord)
                }
            })
            return fileWords

        } catch (e) {
            throw new HttpException('произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
