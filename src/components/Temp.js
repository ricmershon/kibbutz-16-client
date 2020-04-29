
import Chart from 'chart.js'

const ChartData = ({ data }) => {

  return(
    <Jumbotron className="pb-0 mb-4" bg="white">
      <h3 className="mx-auto mt-3">Covid-19 Data</h3>
      <Container>
        <canvas
          id="chart-canvas"
          width="300"
          height="150">
        </canvas>
      </Container>
    </Jumbotron>
  )
}

export default ChartData
