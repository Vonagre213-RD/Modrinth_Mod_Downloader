
import fs from 'fs'
import { safeJsonFetch } from '../utils/safeJsonFetch.js'
import { Readable } from 'stream'
import { finished } from 'stream/promises'
import Path from 'path'


async function downloadFile(destination_path: string, url: string){
    
    const filename = Path.basename(url);
    const filepath = Path.join(destination_path, filename)
    const res = await safeJsonFetch(url)

    const stream = fs.createWriteStream(filepath);

    await finished(Readable.fromWeb(res.body!).pipe(stream));

    
}

export {downloadFile}