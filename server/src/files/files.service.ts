import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'


@Injectable()
export class FilesService {

    async createFile(files): Promise<any> {
        try {
            const fileNames = []
            files.forEach(file => {
                const fileName = uuid.v4() + '.txt'
                const filePath = path.resolve(__dirname, '..', 'static')
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                }
                fs.writeFileSync(path.join(filePath, fileName), file.buffer)
                fileNames.push(fileName)
            }
            )
            return fileNames

        } catch (e) {
            throw new HttpException('произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


}
