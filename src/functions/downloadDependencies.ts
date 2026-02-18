import type { modsInterface } from '../types/fetchTypes.js'
import { searchMod } from './searchMod.js'
import { getModVersionInformation } from './getModVersionInformation.js'

async function downloadDependencies(modVersionInfo: modsInterface) {
    console.log(`\n [====Downloading dependencies for ${modVersionInfo.slug}====]`)
    for (let dependency of modVersionInfo.dependencies) {
        console.log(`[----Searching mod information----]`)
        const projectJson = await searchMod(dependency.project_id!)
        console.log(`[----Mod name found! ${projectJson.slug}----]`)
        await getModVersionInformation(projectJson);
        console.log(`[----${projectJson.slug} was installed succesfully----]`)
    }
}

export { downloadDependencies }
