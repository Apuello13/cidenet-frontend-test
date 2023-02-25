import axios from 'axios'
import { enviroment } from '@/utils/env'
import type { Employee } from '@/models/employee'
import type { Search } from '@/models/search'
import type { Pagination } from '@/models/pagination'

const employeeUrl: string = `${enviroment.apiUrl}/employees`

export const employeeService = {
  save: (employee: Employee) => axios.post<Employee>(employeeUrl, employee),
  update: (employee: Employee) => axios.put<Employee>(employeeUrl, employee),
  search: (search: Search) => axios.post<Pagination>(`${employeeUrl}/search`, search),
  findById: (employeeId: number) => axios.get<Employee>(`${employeeUrl}/${employeeId}`),
  deleteById: (employeeId: number) => axios.delete(`${employeeUrl}/${employeeId}`)
}
