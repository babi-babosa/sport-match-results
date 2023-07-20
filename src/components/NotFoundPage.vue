<script setup lang="ts">
</script>

<template>
  <div class="container" style="text-align: center">
    <div class="error-code">404</div>

    <div class="error-text mb-5">Oops. Nothing here...</div>

    <v-btn
        height="40px"
        width="300px"
        color="var(--v-primary-dark-1-base)"
        class="back-btn"
        :to="{ name: 'home' }"
    >Go Home</v-btn>
  </div>
</template>
