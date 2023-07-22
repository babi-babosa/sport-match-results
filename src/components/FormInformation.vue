<script setup lang="ts">
defineProps(["formInformation"]);
</script>

<template>
  <div>
    <v-icon
      medium
      :color="info === 'D' ? 'grey' : info === 'W' ? 'green-darken-2' : 'red'"
      v-for="(info, index) in formInformation"
      v-bind:key="index"
    >
      {{
        info === "D"
          ? "mdi-minus-circle"
          : info === "W"
          ? "mdi-check-circle"
          : "mdi-close-circle"
      }}
    </v-icon>
  </div>
</template>

<style scoped>
@media (max-width: 420px) {
  :deep .v-icon.v-icon {
    font-size: 16px;
  }
}
</style>
