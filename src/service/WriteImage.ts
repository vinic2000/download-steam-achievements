import { resolve } from "node:path";
import https from 'https'
import { mkdir} from "node:fs";
import fs from 'fs'

class WriteImage {

    exec(data:any): void {

        try {

            console.log("begin download images from Steam")
            const nameGame = data.name[0]
            let caminho = resolve('img', nameGame);

            this.verifyDirImg(caminho)

            for (const item of data.achievements) {

                let caminho = resolve('img',nameGame, `${item.title}.jpg`);
                const file = fs.createWriteStream(caminho)


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
        mkdir(caminho,{recursive: true}, (error) => {
            if(error) console.error(error)
        })
    }

}

export default WriteImage