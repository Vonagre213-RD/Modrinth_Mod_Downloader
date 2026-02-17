import type { ModrinthProject } from '../types/projectType.js'
import type { ModrinthSearchResult } from '../types/searchType.js'
import type { ModrinthVersion, ModrinthDependency } from '../types/versionType.js'
import { fetchError } from './utils/fetchCustomError.js'
import { safeJsonFetch } from './utils/safeJsonFetch.js'
import fs from 'node:fs'
const BASE_URL = 'https://api.modrinth.com/v2'

interface modErrorInterface {
    searchParameter: string,
    modName: string
}

interface downloadReportInterface {
    downloadQueue: modsInterface[],
    errors: modErrorInterface[]
}


interface modsInterface {
    id: string
    slug: string,
    url: string,
    version: string,
    loader: string,
    dependencies: ModrinthDependency[]
}

let downloadReport: downloadReportInterface = { errors: [], downloadQueue: [] }

let mods: modsInterface[] = []



//https://api.modrinth.com/v2/search?query=sod&facets=[[%22project_type:mod%22]]&limit=1


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
            console.log(`couldn't get mod url for: ${mod}`)
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
//englobar las demas funciones en una
async function getModUrl(mod_name: string, version: string, loader: string) {

    //1- primero buscar el mod usando search 

    const searchJson = await searchMod(mod_name);

    //2- obtener la informacion del la version porque ahi es que estan los archivos, solo queremos los datos necesarios

    const modVersionInfo = await getModVersionInformation(searchJson)

    //3- bro no hace nada
    const dependencias = await downloadDependencies(modVersionInfo)

    console.log(`[======mod ${mod_name} was installed succesfully======]\n`)

}

//funcion para buscar los mods, similar a como lo haria un includes
async function searchMod(mod_name: string) {

    let searchResponse

    //primero probar con buscando name exacto para evitar errores de confusion, sino funciona probar con el search
    console.log("\n----searching mod version data by exact name: " + `${BASE_URL}/project/${mod_name}/version?game_versions=["1.20.1"]&loaders=["fabric"]`)

    searchResponse = await safeJsonFetch(`${BASE_URL}/project/${mod_name}/version?game_versions=["1.20.1"]&loaders=["fabric"]`)

    if (!searchResponse.ok) {

        //sino funciona o no encuentra nada, buscar con el search que es similar
        console.log("\n----Exact name search didn't throw any results, trying with finding similar mods")

        searchResponse = await safeJsonFetch(`${BASE_URL}/search?query=${mod_name}&facets=[[%22project_type:mod%22]]&limit=1`)


    }

    const tempJson = await searchResponse.json() as ModrinthVersion[]


    searchResponse = await safeJsonFetch(`${BASE_URL}/project/${tempJson[0]!.project_id}`)

    if (searchResponse.status === 404) {
        downloadReport.errors.push({ modName: mod_name, searchParameter: `${BASE_URL}/project/${tempJson[0]!.project_id}` })
    }


    // console.log(`Couldn't  search response for the mod ${mod_name}, it's search response url was: ${BASE_URL}/project/${tempJson[0]!.project_id} `)


    const searchJson = await searchResponse.json() as ModrinthProject
    return searchJson
}

// el indentificador puede ser tanto el id como el nombre, no voy a hacer dos funciones para eso

async function getModVersionInformation(projectInformationJson: ModrinthProject) {

    try {
        console.log("----Searching mod version information" + `${BASE_URL}/project/${projectInformationJson.id}/version?game_versions=["1.20.1"]&loaders=["fabric"]`)
        const versionResponse = await safeJsonFetch(`${BASE_URL}/project/${projectInformationJson.id}/version?game_versions=["1.20.1"]&loaders=["fabric"]`)
        const versionJson = await versionResponse.json() as ModrinthVersion[]


        const modVersionInfo: modsInterface = {
            id: versionJson[0]!.project_id,
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
        throw new Error(`There was an error with the mod${projectInformationJson.slug}`)
    }
};


//Descargar dependencias
async function downloadDependencies(modVersionInfo: modsInterface) {

    console.log(`\n [====Downloading dependencies for ${modVersionInfo.slug}====]`)
    for (let dependency of modVersionInfo.dependencies) {

        console.log(`[----Searching mod information----]`)

        const projectJson = await searchMod(dependency.project_id!)
        console.log(`[----Mod name found! ${projectJson.slug}----]`)

        const modVersionInfo = getModVersionInformation(projectJson);

        console.log(`[----${projectJson.slug} was installed succesfully----]`)

    }

}


export { bulkScrapper }