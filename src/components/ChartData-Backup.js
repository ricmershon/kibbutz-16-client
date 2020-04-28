import React, { Component } from 'react'
import axios from 'axios'
import { Jumbotron, Container, Form, Col, Button } from 'react-bootstrap'
import Chart from 'chart.js'
import StatesArray from './StatesArray'



class ChartData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyData: []
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    try {
      console.log(StatesArray.length);
      const response = await axios.get('https://covidtracking.com/api/states/daily?state=NY')
      const chartData = await this.prepareData(response.data)
      await this.createChart(chartData)
    } catch (error) {
      console.error(error)
    }
  }

  prepareData(data) {
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
      chartData.datasets[0].data.unshift(month.positiveIncrease)
      // chartData.datasets[1].data.unshift(month.positive)
    })
    return chartData
  }

  createChart(data) {
    const ctx = document.querySelector("#chart-canvas")
    const dataChart = new Chart(ctx, {
      type: 'line',
      data: data
    })
    return dataChart
  }

  render() {
    return(
      <>

        <Jumbotron className="pb-0 mb-4" bg="white">
          <h3 className="mx-auto mt-3">Covid-19 Data</h3>
          <Container>
          <canvas
            id="chart-canvas"
            width="200"
            height="125">
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
                <Form.Control className="mb-3" as="select" size="sm" >
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
              <Form.Label className="mb-1" colum lg={2}>
                Select Chart
              </Form.Label>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Check
                  type="radio"
                  label="Total Cases"
                  name="totalCases"
                  id="totalCases"
                />
                <Form.Check
                  type="radio"
                  label="Daily New Cases"
                  name="dailyNewCases"
                  id="dailyNewCases"
                />
                <Form.Check
                  type="radio"
                  label="Active Cases"
                  name="activeCases"
                  id="activeCases"
                />
                <Form.Check
                  type="radio"
                  label="Total Fatalities"
                  name="totalFatalaties"
                  id="totalFatalaties"
                />
                <Form.Check
                  type="radio"
                  label="Daily Fatalities"
                  name="totalFatalities"
                  id="totalFatalities"
                />
              </Col>
            </Form.Row>
            <Form.Row className="mt-3">
              <Button
                variant="primary"
              >
              Chart It
              </Button>
            </Form.Row>
          </Form.Group>
        </Container>

      </>
    )
  }
}

export default ChartData
