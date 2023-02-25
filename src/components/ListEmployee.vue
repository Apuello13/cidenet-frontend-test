<script setup lang="ts">
import StatusField from './StatusField.vue'
import { RouterLink } from 'vue-router'
import { employeeService } from '@/services/employee.service'
import type { Employee } from '@/models/employee'
import { formFieldEmployee } from '../utils/field-form-employee'
import type { Search } from '../models/search'
import { FieldLength } from '../utils/field-length'
import { alertService } from '@/services/alert.service'
import { Status } from '../utils/status'
import { JobCountry } from '../utils/job-country'
import { TypeDocument } from '../utils/type-document'
</script>
<template>
  <form @submit="submit">
    <div class="row">
      <div class="col-6">
        <p class="title">Lista de empleados</p>
      </div>
      <div class="col-6" style="text-align: end">
        <RouterLink to="/form">
          <box-icon class="icon-primary pointer" name="plus-circle"></box-icon>
        </RouterLink>
      </div>
      <div class="col-12 row">
        <div class="col-12"><strong>Filtros</strong></div>
        <div class="col-4">
          <label class="form-label">Primer nombre</label>
          <input v-model="form.firstName" type="text" class="form-control" />
        </div>
        <div class="col-4">
          <label class="form-label">Otros nombres</label>
          <input v-model="form.otherName" type="text" class="form-control" />
        </div>
        <div class="col-4">
          <label class="form-label">Primer apellido</label>
          <input v-model="form.firstSurname" type="text" class="form-control" />
        </div>
        <div class="col-4">
          <label class="form-label">Segundo apellido</label>
          <input v-model="form.secondSurname" type="text" class="form-control" />
        </div>
        <div class="col-4">
          <label class="form-label">Tipo de identificación</label>
          <select v-model="form.typeDocument" class="form-control">
            <option value="" disabled>Seleccione</option>
            <option v-for="typeDocument in TypeDocument" :value="typeDocument.value">
              {{ typeDocument.name }}
            </option>
          </select>
        </div>
        <div class="col-4">
          <label class="form-label">Número de identificación</label>
          <input v-model="form.document" type="text" class="form-control" />
        </div>
        <div class="col-4">
          <label class="form-label">País de empleo</label>
          <select v-model="form.countryJob" class="form-control">
            <option value="" disabled>Seleccione</option>
            <option v-for="jobCountry in JobCountry" :value="jobCountry.value">
              {{ jobCountry.name }}
            </option>
          </select>
        </div>
        <div class="col-4">
          <label class="form-label">Correo electrónico</label>
          <select v-model="form.email" class="form-control"></select>
        </div>
        <div class="col-4">
          <label class="form-label">Estado</label>
          <select v-model="form.status" class="form-control">
            <option value="" disabled>Seleccione</option>
            <option v-for="status in Status" :value="status.value">
              {{ status.name }}
            </option>
          </select>
        </div>
        <div class="col-6 mt-2">
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">Buscar</button>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-primary">Limpiar</button>
          </div>
        </div>
      </div>
      <div class="col-12 mt-2">
        <table class="table">
          <thead>
            <tr>
              <th>Primer nombre</th>
              <th>Primer apellido</th>
              <th>Correo electronico</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees">
              <td>{{ employee.firstName }}</td>
              <td>{{ employee.firstSurname }}</td>
              <td>{{ employee.email }}</td>
              <td><StatusField :status="employee.status" /></td>
              <td>
                <box-icon
                  @click="goToEdit(employee.employeeId)"
                  type="solid"
                  class="icon-primary pointer mr-2"
                  name="edit-alt"
                ></box-icon>
                <box-icon
                  @click="deleteById(employee.employeeId)"
                  name="trash-alt"
                  class="icon-danger pointer"
                  type="solid"
                ></box-icon>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5">
                <nav>
                  <ul class="pagination pagination-md">
                    <li
                      v-for="page in numberPages"
                      class="page-item pointer"
                      @click="selectPage(page)"
                    >
                      <span class="page-link">{{ page }}</span>
                    </li>
                  </ul>
                </nav>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
export default {
  data() {
    return {
      employees: [] as Employee[],
      form: { ...formFieldEmployee },
      page: 1,
      numberPages: 1
    }
  },
  methods: {
    submit(e: any) {
      e.preventDefault()
      this.search()
    },
    clearForm() {
      this.form = { ...formFieldEmployee }
    },
    search() {
      const search: Search = {
        employee: this.form,
        limit: FieldLength.PAGE_SIZE,
        page: this.page,
        offset: 0
      }
      employeeService
        .search(search)
        .then((response) => {
          this.numberPages = response.data.numberOfPages
          if (!this.numberPages) this.numberPages++
          this.employees = response.data.employees
        })
        .catch((badRequest) => {
          const message = badRequest.response.data?.message
          alertService.error(message)
        })
    },
    goToEdit(employeeId: number) {
      this.$router.push({ path: 'form', query: { employeeId } })
    },
    deleteById(employeeId: number) {
      alertService.confirmDelete().then((response) => {
        if (response.isConfirmed)
          employeeService
            .deleteById(employeeId)
            .then(() => {
              this.employees = this.employees.filter(
                (employee) => employee.employeeId !== employeeId
              )
              alertService.success()
            })
            .catch((badRequest) => {
              const message = badRequest.response.data?.message
              alertService.error(message)
            })
      })
    },
    selectPage(page: number) {
      this.page = page
      this.search()
    }
  },
  components: {
    StatusField
  }
}
</script>
