<script setup lang="ts">
  import { alertService } from '@/services/alert.service';
</script>
<script lang="ts">
  export default{
    methods: {
      clickDemo(){
        alertService.confirmDelete().then((result) => {
          if(result.isConfirmed) alertService.success()
        })
      }
    }
  }
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="clickDemo()">Click here</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
