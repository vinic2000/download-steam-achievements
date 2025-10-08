import * as cheerio from 'cheerio';
import https from 'https'

class LoadImg {

    async loadImg(url: string): Promise<any> {
        return new Promise((resolve, reject) => {

            url += '?l=english'

            https.get(url, (res) => {

                let html = ''

                res.on('data', chuck => html += chuck)
                res.on('end', () => {

                    const $ = cheerio.load(html);

                    const name = $('.profile_small_header_texture div h1').map((i, h1) => {
                        const text = $(h1).text();
                        return text 
                    })

                    const achievements = $('.achieveRow').map((i, el) => {

                        const title = $(el).find('.achieveTxt h3').text();
                        const icon = $(el).find('.achieveImgHolder img').attr('src');

                        return {
                            title,
                            icon
                        }

                    })
                    resolve({achievements, name})
                })
                res.on('error', error => reject(error))
            })

        })
    }

}

export default LoadImg;