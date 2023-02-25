<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue';
</script>

<script lang="ts">
    export default {
        components: Footer
    }
</script>

<template>
    <div class="wrapper">
        <main>
            <RouterView />
        </main>
        <Footer/>
    </div>
</template>
