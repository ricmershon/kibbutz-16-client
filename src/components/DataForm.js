import React from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import StatesArray from './StatesArray'


const DataForm = ({onSearchSubmit, onRegionChange, onChartChange, type }) => (

  <Container>
    <Form onSubmit={ onSearchSubmit }>
      <Form.Row>
        <Form.Label column lg={2}>
          Select Region
        </Form.Label>
        <Form.Control
          onChange={ onRegionChange }
          className="mb-3"
          as="select"
          size="sm" >
          {
            StatesArray.map((region) =>
              <option
                key={ region.apiKey }
                value={ region.apiKey }
              >
                { region.name }
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
            checked={ type === 'DAILY_NEW_CASES' }
            onChange={ () => onChartChange('DAILY_NEW_CASES') }
          />
          <Form.Check
            type="radio"
            label="Daily Fatalities"
            name="dailyFatalities"
            id="dailyFatalities"
            checked={ type === 'DAILY_FATALITIES' }
            onChange={ () => onChartChange('DAILY_FATALITIES') }
          />
          <Form.Check
            type="radio"
            label="Total Cases"
            id="totalCases"
            checked={ type === 'TOTAL_CASES' }
            onChange={ () => onChartChange('TOTAL_CASES') }
          />
          <Form.Check
            type="radio"
            label="Total Fatalities"
            name="totalFatalaties"
            id="totalFatalaties"
            checked={ type === 'TOTAL_FATALITIES' }
            onChange={ () => onChartChange('TOTAL_FATALITIES') }
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
)

export default DataForm
