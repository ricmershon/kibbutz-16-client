import React from 'react'
import axios from 'axios'
import { Jumbotron, Container, Form, Col, Button } from 'react-bootstrap'
import Chart from 'chart.js'
import ChartData from './ChartData'
import StatesArray from './StatesArray'

const API_BASE = 'https://covidtracking.com/api'
const API_US = '/us/daily'
const API_STATE = '/states/daily?state='
const API_STATE_INFO = '/states/info?state='

const CHARTS = {
  DAILY_NEW_CASES: "positiveIncrease",
  DAILY_FATALITIES: "deathIncrease",
  TOTAL_CASES: "positive",
  TOTAL_FATALITIES: "death"
}

const CHART_TITLES = {
  DAILY_NEW_CASES: "Daily New Cases",
  DAILY_FATALITIES: "Daily Fatalities",
  TOTAL_CASES: "Total Cases",
  TOTAL_FATALITIES: "Total Fatalities"
}

const chartDataReducer = (state, action) => {
  console.log(action.type);
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
        ...state, isLoading: false, isError: true
      }
    default:
      throw new Error()
  }
}

const Data = () => {

  const [chartType, setChartType] = React.useState('TOTAL_CASES')
  const [chartRegion, setChartRegion] = React.useState('us')
  const [apiUrl, setApiUrl] = React.useState(`${API_BASE}${API_US}`)
  const [chartData, dispatchChartData] = React.useReducer(
    chartDataReducer,
    { data: [], isLoading: false, isError: false }
  )

  const handleFetchData = React.useCallback(async () => {
    console.log(apiUrl);
    dispatchChartData ({ type: 'DATA_FETCH_INIT' })
    try {
      const response = await axios.get(apiUrl)
      dispatchChartData({
        type: 'DATA_FETCH_SUCCESS',
        payload: response.data
      })
      console.log(response.data);
      console.log(chartData.data);
      // const dataToChart = await prepareData(response.data)
      // await createChart(dataToChart)
    } catch (error) {
      dispatchChartData({ type: 'DATA_FETCH_FAILURE'})
    }
  }, [apiUrl, chartType])

  React.useEffect(() => {
    handleFetchData()
  }, [handleFetchData])


  const handleChartChange = (chartType) => {
    setChartType(chartType)
  }

  const handleRegionChange = async (event) => {
    await setChartRegion(event.currentTarget.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setApiUrl(`${API_BASE}${API_STATE}${chartRegion}`)
  }

  return(
    <>
      <Container>
        <h3>Covid-19 Data</h3>
        <Form onSubmit={ handleSearchSubmit }>
          <Form.Row>
            <Form.Label column lg={2}>
              Select Region
            </Form.Label>

              <Form.Control onChange={handleRegionChange} className="mb-3" as="select" size="sm" >
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

          </Form.Row>
          <Form.Row>
            <Form.Label className="mb-1" column lg={2}>
              Select Chart
            </Form.Label>
          </Form.Row>
          <Form.Row>
            <Col>
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
                label="Daily Fatalities"
                name="dailyFatalities"
                id="dailyFatalities"
                checked={ chartType === 'DAILY_FATALITIES' }
                onChange={ () => handleChartChange('DAILY_FATALITIES') }
              />
              <Form.Check
                type="radio"
                label="Total Cases"
                id="totalCases"
                checked={ chartType === 'TOTAL_CASES' }
                onChange={ () => handleChartChange('TOTAL_CASES') }
              />
              <Form.Check
                type="radio"
                label="Total Fatalities"
                name="totalFatalaties"
                id="totalFatalaties"
                checked={ chartType === 'TOTAL_FATALITIES' }
                onChange={ () => handleChartChange('TOTAL_FATALITIES') }
              />
            </Col>
          </Form.Row>
              <Form.Row className="mt-3">
            <Button
              type="submit"
              variant="primary"
            >
            Chart It
            </Button>
          </Form.Row>
        </Form>
      </Container>

    </>
  )

}

export default Data
