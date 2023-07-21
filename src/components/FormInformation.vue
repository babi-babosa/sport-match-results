<script setup lang="ts">
defineProps(['formInformation']);

</script>

<template>
  <div>
        <v-icon
            medium
            :color="(info === 'D') ? 'grey' : ((info === 'W') ? 'green-darken-2' : 'red' )"
            v-for="info in formInformation"
        >
          {{ (info === 'D') ? 'mdi-minus-circle' : ((info === 'W') ? 'mdi-check-circle' : 'mdi-close-circle' ) }}
        </v-icon>
  </div>
</template>

<style scoped>
</style>
