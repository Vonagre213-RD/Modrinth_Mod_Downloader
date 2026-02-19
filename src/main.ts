import { bulkScrapper } from "./functions/modSearching/bulkScrapper.js"
import { XmlParser } from "./functions/utils/XmlParser.js"
import { sanitizer } from "./functions/utils/XmlSanitizer.js"
import { bulkdownloader } from "./functions/modDownloading/bulkdownloader.js"
import { downloadReport } from "./state/downloadState.js"
import { downloadInformation } from "./state/DownloadInformation.js"

interface DownloadQueueBaseType {
    downloadQueue: {
        loader: string,
        version: string,
        mods: string,
        outputPath: string
    }
}

interface DownloadQueueMappedType {

    loader: string,
    version: string,
    mods: string[],
    outputPath: string

}

async function Main() {
    const downloadQueueFile: DownloadQueueBaseType = XmlParser("./downloadQueue.xml")

    const downloadQueue: DownloadQueueMappedType = sanitizer(downloadQueueFile)

    downloadInformation.loader =  downloadQueue.loader
    downloadInformation.version =  downloadQueue.version
    downloadInformation.output =  downloadQueue.outputPath

    await bulkScrapper(downloadQueue.mods)

    await bulkdownloader(downloadReport)
}


Main()


