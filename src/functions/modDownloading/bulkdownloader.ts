import { downloadFile } from "./DownloadMods.js";
import { downloadInformation } from "../../state/DownloadInformation.js";
import type { downloadReportInterface } from "../../types/fetchTypes.js";

async function bulkdownloader(mods: downloadReportInterface) {

    for (const mod of mods.downloadQueue) {
        downloadFile(downloadInformation.output, mod.url)
    }
}

export {bulkdownloader}