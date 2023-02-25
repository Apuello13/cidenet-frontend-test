import type { Employee } from './employee'
import type { SearchParams } from './search-params'

export interface Pagination extends SearchParams {
  employees: Employee[]
  numberOfPages: number
}
