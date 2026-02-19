import { downloadFile } from "./DownloadMods.js";
import { downloadInformation } from "../../state/DownloadInformation.js";
import type { downloadReportInterface } from "../../types/fetchTypes.js";
import fs from 'fs'

async function bulkdownloader(mods: downloadReportInterface) {
    if (!fs.existsSync("./mods")) {
        fs.mkdirSync("./mods")
    }
    for (const mod of mods.downloadQueue) {
        downloadFile(downloadInformation.output, mod.url)
    }
}

export { bulkdownloader }