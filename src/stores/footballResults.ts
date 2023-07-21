import { ref, computed } from 'vue'
import { defineStore, MutationType } from 'pinia';

export const FootballResults = defineStore('football-results', () => {
  const MIN_VALUES_TO_BE_PRESENTED: number = 5;
  const VALUES_TO_ADD_PER_CLICK: number = 3;
  let nextIndex: number = MIN_VALUES_TO_BE_PRESENTED;

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

  const isOpen = computed(() => fullResultsDisplayed.value)
  const getAvailableCountries = computed(() => availableCountries.value)

  const footballFirstLeagueMainPositionsList = computed(() => {
    if(footballFirstLeagueMainPositions.value.table === undefined ){
      return footballFirstLeagueMainPositionsToShow.value;
    }

    return footballFirstLeagueMainPositionsToShow.value;
  });

  const getActualCountryInfo = computed(() => availableCountries.value.find(country => country.id === actualCountry.value));

  function showMoreResults() {
    if (fullResultsDisplayed.value) {
      if (nextIndex >= footballFirstLeagueMainPositions.value.table.length) {
        footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.table;
        nextIndex = MIN_VALUES_TO_BE_PRESENTED;
        fullResultsDisplayed.value = !fullResultsDisplayed.value;
      } else {
        if(nextIndex === MIN_VALUES_TO_BE_PRESENTED) {
          nextIndex += VALUES_TO_ADD_PER_CLICK;
        }
        footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.table.slice(0, nextIndex);
        nextIndex += VALUES_TO_ADD_PER_CLICK;
      }
    } else {
      //hide full results
      nextIndex = MIN_VALUES_TO_BE_PRESENTED;
      footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.table.slice(0, nextIndex);
      fullResultsDisplayed.value = !fullResultsDisplayed.value;
    }
  }

  async function changeCountry(event: string) {
    actualCountry.value = event.id;
    nextIndex = MIN_VALUES_TO_BE_PRESENTED;
    footballFirstLeagueMainPositionsToShow.value = [];
    fullResultsDisplayed.value = true;

    await getFootballFirstLeaguePositions();
  }

  async function getFootballFirstLeaguePositions() {
    const countryInfo = availableCountries.value.find(country => country.id === actualCountry.value);

    footballFirstLeagueMainPositions.value = await window.fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${countryInfo.leagueId}&s=${countryInfo.availableSeason}`,{
      method: 'GET'
    }).then((r) => r.json());

    _dealWithFormResults();

    footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.table.slice(0, nextIndex);
    nextIndex += VALUES_TO_ADD_PER_CLICK;
  }

  function _dealWithFormResults() {
    footballFirstLeagueMainPositions.value.table.forEach(club => {
      club.strForm = club.strForm.trim().split('');
    })
  }


  return {
    getFootballFirstLeaguePositions,
    changeCountry,
    getActualCountryInfo,
    footballFirstLeagueMainPositionsList,
    footballFirstLeagueMainPositions,
    showMoreResults,
    isOpen,
    getAvailableCountries
  }
})
