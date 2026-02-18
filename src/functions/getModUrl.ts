import { searchMod } from './searchMod.js'
import { getModVersionInformation } from './getModVersionInformation.js'
import { downloadDependencies } from './downloadDependencies.js'

async function getModUrl(mod_name: string, version: string, loader: string) {

    
    const searchJson = await searchMod(mod_name);

    const modVersionInfo = await getModVersionInformation(searchJson)

    await downloadDependencies(modVersionInfo)

    console.log(`[======mod ${mod_name} was installed succesfully======]\n`)
}

export { getModUrl }
