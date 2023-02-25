import type { Employee } from './employee'
import type { SearchParams } from './search-params'

export interface Search extends SearchParams {
  employee: Employee
}
