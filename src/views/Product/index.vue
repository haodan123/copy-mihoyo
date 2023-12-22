<template>
  <div :class="'home-' + page">查看</div>
</template>

<script setup>
import { ref } from 'vue'

const page = ref('product')
</script>

<style scoped>
.home-product {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: red; */
}
</style>
