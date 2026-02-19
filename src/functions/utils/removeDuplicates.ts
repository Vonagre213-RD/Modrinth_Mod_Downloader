

function removeDuplicates<T>(array: Array<T>) {

    const seen = new Set<string>()

    const result = array.filter(item => {
        const key = JSON.stringify(item)
        if (seen.has(key)) {
            return false
        }

        seen.add(key)
        return true
    })
   
    return result;
}

export {removeDuplicates}