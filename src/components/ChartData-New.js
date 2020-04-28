/*
 ===============================================================================
 ===============================================================================
 =
 = Final project: Kibbutz-19 Client
 = Module: App.js
 = Created: April 2020
 = Created by: Ric Mershon
 =
 = Description: Entry point for the Kibbutz-19 Client. Defines React Routes.
 =
 ===============================================================================
 ===============================================================================
 */

/*
 ===============================================================================
 = EXTERNAL DEPENDENCIES
 ===============================================================================
 */

import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import axios from 'axios'
import Chart from 'chart.js'
import StatesArray from './StatesArray'

/*
 ===============================================================================
 = CONSTANTS
 ===============================================================================
 */

const API_BASE = 'https://covidtracking.com/api'
const API_US = '/us/daily'
const API_STATE = '/states/daily?state='
const API_STATE_INFO = '/states/info?state='

const chartDataReducer = (state, action) => {
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
      console.log(data);
    case 'DATA_FETCH_FAILURE':
      return {
        ...state, isLoading: false, isError: true
      }
    default:
      throw new Error()
  }
}

const prepareData = (data) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        borderColor: 'rgba(250,0,0,.5)',
        backgroundColor: 'rgba(250,0,0,.5)',
        fill: false,
        label: 'Daily number of Cases',
        data: []
      }
      // {
      //   borderColor: 'rgba(0,0,250,.5)',
      //   backgroundColor: 'rgba(0,0,250,.5)',
      //   fill: false,
      //   label: 'GA Positive Tests',
      //   data: []
      // }
    ]
  }
  data.forEach(month => {
    chartData.labels.unshift(month.date.toString())
    chartData.datasets[0].data.unshift(month['positiveIncrease'])
    // chartData.datasets[1].data.unshift(month.positive)
  })
  return chartData
}

const createChart = (data) => {
  const ctx = document.querySelector("#chart-canvas")
  const dataChart = new Chart(ctx, {
    type: 'line',
    data: data
  })
  return dataChart
}

const ChartData = () => {

  //
  // Handle state changes through the chartDataReducer
  //

  const [chartData, dispatchChartData] = React.useReducer(
    chartDataReducer,
    { data: [], isLoading: false, isError: false }
  )

  const [chartType, setChartType] = React.useState('TOTAL_CASES')
  const [chartRegion, setChartRetion] = React.useState('United States')
  const [url, setUrl] = React.useState(getUrl)

  //
  // Use React.useCallback in order to prevent re-rendering when
  // the search terms change.
  //

  const handleFetchData = React.useCallback(async () => {
    dispatchChartData ({ type: 'DATA_FETCH_INIT' })
    try {
      const response = await axios.get(url)
      dispatchChartData({
        type: 'DATA_FETCH_SUCCESS',
        payload: response.data
      })
    } catch (error) {
      dispatchChartData({ type: 'STORIES_FETCH_FAILURE'})
    }
  }, [url])

  //
  // The React.useEffect hook runs implicitely when search terms
  // change because the handleFetchData is redefined each time
  // searchTerm changes.
  //

  React.useEffect(() => {
    handleFetchData()
  }, [handleFetchData])

  const handleChartChange = (chartType) => {
    setChartType(chartType)
  }

  const handleRegionChange = (event) => {
    setChartRegion(event.currentTarget.value)
  }

  return(
    <div>

      //
      // Display error message if there was an error getting data.
      //

      { chartData.isError && <p>Something went wrong...</p> }

      //
      // Display message while data is loading.
      //

      { chartData.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Jumbotron bg="white">
          <h3 className="mx-auto mt-3">Covid-19 Data</h3>
          <Container>
          <canvas
            id="chart-canvas"
            width="200"
            height="150">
          </canvas>
          </Container>
        </Jumbotron>
        <Container>
          <Form.Group>
            <Form.Row>
              <Form.Label column lg={2}>
                Select Region
              </Form.Label>
              <Col>
                <Form.Control
                  onChange={ handleRegionChange }
                  className="mb-3"
                  as="select"
                  size="sm" >
                  {
                    StatesArray.map((state) =>
                      <option
                        key={ state.apiKey }
                        value={ state.apiKey }
                      >
                        { state.name }
                      </option>
                    )
                  }
                </Form.Control>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
              <Form.Label className="mb-1" colum lg={2}>
                Select Chart
              </Form.Label></Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Check
                  type="radio"
                  label="Total Cases"
                  id="totalCases"
                  checked={ chartType === 'TOTAL_CASES' }
                  onChange={ () => handleChartChange('TOTAL_CASES') }
                />
                <Form.Check
                  type="radio"
                  label="Daily New Cases"
                  name="dailyNewCases"
                  id="dailyNewCases"
                  checked={ chartType === 'DAILY_NEW_CASES' }
                  onChange={ () => handleChartChange('DAILY_NEW_CASES') }
                />
                <Form.Check
                  type="radio"
                  label="Active Cases"
                  name="activeCases"
                  id="activeCases"
                  checked={ chartType === 'ACTIVE_CASES' }
                  onChange={ () => handleChartChange('ACTIVE_CASES') }
                />
                <Form.Check
                  type="radio"
                  label="Total Fatalities"
                  name="totalFatalaties"
                  id="totalFatalaties"
                  checked={ chartType === 'TOTAL_FATALITIES' }
                  onChange={ () => handleChartChange('TOTAL_FATALITIES') }
                />
                <Form.Check
                  type="radio"
                  label="Daily Fatalities"
                  name="dailyFatalities"
                  id="dailyFatalities"
                  checked={ chartType === 'DAILY_FATALITIES' }
                  onChange={ () => handleChartChange('DAILY_FATALITIES') }
                />
              </Col>
            </Form.Row>
            <Form.Row className="mt-3">
              <Button
                onClick={ handleChartSubmit }
                variant="primary"
              >
              Chart It
              </Button>
            </Form.Row>
          </Form.Group>
        </Container>
      )}
    </div>
  )
}

export default ChartData
