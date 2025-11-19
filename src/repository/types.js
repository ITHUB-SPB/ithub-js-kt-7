/**
 * @typedef { "id" | "title" | "price" | "count" | "marks" | "created_at" | "updated_at" } Field
 */

/**
 * @typedef { "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "like" } FilterOperator
 * @typedef { string | number } FilterValue
 * @typedef { "title" | "price" | "count" | "marks" | "created_at" | "updated_at" } FilterField
 */

/**
 * @typedef { "asc" | "desc" } SorterDirection
 * @typedef { "title" | "price" | "count" | "marks" | "created_at" | "updated_at" } SorterField
 */

/**
 * @typedef { 5 | 10 | 20 } PaginatorLimit
 * @typedef { number } PaginatorOffset
 */

/**
 * @typedef {Object} Filter
 * @property {FilterField} field - фильтруемое поле
 * @property {FilterOperator} operator - тип операции
 * @property {FilterValue} value - значение для фильтрации
 */

/**
 * @typedef {Object} Sorter
 * @property {SorterField} field - сортируемое поле
 * @property {SorterDirection} direction - направление сортировки
 */

/**
 * @typedef {Object} Paginator
 * @property {PaginatorLimit} limit - число записей для выдачи
 * @property {PaginatorOffset} offset - число записей для отступа
 */

/**
 * @typedef { Field[] } Select
 */

/**
 * @typedef {Object} FindManyOptions
 * @property {Paginator} [paginate] - (опционально) объект со свойствами пагинации
 * @property {Select} [select] - (опционально) массив имен полей для вывода
 * @property {Sorter[]} [sorters] - (опционально) массив сортировщиков
 * @property {Filter[]} [filters] - (опционально) массив фильтров
 */


/**
 * @typedef {Object} Repository
 * @property {Paginator} [paginate] - (опционально) объект со свойствами пагинации
 * @property {Select} [select] - (опционально) массив имен полей для вывода
 * @property {Sorter[]} [sorters] - (опционально) массив сортировщиков
 * @property {Filter[]} [filters] - (опционально) массив фильтров
 */

