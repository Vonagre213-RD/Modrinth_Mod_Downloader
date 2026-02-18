import fs from 'node:fs'
import { getModUrl } from './getModUrl.js'
import { downloadReport } from '../state/downloadState.js'

async function bulkScrapper(ModNames: string[], version: string, loader: string) {
    const normalizedModNames = ModNames.map(mod => (
        mod.replaceAll(' ', '-')
    ))
    console.log(normalizedModNames[0])

    for (let mod of normalizedModNames) {
        try {
            console.log(`[======Searching ${mod}======]`)
            await getModUrl(mod, version, loader)
        }
        catch (error) {

            
            console.log(`couldn't get mod url for: ${mod}, used url was ${}`)
            console.log(error)

            continue;
        }
    }

    const modsReportJson = JSON.stringify(downloadReport);

    fs.writeFile("./Data/report.json", modsReportJson, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

export { bulkScrapper }
