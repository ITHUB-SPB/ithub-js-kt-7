// requestParser
export class RequestParser {
    #url;
    #method;
    #params;
    #body;

    constructor(request) {
        const path = request.url
        this.#method = request.method
        this.#url = this.#parseUrl(path)
        this.#parseBody(request)
        this.#params = this.#parseParams(path)
    }

    #parseParams(path) {

    }

    #parseUrl(path) {

    }

    #parseBody(request) {
        let payload = ''

        request.on("data", chunk => {
            payload += chunk.toString()
        })

        request.on("end", () => {
            this.#body = payload
        })
    }

    toObject() {
        return {
            url: this.#url,
            method: this.#method,
            params: this.#params,
            payload: this.#body
        }
    }
}