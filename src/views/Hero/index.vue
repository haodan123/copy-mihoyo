<template>
  <div :class="'home-' + page">hero</div>
</template>

<script setup>
import { ref } from 'vue'

const page = ref('hero')
</script>

<style scoped>
.home-hero {
  position: relative;
  width: 100%;
  height: 100%;

}
</style>
