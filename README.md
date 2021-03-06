# Kibbutz-19 Client
An online community for people to find and share household and other necessities during the Covid-19 crisis.

## Designer and Engineer
Ric Mershon

## Background
For details on the overall background and server details refer to https://github.com/ricmershon/kibbutz-16-api.

## Components

### ChartData

The goal of this component is to provide up to date information on COVID-19 data by state and US country-wide. Data is consumed from the [COVID Tracking Project](https://covidtracking.com/) API.

#### API End points

State endpoint:
```
https://covidtracking.com/api/states/daily?state=
```

Sample returned JSON object
```
{
    "date": 20200425,
    "state": "GA",
    "positive": 22695,
    "negative": 96319,
    "pending": null,
    "hospitalizedCurrently": null,
    "hospitalizedCumulative": 4326,
    "inIcuCurrently": null,
    "inIcuCumulative": null,
    "onVentilatorCurrently": null,
    "onVentilatorCumulative": null,
    "recovered": null,
    "hash": "e6f8736561002b8c2af62ef508e632bfdb789123",
    "dateChecked": "2020-04-25T20:00:00Z",
    "death": 904,
    "hospitalized": 4326,
    "total": 119014,
    "totalTestResults": 119014,
    "posNeg": 119014,
    "fips": "13",
    "deathIncrease": 12,
    "hospitalizedIncrease": 105,
    "negativeIncrease": 11290,
    "positiveIncrease": 548,
    "totalTestResultsIncrease": 11838
}
```

US endpoint:
```
https://covidtracking.com/api/us/daily
```

Sample returned JSON object
```
{
    "date": 20200425,
    "states": 56,
    "positive": 931698,
    "negative": 4252937,
    "pending": 5315,
    "hospitalizedCurrently": 56312,
    "hospitalizedCumulative": 94743,
    "inIcuCurrently": 15020,
    "inIcuCumulative": 2516,
    "onVentilatorCurrently": 5266,
    "onVentilatorCumulative": 227,
    "recovered": 90445,
    "hash": "1dcc8be1f360a68cb25588a757a5c0230fd8f0b4",
    "dateChecked": "2020-04-25T20:00:00Z",
    "death": 47980,
    "hospitalized": 94743,
    "total": 5189950,
    "totalTestResults": 5184635,
    "posNeg": 5184635,
    "deathIncrease": 2194,
    "hospitalizedIncrease": 1636,
    "negativeIncrease": 259951,
    "positiveIncrease": 40882,
    "totalTestResultsIncrease": 300833
}
```

#### Charting Options
Options are provided to chart the following data.

| Data | JSON Object Key |
| ---- |---------------- |
| Total Cases | "positive" |
| Daily New Cases | "positiveIncrease" |
| Active Cases | "positive" - "death" - "recovered" |
| Total Deaths | "death" |
| Daily Deaths | "deathIncrease" |


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
