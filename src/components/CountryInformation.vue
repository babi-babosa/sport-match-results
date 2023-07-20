<script setup lang="ts">
import {computed} from "vue";
import {FootballResults} from "@/stores/footballResults";

const footballLeagueResults = FootballResults();

const countryInfo = footballLeagueResults.getActualCountryInfo;

</script>

<template>
  <div class="country-info">
    <h1 class="green">{{ countryInfo.countryName }}</h1>
    <h1 class="green">{{ countryInfo.leagueName }}</h1>
    <h1 class="green">{{ countryInfo.availableSeason }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    display: block;
    text-align: left;
  }
}
</style>
