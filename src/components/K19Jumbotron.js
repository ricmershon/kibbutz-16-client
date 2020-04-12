import React, { Component } from 'react'
import {
  Form,
  Button,
  Jumbotron,
  Col,
  Row
} from 'react-bootstrap'

class K19Jumbotron extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showTip: false
    }
  }

  render() {
    return(
      <>
        <Jumbotron className="px-5 mt-3 pb-4 mb-4" fluid>
          <h2 className="mx-auto">In times of crisis we come together.</h2>
          <p class="">Our goal is to create a community where people can come together to share vital resources and supplies during the Covid-19 crisis. Not all of us are able to get to the store, and a lot of stores do not have what we need. If you need something, or have something to share please join our Kibbutz-19 community.</p>

          <Form>
            <Form.Row>
              <Col>
                <Form.Control as="select" size="sm" placeholder="What are you looking for?">
                  <option>What are you looking for?</option>
                  <option>Baby Supplies</option>
                  <option>Business Support</option>
                  <option>Food</option>
                  <option>Toiletries</option>
                  <option>Volunteer Work</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control size="sm" placeholder="What's your zip code?" />
              </Col>
              <Col>
                <Button size="sm" variant="primary">Search</Button>
              </Col>
            </Form.Row>
            <Form.Row className="mt-3 ml-1">
              <Button
                className="mr-3"
                variant="primary"
                onClick={ this.props.toggleNewModal }
              >How can I help?</Button>
              <Button
                className="mr-3"
                variant="primary"
                onClick={ this.props.toggleNewModal }
              >I need help</Button>
            </Form.Row>
          </Form>
        </Jumbotron>
      </>
    )
  }
}

export default K19Jumbotron
