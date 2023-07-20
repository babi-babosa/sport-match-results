<script setup lang="ts">
import {computed} from "vue";
import {FootballResults} from "@/stores/footballResults";

const footballLeagueResults = FootballResults();

footballLeagueResults.getFootballFirstLeaguePositions();
const football = computed(() => footballLeagueResults.footballFirstLeagueMainPositionsList);
const isOpen = computed(() => footballLeagueResults.isOpen);
const headers = ['Positions', 'Club', 'Club Name', 'Form', 'GP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts']
</script>

<template>
  <div class="football-main-table-list">
    <v-simple-table
        :headers="headers"
        class="elevation-1"
    >
      <template v-slot:default>
        <thead>
        <tr>
          <th v-for="headerTitle in headers" >
            {{ headerTitle }}
          </th>
        </tr>
        </thead>
        <tr v-for="footballInfo in football" :key="footballInfo.idStanding">
          <td>
            {{ footballInfo.intRank }}
          </td>
          <td>
            <img :src="footballInfo.strTeamBadge">
          </td>
          <td>
            {{ footballInfo.strTeam }}
          </td>
          <td>
            {{ footballInfo.strForm }}
          </td>
          <td>
            {{ footballInfo.intPlayed }}
          </td>
          <td>
            {{ footballInfo.intWin }}
          </td>
          <td>
            {{ footballInfo.intDraw }}
          </td>
          <td>
            {{ footballInfo.intLoss }}
          </td>
          <td>
            {{ footballInfo.intGoalsFor }}
          </td>
          <td>
            {{ footballInfo.intGoalsAgainst }}
          </td>
          <td>
            {{ footballInfo.intGoalsDifference }}
          </td>
          <td>
            {{ footballInfo.intPoints }}
          </td>
        </tr>
      </template>
    </v-simple-table>
    <v-btn
        elevation="2"
        large
        @click="footballLeagueResults.showMoreResults"
    >
      Show {{isOpen ? 'More' : 'Less' }} Results
    </v-btn>
  </div>
</template>

<style scoped>
.football-main-table-list {
  width: 100%;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    display: block;
    text-align: left;
  }
}
</style>
