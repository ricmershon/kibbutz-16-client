import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import Chart from 'chart.js'


class Data extends Component {
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
      const response = await fetch('https://covidtracking.com/api/states/daily?state=GA')
      const data = await response.json()
      const chartData = await this.prepareData(data)
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
      </>
    )
  }
}

export default Data
