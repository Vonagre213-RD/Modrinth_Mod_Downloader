import { bulkScrapper } from "./functions/modSearching/bulkScrapper.js"
import { XmlParser } from "./functions/utils/XmlParser.js"
import { sanitizer } from "./functions/utils/XmlSanitizer.js"

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

function Main() {
    const downloadQueueFile: DownloadQueueBaseType = XmlParser("./downloadQueue.xml")
    const downloadQueue: DownloadQueueMappedType = sanitizer(downloadQueueFile)

    bulkScrapper(downloadQueue.mods)
}

Main()


