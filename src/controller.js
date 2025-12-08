import Timeslot from "./timeslot.js"
import { bookings } from "./data-provider.js"

export function getAllBookings() {
    const bookingObjects = bookings.map(bookingMap => Timeslot.fromMapped(bookingMap))
    console.log(bookingObjects)

    return {
        statusCode: 200,
        data: {
            bookings: bookingObjects.map(bookingObject => bookingObject.toString())
        }
    }
}

export function createBooking() {
    // сделать проверку входных данных на валидность
    // сделать проверку выходных данных
    // обработать плохие случаи
    bookings.push({ start: 1263280000, end: 1263292000 })

    return {
        statusCode: 201,
        data: {
            booking: bookings.at(-1)
        }
    }
}