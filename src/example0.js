class Timeslot {
  #start;

  constructor(start, end) {
    if ([start, end].some((value) => !this.#isDate(value))) {
      throw new Error("Values must be instance of Date");
    }

    if (start >= end) {
      throw new Error("Value of end must be greater than end");
    }

    this.#start = start;
    this._end = end;
  }

  #isDate(value) {
    return value instanceof Date;
  }

  isIntersect(otherTimeslot) {
    // TODO go static
    if (!(otherTimeslot instanceof Timeslot)) {
      throw new Error("Value must be a Timeslot");
    }

    return (
      otherTimeslot.#start >= this.#start ||
      (otherTimeslot.#start < this.#start && otherTimeslot._end > this.#start)
    );
  }

  getStart() {
    return this.#start;
  }

  getEnd() {
    return this._end;
  }

  get end() {
    return this._end; // либо this.getEnd()
  }

  setStart(newDate) {
    if (!this.#isDate(newDate)) {
      throw new Error("Value must be a Time");
    }

    if (newDate >= this._end) {
      throw new Error("Value of start must be less than end");
    }

    this.#start = newDate;
  }

  setEnd(newDate) {
    if (!this.#isDate(newDate)) {
      throw new Error("Value must be a Time");
    }

    if (newDate <= this.#start) {
      throw new Error("Value of end must be greater than end");
    }

    this._end = newDate;
  }

  set end(newDate) {
    this.setEnd(newDate);
  }

  toMapped() {
    return {
      start: this.#start / 1000,
      end: this.#start / 1000,
    };
  }

  toString() {
    return {
      start: this.#start.toLocaleString("ru"),
      end: this._end.toLocaleString("ru"),
    };
  }

  toJSON() {
    return JSON.stringify(this.toMapped());
  }

  static fromJSON(data) {
    const { start, end } = JSON.parse(data);
    // TODO go static
    return new this(new Date(start * 1000), new Date(end * 1000));
  }
}

const slot1 = new Timeslot(
  new Date(2025, 11, 1, 10),
  new Date(2025, 11, 1, 13)
);
const slot2 = new Timeslot(
  new Date(2025, 11, 1, 11),
  new Date(2025, 11, 1, 12)
);

const slot3json = '{ "start": 1220220000, "end": 10000200500 }';

// console.log(slot1.end, slot1.getEnd());
// slot1.end = new Date();
// slot1.setEnd(new Date());
// console.log(slot1.end, slot1.getEnd());

// const slot3 = new Timeslot(new Date(2020, 1, 1), new Date(2020, 1, 2));
const slot3 = Timeslot.fromJSON(slot3json);
// slot3.fromJSON(slot3json);
console.log(slot3.toString());

// TODO рассказать про наследование на примере Error
// создать свои кастомные классы ошибок

// console.log(slot1.getStart());
// slot1.setStart(new Date(2025, 10, 1, 11));
// console.log(slot1.getStart());

// TODO (кт) перевести _end в приватный (защищенный) вид

// !!! след. занятие начать со статических методов
// slot3.fromJSON(slot3json)

// console.log(slot1.toMapped())
// console.log(slot1.toString())
// console.log(slot1.toJSON())
