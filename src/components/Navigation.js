import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  Form,
  Button
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
              <Link className="nav-link" to='/'>Home</Link>
              <Link className="nav-link" to='/news'>News</Link>
              <Link className="nav-link" to='/data'>Data</Link>
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
