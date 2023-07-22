# Sport Match Results
Hi all, my name is Bárbara and this is my project about sports results.

This is a web application to show a list of football league results made with Vue 2. The main goal is to create a solution to show a list of results of a league.

# Vue Project

This project is made with the latest Vue 2 version (2.7) and it includes already some extensions that will be used in Vue 3, such as Vite and Pinia.
This is also made with Typescript in order to use interfaces and clear code to validate the data we have in the store.

## Technical decisions
It was made a validation of the following [API](https://www.thesportsdb.com/api.php) , in order to understand what could be the requests available for free - some of them are only available if we have Patreon.

After a quick investigation, the conclusion for this case is that the main parameters to have the league results are:

```sh
  https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2022-2023
```
- l :: leagueID - it can be checked by another API request.
- s :: season - season of our choice and I update the results to the latest season. 

The season and the league are not available to be changed, but are the most important leagues from each country (You can read more in the next section). 

In this repo you can also find commits of each improvement.

For responsive effects, in mobile the main bar info will only display the league name. This was made to not include a menu, because the informations will be text and not buttons to click and redirect to different pages.

About the chosen colors, the base was a color pallet generator to give a better style and consistence to the page.

It was implemented routes, but in this case there's only the main page route and the 404 Page.

All files were reviewed and have lint corrections.

## Nice To Have implementations
In the project, there is a show more button, that loads the next 3 clubs until the list ends (the result list length will depend of the country).

Another point is the skeleton on the table results that will appear until the result be populated.

A surprise feature is a hover effect in each table row to not lose the focus on the club we are checking results and a feature to change country between England and my country, Portugal. 
For both, it will display the results from the premier league: England Premier League and Portuguese Premier League, depending of the selected country.

The first 3 positions are in a different color to give a UX to the user to check the main qualifications.

Another feature is a click to the main link for team information - if the user clicks in a team row it will be redirected to the main team information page with the link : https://www.thesportsdb.com/team/TEAM_ID .

## Future Improvements
For future improvements, I can add the colors into the main css configuration in order to change the primary main colors. This was not implemented now due the small project. 

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
