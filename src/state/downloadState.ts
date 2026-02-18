import type { downloadReportInterface, modsInterface } from '../types/fetchTypes.js'

export let downloadReport: downloadReportInterface = { errors: [], downloadQueue: [] }

export let mods: modsInterface[] = []

export const BASE_URL = 'https://api.modrinth.com/v2'
