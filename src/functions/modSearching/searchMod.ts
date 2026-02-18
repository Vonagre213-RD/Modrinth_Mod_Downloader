import type { ModrinthProject } from '../../types/projectType.js'
import type { ModrinthVersion } from '../../types/versionType.js'
import { safeJsonFetch } from '../utils/safeJsonFetch.js'
import { downloadReport, BASE_URL } from '../../state/downloadState.js'
import { downloadInformation } from '../../state/DownloadInformation.js'

async function searchMod(mod_name: string) {
    let searchResponse

    console.log("\n[==== searching mod version data by exact name: " + `${BASE_URL}/project/${mod_name}/version?game_versions=["${downloadInformation.version}"]&loaders=["${downloadInformation.loader}"] ====]`)
    searchResponse = await safeJsonFetch(`${BASE_URL}/project/${mod_name}/version?game_versions=["${downloadInformation.version}"]&loaders=["${downloadInformation.loader}"]`)

    if (!searchResponse.ok) {
        console.log("\n!!----Exact name search didn't throw any results, trying with finding similar mods----!!")
        searchResponse = await safeJsonFetch(`${BASE_URL}/search?query=${mod_name}&facets=[[%22project_type:mod%22]]&limit=1`)
    }

    const tempJson = await searchResponse.json() as ModrinthVersion[] 

    if (tempJson.length === 0) {
        downloadReport.errors.push({searchParameter: searchResponse.url, modName: mod_name})

        throw new Error(`\n!!----------couldn't find the version data for the mod ${mod_name}----------!`)
    }
    const project_id = tempJson![0]!.project_id

    searchResponse = await safeJsonFetch(`${BASE_URL}/project/${project_id}`)


    if (searchResponse.status === 404) {
        downloadReport.errors.push({ modName: mod_name, searchParameter: `${BASE_URL}/project/${project_id}` })
    }

    const searchJson = await searchResponse.json() as ModrinthProject
    return searchJson
}

export { searchMod }
