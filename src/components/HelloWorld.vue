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
          <td align="center">
            {{ footballInfo.intRank }}
          </td>
          <td align="center">
            <img :src="footballInfo.strTeamBadge">
          </td>
          <td>
            {{ footballInfo.strTeam }}
          </td>
          <td>
            {{ footballInfo.strForm }}
          </td>
          <td align="center">
            {{ footballInfo.intPlayed }}
          </td>
          <td align="center">
            {{ footballInfo.intWin }}
          </td>
          <td align="center">
            {{ footballInfo.intDraw }}
          </td>
          <td align="center">
            {{ footballInfo.intLoss }}
          </td>
          <td align="center">
            {{ footballInfo.intGoalsFor }}
          </td>
          <td align="center">
            {{ footballInfo.intGoalsAgainst }}
          </td>
          <td align="center">
            {{ footballInfo.intGoalDifference }}
          </td>
          <td align="center">
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
  padding: 0 40px 0 20px;
}
</style>
