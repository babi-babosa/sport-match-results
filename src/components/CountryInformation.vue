<script setup lang="ts">
import {computed} from "vue";
import {FootballResults} from "@/stores/footballResults";

const footballLeagueResults = FootballResults();

const countryInfo = computed(() => footballLeagueResults.getActualCountryInfo);
const availableCountries = footballLeagueResults.getAvailableCountries;

</script>

<template>
    <v-card
        color="#454d66"
        flat
        tile
        data-app
        id="nav-bar"
    >
      <v-toolbar id="nav-bar-website">
        <div class="nav-bar-main-info">
          <v-toolbar-title>{{ countryInfo.leagueName }}</v-toolbar-title>

          <h1 v-if="!$vuetify.breakpoint.xs">{{ countryInfo.countryName }}</h1>
          <h1 v-if="!$vuetify.breakpoint.xs">{{ countryInfo.availableSeason }}</h1>
        </div>

        <v-select
            :items="availableCountries"
            label="Change Country"
            item-text="countryName"
            item-value="id"
            solo
            return-object
            single-line
            @input="footballLeagueResults.changeCountry"
        ></v-select>
      </v-toolbar>
    </v-card>
</template>

<style scoped>
#nav-bar {
  width: 100%
}

v-toolbar::v-deep {
  background-color: #454d66;
  padding: 0 40px 0 20px;
  border-radius: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
}

.nav-bar-main-info {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.v-toolbar__title,
h1 {
  font-weight: 500;
  color: #dad873;
  font-size: 25px;
}

:deep .v-text-field.v-text-field--solo .v-input__control {
  max-width: 200px;
  max-height: 50px;
  display: flex;
}

:deep .theme--light.v-input {
  justify-content: end;
  margin-right: 40px;
}

:deep .v-menu__content {
  top: 41px;
}

@media (max-width: 860px) {
  .nav-bar-main-info {
    display: flex;
    flex-direction: row;

    .v-toolbar__title,
    h1 {
      font-size: 16px;
    }
  }
}

@media (max-width: 420px) {
  :deep .v-toolbar__content, .v-toolbar__extension {
    gap: 25px;
  }
}
</style>
