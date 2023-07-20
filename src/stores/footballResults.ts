import { ref, computed } from 'vue'
import { defineStore, MutationType } from 'pinia';

export const FootballResults = defineStore('football-results', () => {
  const MIN_VALUES_TO_BE_PRESENTED: number = 5;

  const footballFirstLeagueMainPositions= ref([]);
  const fullResultsDisplayed= ref(true);
  const footballFirstLeagueMainPositionsToShow= ref([]);
  const availableCountries= ref([
    {
      countryName: "England",
      leagueId: '4328',
      availableSeason: '2022-2023',
      leagueName: "English Premier League",
      id: '1'
    },
    {
      countryName: "Portugal",
      leagueId: '4344',
      availableSeason: '2022-2023',
      leagueName: "Portuguese Premier League",
      id: '2'
    }
  ]);
  const actualCountry= ref("1");

  const footballFirstLeagueMainPositionsList = computed(() => {
    if(footballFirstLeagueMainPositions.value.table === undefined ){
      return footballFirstLeagueMainPositionsToShow.value;
    }

    if (fullResultsDisplayed.value) {
      //hide full results
      footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.table.slice(0, MIN_VALUES_TO_BE_PRESENTED);
    } else {
      //display full results
      footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.table;
    }

    return footballFirstLeagueMainPositionsToShow.value;
  });

  const getActualCountryInfo = computed(() => availableCountries.value.find(country => country.id === actualCountry.value));

  function showMoreResults() {
    fullResultsDisplayed.value = !fullResultsDisplayed.value;
  }

  function changeCountry(countryId: string) {
    actualCountry.value = countryId;
  }

  async function getFootballFirstLeaguePositions() {
    const countryInfo = availableCountries.value.find(country => country.id === actualCountry.value);
    console.log("countryInfo :: ", countryInfo);

    footballFirstLeagueMainPositions.value = await window.fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${countryInfo.leagueId}&s=${countryInfo.availableSeason}`,{
      method: 'GET'
    }).then((r) => r.json());
  }

  return {
    getFootballFirstLeaguePositions,
    changeCountry,
    getActualCountryInfo,
    footballFirstLeagueMainPositionsList,
    footballFirstLeagueMainPositions,
  }
})
