<template>
  <span class="active" v-if="status === ACTIVE_VALUE">Activo</span>
  <span class="inactive" v-else>Inactivo</span>
</template>
<script lang="ts">
export default {
  data() {
    return {
      ACTIVE_VALUE: 'A'
    }
  },
  props: {
    status: String
  }
}
</script>
