import LoadImg from "./service/LoadImg";
import WriteImage from "./service/WriteImage";
import readline from "node:readline/promises";
import fs from 'fs'
import { resolve } from "node:path";

const loadImg = new LoadImg();
const writeImage = new WriteImage();

const saveLogError = (e: Error) => {

    console.log('Error', e)
    let caminho = resolve('log');
    writeImage.verifyDirImg(caminho)

    caminho = resolve(caminho, 'log.txt')

    const stream = fs.createWriteStream(caminho, { flags: 'a' })
    stream.write(`${new Date().toString()} - ` + JSON.stringify(e.toString()) + '\n')
    stream.end()

}

process.on('uncaughtException', (err) => {
    saveLogError(err)
    process.exit(1); // ou tente reiniciar com um gerenciador como PM2
});

process.on('unhandledRejection', (reason, promise) => {
    saveLogError(reason as Error)
});

(async () => {

    process.on('uncaughtException', (err) => {
        console.error('Erro não tratado:', err);
        process.exit(1); // ou tente reiniciar com um gerenciador como PM2
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.error('Rejeição não tratada:', reason);
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    do {

        try {

            const url = await rl.question('URL for download or key "exit" for close program: ');
            if (url.toString().toUpperCase() === 'EXIT') {
                process.exit(0)
            } else if (url.toString().toUpperCase()) {
                const lista = await loadImg.loadImg(url)
                await writeImage.exec(lista)
            }

        } catch (error) {
            console.error("Something don't work!", error)
            // saveLogError(error)

        }

    } while (true)

})()
