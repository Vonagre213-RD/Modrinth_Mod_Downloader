import { fetchError } from "./fetchCustomError.js";

async function safeJsonFetch(url: string) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new fetchError(`HTTP error ${response.status}`, url)
    }
    return response;
}

export {safeJsonFetch}