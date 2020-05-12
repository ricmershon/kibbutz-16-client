import React from 'react'
import axios from 'axios'

import { Jumbotron, Container } from 'react-bootstrap'
import Chart from 'chart.js'
import StatesArray from './StatesArray'
import DataForm from './DataForm'

const API_BASE = 'https://covidtracking.com/api/v1'
const API_STATE = '/states/'
const API_US = '/us'
const API_POSTFIX = '/daily.json'

/*
 ===============================================================================
 = CHARTS hashes chartType value to a key for a key/value pair in the JSON
 = object returned from the API.
 ===============================================================================
 */

const CHARTS = {
  DAILY_NEW_CASES: "positiveIncrease",
  DAILY_FATALITIES: "deathIncrease",
  TOTAL_CASES: "positive",
  TOTAL_FATALITIES: "death"
}

/*
 ===============================================================================
 = CHART_TITLES hashes chartType value to string for chart title.
 ===============================================================================
 */

const CHART_TITLES = {
  DAILY_NEW_CASES: "DAILY NEW CASES",
  DAILY_FATALITIES: "DAILY FATALITIES",
  TOTAL_CASES: "TOTAL CASES",
  TOTAL_FATALITIES: "TOTAL FATALITIES"
}

const covidDataReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'DATA_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'DATA_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}

const Data = () => {

  const [chartType, setChartType] = React.useState('DAILY_NEW_CASES')
  const [chartData, setChartData] = React.useState({
    type: 'line',
    options: {
      title: {
        display: true,
        text: '',
        position: 'bottom',
        onHover: null,
        onClick: null
      }
    },
    data: {
      labels: [],
      datasets: [
        {
          borderColor: 'rgba(250,0,0,.5)',
          backgroundColor: 'rgba(250,0,0,.5)',
          fill: false,
          label: '',
          data: []
        }
      ]
    }
  })
  const [chartRegion, setChartRegion] = React.useState('us')
  const [apiUrl, setApiUrl] = React.useState(`${API_BASE}${API_US}${API_POSTFIX}`)
  const [covidData, dispatchCovidData] = React.useReducer(
    covidDataReducer, { data: [], isLoading: false, isError: false }
  )
  
  const ref = React.useRef()

  const handleFetchData = React.useCallback(async () => {
    console.log(apiUrl);
    dispatchCovidData ({ type: 'DATA_FETCH_INIT' })
    try {
      const response = await axios.get(apiUrl)
      await dispatchCovidData({
        type: 'DATA_FETCH_SUCCESS',
        payload: response.data
      })
      const dataToChart = await prepareData(response.data)
      await createChart(dataToChart)
    } catch (error) {
      dispatchCovidData({
        type: 'DATA_FETCH_FAILURE',
        payload: console.error
      })
    }
  }, [apiUrl, chartType])

  React.useEffect(() => {
    handleFetchData()
  }, [handleFetchData])

  /*
   ===============================================================================
   = Converts date received from API to a more readable label.
   = e.g., 20200401 => 'Apr 01'
   ===============================================================================
   */

  const convertDateToString = (date) => {
    const rawString = date.toString()     // Convert to raw string

    const dateString = new Date(          // Create JS Date object
      rawString.slice(0, 4),              // Year
      rawString.slice(4, 6) - 1,          // Month
      rawString.slice(-2)                 // Day
    ).toDateString().substring(4)         // Convert to date string and
                                          // remove day of the week.
    return dateString.substring(0, dateString.length-5)
                                          // Return string with year removed
  }

  const prepareData = (data) => {
    const chartTitle = CHART_TITLES[chartType]
    const chartData = {
      labels: [],
      datasets: [
        {
          borderColor: 'rgba(250,0,0,.5)',
          backgroundColor: 'rgba(250,0,0,.5)',
          fill: false,
          label: chartTitle,
          data: []
        }
      ]
    }

    //
    // Chart up to 60 days of data depending on what's available.
    //

    for (let i = 0; i < (data.length < 60 ? data.length : 60); i++) {
      chartData.labels.unshift(convertDateToString(data[i].date))
      chartData.datasets[0].data.unshift(data[i][CHARTS[chartType]])
    }

    return chartData
  }

  const createChart = (data) => {
    const chartTitle = StatesArray[   // Use the abbrev to find the region name
      StatesArray.findIndex(
        state => state.abbrev === chartRegion
      )
    ].name.toUpperCase();

    const chartRef = ref.current.getContext('2d')

    new Chart(chartRef, {
      type: 'line',
      data: data,
      options: {
        title: {
          display: true,
          text: chartTitle,
          position: 'bottom',
          onHover: null,
          onClick: null
        }
      }
    })
  }

  const handleChartChange = (chartType) => {
    setChartType(chartType)
  }

  const handleRegionChange =  (event) => {
    setChartRegion(event.currentTarget.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setApiUrl(`${API_BASE}${API_STATE}${chartRegion}${API_POSTFIX}`)
  }

  return(
    <>

      <Jumbotron className="pb-0 mb-4" bg="white">
        <h3 className="mx-auto mt-3">Covid-19 Data</h3>
        <Container>
          { covidData.isLoading }
          { covidData.isError && <p>Something went wrong...</p> }
          <canvas
            ref={ref}
            width="250"
            height="150">
          </canvas>
        </Container>
      </Jumbotron>

      <DataForm
        onSearchSubmit={handleSearchSubmit}
        onRegionChange={handleRegionChange}
        onChartChange={handleChartChange}
        type={chartType}
      />

    </>
  )

}

export default Data
