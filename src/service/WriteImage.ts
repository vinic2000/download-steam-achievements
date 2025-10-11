import { resolve } from "node:path";
import https from 'https'
import { mkdir} from "node:fs";
import fs from 'fs'
import path from 'node:path'

const appBasePath = (process as any).pkg ? path.dirname(process.execPath) : process.cwd();

class WriteImage {

    exec(data:any): void {

        try {

            console.log("begin download images from Steam")
            const nameGame = data.name[0]
            let caminho = resolve(appBasePath, 'img', nameGame);

            this.verifyDirImg(caminho)

            for (const item of data.achievements) {

                let caminhoArquivo = resolve(appBasePath, 'img', nameGame, `${item.title}.jpg`);
                const file = fs.createWriteStream(caminhoArquivo)


                https.get(item.icon as string, (res) => {
                    res.pipe(file)
                })
            }

            console.info("Download finished")

        } catch (error) {
            console.error('Error during download image')
            throw error;
        }

    }

    verifyDirImg(caminho:string){
        try {
            fs.mkdirSync(caminho, { recursive: true })
        } catch (err) {
            console.error(err)
        }
    }

}

export default WriteImage