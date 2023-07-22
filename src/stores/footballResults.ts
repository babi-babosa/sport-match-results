import { ref, computed } from 'vue'
import { defineStore, MutationType } from 'pinia';

export interface FootballResultsList {
  idStanding: string,
  intRank: string,
  strTeamBadge: string,
  strTeam: string,
  strForm: string,
  strFormRefactor: string[],
  intPlayed: string,
  intWin: string,
  intDraw: string,
  intLoss: string,
  intGoalsFor: string,
  intGoalsAgainst: string,
  intGoalDifference: string,
  intPoints: string,
}

export interface CountryInformation {
  countryName: string,
  leagueId: string,
  availableSeason: string,
  leagueName: string,
  id: string
}

export const FootballResults = defineStore('football-results', () => {
  const MIN_VALUES_TO_BE_PRESENTED: number = 5;
  const VALUES_TO_ADD_PER_CLICK: number = 3;
  let nextIndex: number = MIN_VALUES_TO_BE_PRESENTED;
  const defaultValue: FootballResultsList[] = [{
    idStanding: "",
    intRank: "",
    strTeamBadge: "",
    strTeam: "",
    strForm: "",
    strFormRefactor: [],
    intPlayed: "",
    intWin: "",
    intDraw: "",
    intLoss: "",
    intGoalsFor: "",
    intGoalsAgainst: "",
    intGoalDifference: "",
    intPoints: "",
  }]

  const footballFirstLeagueMainPositions = ref<FootballResultsList[]>(defaultValue);
  const fullResultsDisplayed= ref(true);
  const footballFirstLeagueMainPositionsToShow= ref<FootballResultsList[]>([]);
  const availableCountries = ref<CountryInformation[]>([
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
  const actualCountry= ref<string>("1");

  const isOpen = computed<boolean>(() => fullResultsDisplayed.value)
  const getAvailableCountries = computed<CountryInformation[]>(() => availableCountries.value)

  const footballFirstLeagueMainPositionsList = computed<FootballResultsList[]>(() => {
    if(footballFirstLeagueMainPositions.value === undefined ){
      return footballFirstLeagueMainPositionsToShow.value;
    }

    return footballFirstLeagueMainPositionsToShow.value;
  });

  const getActualCountryInfo = computed(() => availableCountries.value.find(country => country.id === actualCountry.value) as CountryInformation);

  function showMoreResults() {
    if (fullResultsDisplayed.value) {
      if (nextIndex >= footballFirstLeagueMainPositions.value.length) {
        footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value;
        nextIndex = MIN_VALUES_TO_BE_PRESENTED;
        fullResultsDisplayed.value = !fullResultsDisplayed.value;
      } else {
        if(nextIndex === MIN_VALUES_TO_BE_PRESENTED) {
          nextIndex += VALUES_TO_ADD_PER_CLICK;
        }
        footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.slice(0, nextIndex);
        nextIndex += VALUES_TO_ADD_PER_CLICK;
      }
    } else {
      //hide full results
      nextIndex = MIN_VALUES_TO_BE_PRESENTED;
      footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.slice(0, nextIndex);
      fullResultsDisplayed.value = !fullResultsDisplayed.value;
    }
  }

  async function changeCountry(event: any) {
    actualCountry.value = event.id;
    nextIndex = MIN_VALUES_TO_BE_PRESENTED;
    footballFirstLeagueMainPositionsToShow.value = [];
    fullResultsDisplayed.value = true;

    await getFootballFirstLeaguePositions();
  }

  async function getFootballFirstLeaguePositions() {
    const countryInfo= availableCountries.value.find(country => country.id === actualCountry.value) as CountryInformation;

    const returnValues = await window.fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${countryInfo.leagueId}&s=${countryInfo.availableSeason}`,{
      method: 'GET'
    }).then((r) => r.json());

    footballFirstLeagueMainPositions.value = returnValues.table.map((result: FootballResultsList) => {
      const footballList:FootballResultsList = {
        idStanding: result.idStanding,
        intRank: result.intRank,
        strTeamBadge: result.strTeamBadge,
        strTeam: result.strTeam,
        strForm: result.strForm,
        strFormRefactor: _dealWithFormResults(result.strForm),
        intPlayed: result.intPlayed,
        intWin: result.intWin,
        intDraw: result.intDraw,
        intLoss: result.intLoss,
        intGoalsFor: result.intGoalsFor,
        intGoalsAgainst: result.intGoalsAgainst,
        intGoalDifference: result.intGoalDifference,
        intPoints: result.intPoints,
      }
      return footballList;
    });

    footballFirstLeagueMainPositionsToShow.value = footballFirstLeagueMainPositions.value.slice(0, nextIndex);
    nextIndex += VALUES_TO_ADD_PER_CLICK;
  }

  function _dealWithFormResults(clubForm: string): string[] {
    return clubForm.trim().split('');
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
