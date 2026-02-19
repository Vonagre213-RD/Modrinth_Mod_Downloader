import fs from 'node:fs'
import { getModUrl } from './getModUrl.js'
import { downloadReport } from '../../state/downloadState.js'
import { fetchError } from '../utils/fetchCustomError.js'
import { downloadInformation } from '../../state/DownloadInformation.js'
import type { downloadReportInterface } from '../../types/fetchTypes.js'
import { removeDuplicates } from '../utils/removeDuplicates.js'
import { error } from 'node:console'

async function bulkScrapper(ModNames: string[]) {


    const normalizedModNames = ModNames.map(mod => (
        mod.replaceAll(' ', '-')
    ))
    console.log(normalizedModNames[0])

    for (let mod of normalizedModNames) {
        try {
            console.log(`[======Searching ${mod}======]`)
            await getModUrl(mod)
        }
        catch (error) {

            if (error instanceof fetchError) {

                console.log(`couldn't get mod url for: ${mod}, used url was ${error.url}`)
            }
            if (error instanceof Error) {
                console.log(error.message)
            }

        }
        continue;
    }
    let noDuplicatesDownloadReport: downloadReportInterface = {downloadQueue: [], errors: []};

    noDuplicatesDownloadReport.downloadQueue = removeDuplicates(downloadReport.downloadQueue)
    noDuplicatesDownloadReport.errors = removeDuplicates(downloadReport.errors)
    
    const modsReportJson = JSON.stringify(noDuplicatesDownloadReport);

    fs.writeFile("./Data/report.json", modsReportJson, (err) => {
        if (err) {
            console.log(err)
        }
    })
}



export { bulkScrapper }
