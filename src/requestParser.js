export class RequestParser {
    #resource;
    #method;
    #params;
    #body;
    #bodyPromise;

    constructor(request) {
        const urlObject = new URL(request.url, 'http://localhost:3000');
        this.#method = request.method;
        this.#resource = this.#parseResource(urlObject);
        this.#params = this.#parseParams(urlObject);
        this.#bodyPromise = this.#parseBody(request);
    }

    #parseParams(urlObject) {
        // разобрать и вернуть согласно примеру ниже
        // 1. параметры пути на основе urlObject.pathname (0.5 балла)
        // 2. поисковые параметры на основе urlObject.searchParams (по 0.5 за каждый из четырех)
        // 
        // бонус (1 балл): настройки пагинации выдавать в цельном объекте paginate
        // бонус (1 балл): добавить валидацию на основе valibot-схемы (добавить в schema.js)

        const pathname = urlObject.pathname
        const LastSlashIndex = pathname.lastIndexOf('/')

        // return{
        //     pathPaeams: LastSlashIndex === 0 ? null :{
        //         id: Number(pathname.slice(LastSlashIndex + 1))
        //     }
        // }

        // return {
        //     pathParams: { id: 1 }, // или же null, если их нет
        //     queryParams: {
        //         filter: 'end.eq.1000000', // или же null, если его нет,
        //         sort: 'start.asc', // или же null, если его нет,
        //         limit: 10, // или же null, если его нет,
        //         offset: 0 // или же null, если его нет,
        //     } //
        
    }


     #parseParams(urlObject) {

        const pathname = urlObject.pathname;
        const pathSegments = pathname.split('/').filter(segment => segment !== '');
        
        let pathParams = null;

        if (pathSegments.length > 0) {
            const lastSegment = pathSegments[pathSegments.length - 1];
            const id = Number(lastSegment);
            if (!isNaN(id) && lastSegment === id.toString()) {
                pathParams = { id: id };
            }
        }

        const searchParams = urlObject.searchParams;

        const filter = searchParams.get('filter');
        const sort = searchParams.get('sort');
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');
        
        let queryParams = null;
        let paginate = null;
        
        if (filter || sort || limit || offset) {
            queryParams = {
                filter: filter || null,
                sort: sort || null,
                limit: limit ? Number(limit) : null,
                offset: offset ? Number(offset) : null
            };
            
        
            if (limit || offset) {
                paginate = {};
                if (limit) paginate.limit = Number(limit);
                if (offset) paginate.offset = Number(offset);
            }
        }

        const result = { pathParams };
        
        if (queryParams) {
            result.queryParams = queryParams;
        }
        
        if (paginate) {
            result.paginate = paginate;
        }
        
        return result;
}
// //Первоя част кт

    // #parseResource(urlObject) {
    //     // возвращать ресурс (0.5 балла)
    //     // (из адреса http://localhost:3000/bookings возвращать /bookings)
    //     // (из адреса http://localhost:3000/bookings/1 возвращать /bookings)
    //     // (из адреса http://localhost:3000/bookings?sort=start.desc возвращать /bookings)
    //     const pathname = urlObject.pathname
    //     const LastSlashIndex = pathname.lastIndexOf('/')

    //     return LastSlashIndex === 0 ? pathname : pathname.substring(0, LastSlashIndex)
        
    // }

    #parseResource(urlObject) {
        const pathname = urlObject.pathname;
        const pathSegments = pathname.split('/').filter(segment => segment !== '');
        
        if (pathSegments.length > 0) {
            const lastSegment = pathSegments[pathSegments.length - 1];
            const id = Number(lastSegment);
            if (!isNaN(id) && lastSegment === id.toString()) {
                pathSegments.pop();
            }
        }
        
        return pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/';
    }
    // #parseBody(request) {
    //     // базовое задание (2 балла):
    //     // проверить, успевает ли считаться тело перед тем, как мы вернем ответ
    //     // если нет, вспомнить промисы и сделать соответствующий then,
    //     // либо (если промисы сложны) встроить ожидание в коллбэк
    //     // бонус (2 балла): за промисификацию request.on('data') и request.on('end')

    //     let payload = ''

    //     request.on("data", chunk => {
    //         payload += chunk.toString()
    //     })

    //     request.on("end", () => {
    //         this.#body = payload
    //     })
    // }


     #parseBody(request) {
        return new Promise((resolve) => {
            if (this.#method === 'GET' || this.#method === 'HEAD') {
                this.#body = null;
                resolve();
                return;
            }

            let payload = '';
            
            request.on("data", chunk => {
                payload += chunk.toString();
            });

            request.on("end", () => {
                try {
                    if (payload) {
                        try {
                            this.#body = JSON.parse(payload);
                        } catch {
                            this.#body = payload;
                        }
                    } else {
                        this.#body = null;
                    }
                } catch (error) {
                    this.#body = null;
                }
                resolve();
            });

            request.on("error", () => {
                this.#body = null;
                resolve();
            });
        });
    }

    toObject() {
        return {
            resource: this.#resource,
            method: this.#method,
            params: this.#params,
            payload: this.#body
        }
    }
}