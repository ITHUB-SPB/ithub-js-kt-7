import { createServer } from 'node:http'
import { writeFileSync } from 'node:fs' // для бонуса с сохранением в файл
import Router from './router.js'
import { RequestParser } from './requestParser.js'
import { BookingController } from './controller.js'

const router = new Router()

router.register(
    { method: 'GET', resource: '/bookings' },
    BookingController.findAll,
)
router.register(
    { method: 'POST', resource: '/bookings' },
    BookingController.create,
)
router.register(
    { method: 'DELETE', resource: '/bookings' },
    BookingController.delete,
)

const server = createServer((request, response) => {
    new RequestParser(request)
        .toObject()
        .then(({ method, resource, params, payload }) => {
            const handler = router.handle({ method, resource })
            const { statusCode, data } = handler({ params, payload })

            response.writeHead(statusCode, {
                'Content-Type': 'application/json',
            })

            response.end(JSON.stringify(data))
        })
})

server.listen(3000, () => {
    console.log(`API server listening: http://localhost:3000`)
})
