import * as v from 'valibot'
import { bookingsQuerySchema } from './schema.js'

export class RequestParser {
    #resource
    #method
    #params
    #body
    #bodyPromise

    constructor(request) {
        const urlObject = new URL(request.url, 'http://localhost:3000')
        this.#method = request.method
        this.#resource = this.#parseResource(urlObject)
        this.#params = this.#parseParams(urlObject)
        this.#bodyPromise = this.#parseBody(request)
        console.log(this.#method, this.#resource, this.#params)
    }

    #parseParams(urlObject) {
        // разобрать и вернуть согласно примеру ниже
        // 1. параметры пути на основе urlObject.pathname (0.5 балла)
        // 2. поисковые параметры на основе urlObject.searchParams (по 0.5 за каждый из четырех)
        //
        // бонус (1 балл): настройки пагинации выдавать в цельном объекте paginate
        // бонус (1 балл): добавить валидацию на основе valibot-схемы (добавить в schema.js)

        const pathname = urlObject.pathname
        const lastSlashIndex = pathname.lastIndexOf('/')

        const pathParams =
            lastSlashIndex > 0
                ? { id: Number(pathname.slice(lastSlashIndex + 1)) }
                : null

        // const queryParamsRaw = {
        //     filter: urlObject.searchParams.get('filter'),
        //     sort: urlObject.searchParams.get('sort'),
        //     limit: urlObject.searchParams.get('limit')
        //         ? Number(urlObject.searchParams.get('limit'))
        //         : null,
        //     offset: urlObject.searchParams.get('offset')
        //         ? Number(urlObject.searchParams.get('offset'))
        //         : null,
        // }

        const queryParamsRaw = ['filter', 'sort', 'limit', 'offset'].reduce((acc, key) => {
            const value = urlObject.searchParams.get(key)
            
            if (value !== null) {
                acc[key] = (key === 'limit' || key === 'offset') ? Number(value) : value
            }

            return acc
        }, {})

        // const queryParamsRaw = {}

        // const filter = urlObject.searchParams.get('filter')
        // if (filter !== null) queryParamsRaw.filter = filter

        // const sort = urlObject.searchParams.get('sort')
        // if (sort !== null) queryParamsRaw.sort = sort

        // const limit = urlObject.searchParams.get('limit')
        // if (limit !== null) queryParamsRaw.limit = Number(limit)

        // const offset = urlObject.searchParams.get('offset')
        // if (offset !== null) queryParamsRaw.offset = Number(offset)

        console.log(queryParamsRaw)

        let queryParams = null
        let paginate = null

        try {
            const parsed = v.parse(bookingsQuerySchema, queryParamsRaw)

            queryParams = {
                filter: parsed.filter ?? null,
                sort: parsed.sort ?? null,
            }

            if (parsed.limit !== undefined || parsed.offset !== undefined) {
                paginate = {
                    limit: parsed.limit ?? null,
                    offset: parsed.offset ?? null,
                }
            }
        } catch (error) {
            // TODO: чет вписать в кэтч при парсинге параметров
        }

        console.log(queryParams)

        return {
            pathParams,
            queryParams,
            paginate,
        }
    }

    #parseResource(urlObject) {
        // возвращать ресурс (0.5 балла)
        // (из адреса http://localhost:3000/bookings возвращать /bookings)
        // (из адреса http://localhost:3000/bookings/1 возвращать /bookings)
        // (из адреса http://localhost:3000/bookings?sort=start.desc возвращать /bookings)
        const pathname = urlObject.pathname
        const lastSlashIndex = pathname.lastIndexOf('/')

        return lastSlashIndex === 0
            ? pathname
            : pathname.substring(0, lastSlashIndex)
    }

    #parseBody(request) {
        // базовое задание (2 балла):
        // проверить, успевает ли считаться тело перед тем, как мы вернем ответ
        // если нет, вспомнить промисы и сделать соответствующий then,
        // либо (если промисы сложны) встроить ожидание в коллбэк
        // бонус (2 балла): за промисификацию request.on('data') и request.on('end')

        return new Promise((resolve) => {
            let payload = ''

            request.on('data', (chunk) => {
                payload += chunk.toString()
            })

            request.on('end', () => {
                resolve(payload || null)
            })
        })
    }

    toObject() {
        return this.#bodyPromise.then((payload) => ({
            resource: this.#resource,
            method: this.#method,
            params: this.#params,
            payload,
        }))
    }
}
