import { createServer } from 'node:http'
import Router from './router.js'
import { RequestParser } from './requestParser.js'
import { BookingController } from './controller.js'

const router = new Router()

router.register({ method: "GET", resource: "/bookings" }, BookingController.findAll)
router.register({ method: "POST", resource: "/bookings" }, BookingController.create)
router.register({method: "DELETE", resource: "/bookings"}, BookingController.delete)

const server = createServer((request, response) => {
    const { method, resource, params, payload } = new RequestParser(request).toObject()
    console.log(method, resource, params, payload)
    const { statusCode, data } = router.handle({ method, resource })({ params, payload })

    response.writeHead(statusCode, undefined, {
        "Content-Type": "application/json"
    })

    response.end(JSON.stringify(data))
})

server.listen(3000, () => {
    console.log(`API server listening: http://localhost:3000`)
})