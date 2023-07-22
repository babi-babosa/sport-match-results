<script setup lang="ts">
import CountryInformation from "@/components/CountryInformation.vue";
</script>

<template>
  <div id="app">
    <header>
      <CountryInformation />
    </header>

    <router-view />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    width: 100vw;
  }
}
</style>
