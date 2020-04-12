import React, { Component } from 'react'
import { Card, Button, Form, ButtonGroup } from 'react-bootstrap'

class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showNotes: false
    }
    this.toggleNotes = this.toggleNotes.bind(this)
  }

  toggleNotes() {
    this.setState({showNotes: !this.state.showNotes})
  }

  render () {
    return (
      <>
        <Card className="shadow mb-4">
          <Card.Header as="h5" className="d-flex justify-content-between">
            { this.props.item.member.name } is { this.props.item.helpType }
            <ButtonGroup size="sm" className="">
              <Button
                onClick={ () => this.props.toggleUpdateModal(this.props.item) }
                variant="outline-info">
                Update
              </Button>
              <Button variant="outline-info">Complete</Button>
            </ButtonGroup>
          </Card.Header>
          <Card.Body>
            <Card.Title>{ this.props.item.tag }</Card.Title>
            <Card.Text>{ this.props.item.notes }</Card.Text>
            <Form.Control type="text" placeholder="Leave a comment"/>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Item
