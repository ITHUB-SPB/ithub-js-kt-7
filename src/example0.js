class Timeslot {
    constructor(start, end) {
        if ([start, end].some(value => !(value instanceof Date))) {
            throw new Error('Values must be instance of Date')
        }

        if (start >= end) {
            throw new Error('Value of end must be greater than end')
        }

        this._start = start
        this._end = end
    }

    isIntersect(otherTimeslot) {
        // TODO go static
        if (!(otherTimeslot instanceof Timeslot)) {
            throw new Error('Value must be a Timeslot')
        }

        return (otherTimeslot._start >= this._start || otherTimeslot._start < this._start && otherTimeslot._end > this._start)
    }

    getStart() {
        return this._start
    }

    getEnd() {
        return this._end
    }

    setStart(newDate) {
        if (!(newDate instanceof Date)) {
            throw new Error('Value must be a Timeslot')
        }

        if (newDate >= this._end) {
            throw new Error('Value of start must be less than end')
        }

        this._start = newDate
    }

    setEnd(newDate) {
        if (!(newDate instanceof Date)) {
            throw new Error('Value must be a Timeslot')
        }

        if (newDate <= this._start) {
            throw new Error('Value of end must be greater than end')
        }

        this._end = newDate
    }

    toMapped() {
        return {
            start: this._start / 1000,
            end: this._start / 1000
        }
    }

    toString() {
        return {
            start: this._start.toLocaleString('ru'),
            end: this._end.toLocaleString('ru')
        }
    }

    toJSON() {
        return JSON.stringify(this.toMapped())
    }

    fromJSON(data) {
        const { start, end } = JSON.parse(data)
        // TODO go static
        this.setStart(new Date(start * 1000))
        this.setEnd(new Date(end * 1000))
    }
}

const slot1 = new Timeslot(new Date(2025, 11, 1, 10), new Date(2025, 11, 1, 13))
const slot2 = new Timeslot(new Date(2025, 11, 1, 11), new Date(2025, 11, 1, 12))

const slot3json = '{ "start": 1000020000, "end": 10000200500 }'

const slot3 = new Timeslot(new Date(), new Date() + 1)

// !!! след. занятие начать со статических методов
// slot3.fromJSON(slot3json)

// console.log(slot1.toMapped())
// console.log(slot1.toString())
// console.log(slot1.toJSON())
console.log(slot3)