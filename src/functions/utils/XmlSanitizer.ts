import { mods } from "../../state/downloadState.js"
import { XmlParser } from "./XmlParser.js"

interface DownloadQueueBaseType {
    downloadQueue: {
        loader: string,
        version: string,
        mods: string
    }
}

interface DownloadQueueMappedType {

    loader: string,
    version: string,
    mods: string[]

}

function sanitizer(downloadQueueXml: DownloadQueueBaseType): DownloadQueueMappedType {



    let downloadQueueSanitized: DownloadQueueMappedType = {
        mods: downloadQueueXml.downloadQueue.mods.replaceAll('\n', "").split(',').map(mod => {
            return mod.trim()
        }).filter(mod => mod.length > 0),
        loader: downloadQueueXml.downloadQueue.loader,
        version: downloadQueueXml.downloadQueue.version
    }


    return downloadQueueSanitized
}


export { sanitizer }