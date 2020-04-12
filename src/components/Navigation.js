import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  Form,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showTip: false
    }
  }

  render() {
    return(
      <>
        <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
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
              <Nav.Link className="mr-2" href="#home">Login</Nav.Link>
            </Nav>
            <Form inline>
              <Button size="sm" variant="secondary">Join Us</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

export default Navigation
