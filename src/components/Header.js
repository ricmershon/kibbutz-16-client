import React, { Component } from 'react'
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Jumbotron,
  Col,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showTip: false
    }
  }


  render() {
    return(
      <React.Fragment>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Navbar.Brand href="#home">Kibbutz-19</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home" active>Home</Nav.Link>
                <OverlayTrigger
                  placement="bottom"
                  delay={{show: 250, hide: 250 }}
                  overlay={ <Tooltip>Latest Covid-19 news</Tooltip>}
                >
                  <Nav.Link href="#link" active>News</Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  delay={{show: 250, hide: 250 }}
                  overlay={ <Tooltip>Latest Covid-19 data</Tooltip>}
                >
                  <Nav.Link href="#link" active>Data</Nav.Link>
                </OverlayTrigger>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="#home">Login</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="outline-success" variant="secondary">Join Us</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron>
          <h2 className="mx-auto">In times of crisis we come together.</h2>
          <p>Poos goal is to create a community where people can come together to share vital resources and supplies during the Covid-19 crisis. Not all of us are able to get to the store, and a lot of stores do not have what we need. If you need something, or have something to share please join our Kibbutz-19 community.</p>
          <h4>What is a kibbutz?</h4>
          <p>A <strong>kibbutz</strong>&mdash;a hebrew word that literally means "gathering, clustering"&mdash;is a collective community in Israel that is traditionally based on agriculture.</p>
          <Form>
            <Form.Row>
              <Col>
                <Form.Control placeholder="What do you need?" />
              </Col>
              <Col>
                <Form.Control placeholder="What's your zip code?" />
              </Col>
              <Col>
                <Button variant="primary">Search</Button>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Button variant="primary">Search</Button>
              </Col>
            </Form.Row>
          </Form>
        </Jumbotron>
      </React.Fragment>
    )
  }
}

export default Header
