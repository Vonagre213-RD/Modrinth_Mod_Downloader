

class fetchError extends Error{

    url: string;

    constructor(message: string, url:string){
        super(message)
        this.url = url;

    }
}

export {fetchError}