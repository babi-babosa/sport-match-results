<script setup lang="ts">
import { computed } from "vue";
import { FootballResults } from "@/stores/footballResults";
import FormInformation from "@/components/FormInformation.vue";

const footballLeagueResults = FootballResults();

footballLeagueResults.getFootballFirstLeaguePositions();
const football = computed(
  () => footballLeagueResults.footballFirstLeagueMainPositionsList
);
const isOpen = computed(() => footballLeagueResults.isOpen);
const headers = [
  "Positions",
  "Club",
  "Club Name",
  "Form",
  "GP",
  "W",
  "D",
  "L",
  "GF",
  "GA",
  "GD",
  "Pts",
];

const clickTo = (idTeam: string) => {
  window.location.href = `https://www.thesportsdb.com/team/${idTeam}`;
};
</script>

<template>
  <div class="football-main-table-list">
    <v-sheet :color="`grey 'lighten-4'`" class="pa-3">
      <v-skeleton-loader
        class="mx-auto"
        v-bind="football"
        type="table, thead, tbody"
        :loading="football.length === 0"
      >
        <v-simple-table :headers="headers" class="elevation-1">
          <template v-slot:default>
            <thead>
              <tr>
                <th v-for="(headerTitle, index) in headers" v-bind:key="index">
                  {{ headerTitle }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(footballInfo, index) in football"
                :key="footballInfo.idStanding"
                :bgcolor="index < 3 ? '#efeeb4' : '#fdfdf7'"
                @click="clickTo(footballInfo.idTeam)"
              >
                <td align="center" width="5%">
                  {{ footballInfo.intRank }}
                </td>
                <td align="center" width="5%">
                  <img
                    :src="footballInfo.strTeamBadge"
                    :width="$vuetify.breakpoint.xs ? '20' : '30'"
                    :height="$vuetify.breakpoint.xs ? '20' : '30'"
                  />
                </td>
                <td>
                  {{ footballInfo.strTeam }}
                </td>
                <td align="center">
                  <FormInformation
                    :formInformation="footballInfo.strFormRefactor"
                  />
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intPlayed }}
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intWin }}
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intDraw }}
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intLoss }}
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intGoalsFor }}
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intGoalsAgainst }}
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intGoalDifference }}
                </td>
                <td align="center" width="5%">
                  {{ footballInfo.intPoints }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-skeleton-loader>
    </v-sheet>
    <v-btn
      elevation="2"
      large
      id="show-more-button"
      rounded
      color="#959db7"
      @click="footballLeagueResults.showMoreResults"
    >
      Show {{ isOpen ? "More" : "Less" }} Results
    </v-btn>
  </div>
</template>

<style scoped>
.football-main-table-list {
  width: 100%;
  padding: 0 40px 0 20px;
}

:deep thead th {
  background-color: #2c3e50;
  color: #efeeb4 !important;
  font-size: 20px !important;
  font-weight: bold !important;
}

:deep tbody tr:hover {
  opacity: 0.8;
  cursor: pointer;
}

#show-more-button {
  margin: 20px auto;
  width: 100%;
  color: #fdfdf7;
}

@media (max-width: 420px) {
  :deep thead th {
    font-size: 14px !important;
    padding: 0 10px !important;
  }
}
</style>
