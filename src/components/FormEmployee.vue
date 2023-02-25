<template>
  <form @submit="submit">
    <div class="row">
      <div class="col-6">
        <div class="title">Formulario empleados</div>
      </div>
      <div class="col-6 container-buttons">
        <RouterLink to="/">
          <box-icon name="arrow-back" class="icon-red"></box-icon>
        </RouterLink>
        <button class="btn" :disabled="v$.form.$invalid" type="submit">
          <box-icon name="save" class="icon-success"></box-icon>
        </button>
      </div>
      <hr />
      <div class="col-6">
        <label class="form-label" :class="{ error: v$.form.firstSurname.$errors.length }"
          >Primer apellido</label
        >
        <input type="text" required v-model="form.firstSurname" class="form-control" />
      </div>
      <div class="col-6">
        <label class="form-label">Segundo apellido</label>
        <input type="text" v-model="form.secondSurname" class="form-control" />
        <div v-if="v$.form.secondSurname.$errors.length" class="form-text text-danger">
          {{ requiredMessage }}
        </div>
      </div>
      <div class="col-6">
        <label class="form-label">Primer nombre</label>
        <input type="text" v-model="form.firstName" class="form-control" />
        <div v-if="v$.form.firstName.$errors.length" class="form-text text-danger">
          {{ requiredMessage }}
        </div>
      </div>
      <div class="col-6">
        <label class="form-label">Otros nombres</label>
        <input type="text" v-model="form.otherName" class="form-control" />
      </div>
      <div class="col-6">
        <label class="form-label">Pais del empleo</label>
        <select v-model="form.countryJob" class="form-control">
          <option value="" disabled>Seleccione...</option>
          <option v-for="jobCountry in JobCountry" :value="jobCountry.value">
            {{ jobCountry.name }}
          </option>
        </select>
        <div v-if="v$.form.countryJob.$errors.length" class="form-text text-danger">
          {{ requiredMessage }}
        </div>
      </div>
      <div class="col-6">
        <label class="form-label">Tipo de identificación</label>
        <select v-model="form.typeDocument" class="form-control">
          <option value="" disabled>Seleccione...</option>
          <option v-for="typeDocument in TypeDocument" :value="typeDocument.value">
            {{ typeDocument.name }}
          </option>
        </select>
        <div v-if="v$.form.typeDocument.$errors.length" class="form-text text-danger">
          {{ requiredMessage }}
        </div>
      </div>
      <div class="col-6">
        <label class="form-label">Número de documento</label>
        <input type="text" v-model="form.document" class="form-control" />
        <div v-if="v$.form.document.$errors.length" class="form-text text-danger">
          {{ requiredMessage }}
        </div>
      </div>
      <div class="col-6">
        <label class="form-label">Area</label>
        <select v-model="form.jobArea" class="form-control">
          <option value="" disabled>Seleccione</option>
          <option v-for="jobArea in JobAreas" :value="jobArea.value">
            {{ jobArea.name }}
          </option>
        </select>
        <div v-if="v$.form.jobArea.$errors.length" class="form-text text-danger">
          {{ requiredMessage }}
        </div>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { formFieldEmployee } from '@/utils/field-form-employee'
import { RouterLink } from 'vue-router'
import { JobCountry } from '../utils/job-country'
import { TypeDocument } from '@/utils/type-document'
import { JobAreas } from '@/utils/job-areas'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { FieldLength } from '@/utils/field-length'
import { isApplyDocumentId, isApplyRegExp } from '@/utils/custom-validation'

import { employeeService } from '@/services/employee.service'
import { alertService } from '@/services/alert.service'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      JobAreas,
      TypeDocument,
      JobCountry,
      requiredMessage: 'Este campo es requerido',
      form: { ...formFieldEmployee }
    }
  },
  methods: {
    submit(e: any) {
      e.preventDefault()
      const isEdit = this.form.employeeId !== 0
      employeeService[isEdit ? 'update' : 'save'](this.form)
        .then(() => {
          alertService.success()
          this.$router.push('/')
        })
        .catch((badRequest) => {
          const message = badRequest.response.data?.error
          alertService.error(message)
        })
    },
    findById(employeeId: number) {
      employeeService.findById(employeeId).then((response) => (this.form = response.data))
    },
    findFromUrl() {
      const employeeId = this.$route.query.employeeId
      if (employeeId) this.findById(+employeeId)
    }
  },
  created() {
    this.findFromUrl()
  },
  validations() {
    return {
      form: {
        firstName: { required, maxLength: maxLength(FieldLength.DEFAULT_LENGTH), isApplyRegExp },
        firstSurname: { required, maxLength: maxLength(FieldLength.DEFAULT_LENGTH), isApplyRegExp },
        secondSurname: {
          required,
          maxLength: maxLength(FieldLength.DEFAULT_LENGTH),
          isApplyRegExp
        },
        otherName: { maxLength: maxLength(FieldLength.OTHER_NAME_LENGTH) },
        countryJob: { required },
        typeDocument: { required },
        document: { required, maxLength: maxLength(FieldLength.DEFAULT_LENGTH), isApplyDocumentId },
        jobArea: { required }
      }
    }
  }
}
</script>
