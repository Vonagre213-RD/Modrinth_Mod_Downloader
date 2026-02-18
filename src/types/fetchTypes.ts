import type { ModrinthDependency } from './versionType.js'

export interface modErrorInterface {
    searchParameter: string,
    modName: string
}

export interface modsInterface {
    id: string
    slug: string,
    url: string,
    version: string,
    loader: string,
    dependencies: ModrinthDependency[]
}

export interface downloadReportInterface {
    downloadQueue: modsInterface[],
    errors: modErrorInterface[]
}
