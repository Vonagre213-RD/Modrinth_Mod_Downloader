import type { ModrinthProject } from '../../types/projectType.js'
import type { ModrinthVersion } from '../../types/versionType.js'
import type { modsInterface } from '../../types/fetchTypes.js'
import { safeJsonFetch } from '../utils/safeJsonFetch.js'
import { downloadReport, BASE_URL } from '../../state/downloadState.js'
import { downloadInformation } from '../../state/DownloadInformation.js'

async function getModVersionInformation(projectInformationJson: ModrinthProject) {
    try {
        console.log("\n[====Searching mod version information" + `${BASE_URL}/project/${projectInformationJson.id}/version?game_versions=["${downloadInformation.version}"]&loaders=["${downloadInformation.loader}"] ====]`)
        
        const versionResponse = await safeJsonFetch(`${BASE_URL}/project/${projectInformationJson.id}/version?game_versions=["${downloadInformation.version}"]&loaders=["${downloadInformation.loader}"]`)
        const versionJson = await versionResponse.json() as ModrinthVersion[]

        if (versionJson.length === 0) {
            downloadReport.errors.push({searchParameter:`${BASE_URL}/project/${projectInformationJson.id}/version?game_versions=["${downloadInformation.version}"]&loaders=["${downloadInformation.loader}"]`, modName:projectInformationJson.slug })
            throw new Error(`\n!----------could find the version data for the mod ${projectInformationJson.slug}----------!`)
        }

        const project_id = versionJson[0]!.project_id;

        const modVersionInfo: modsInterface = {
            id: project_id,
            slug: projectInformationJson.slug,
            url: versionJson[0]!.files[0]!.url,
            version: versionJson[0]!.version_number,
            loader: versionJson[0]!.loaders[0]!,
            dependencies: versionJson[0]!.dependencies
        }

        downloadReport.downloadQueue.push(modVersionInfo)
        return modVersionInfo
    }
    catch (error) {
        throw new Error(`There was an error with the mod ${projectInformationJson.slug}`)
    }
}

export { getModVersionInformation }
