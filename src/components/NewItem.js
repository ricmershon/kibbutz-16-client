import React, { Component } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Form, Button } from 'react-bootstrap'

class NewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: true,
      helpType: 'offering help',
      tag: 'Baby Supplies',
      notes: '',
      quantity: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose(event) {
    this.setState({ showModal: false })
  }

  handleChange(event) {
    if (event.currentTarget.id === 'helpType') {
      let helpType = event.currentTarget.value.toLowerCase()
      this.setState({ helpType: helpType })
    } else {
      this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ showModal: false })
    const item = {
      helpType: this.state.helpType,
      tag: this.state.tag,
      notes: this.state.notes,
      quantity: this.state.quantity
    }
    console.log(item);
    this.props.handleNewItem(item)
  }

  render() {
    return(
      <Modal show={ this.state.showModal } onHide={ this.handleClose }>
        <Modal.Header closeButton="true">
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{ this.state.memberName }</h5>
          <Form onSubmit={ this.handleSubmit }>
            <Form.Group controlId="helpType">
              <Form.Control
                size="sm"
                as="select"
                name="notes"
                onChange={ this.handleChange }>
                  <option>Offering help</option>
                  <option>Requesting help</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="notes">
              <Form.Control
                size="sm"
                as="textarea"
                rows="5"
                type="text"
                name="notes"
                placeholder="What's on your mind?"
                onChange={ this.handleChange }
              />
            </Form.Group>
            <Form.Group controlId="tag">
              <Form.Label>Category</Form.Label>
              <Form.Control
                size="sm"
                as="select"
                name="tag"
                onChange={ this.handleChange }>
                  <option>Baby Supplies</option>
                  <option>Business Support</option>
                  <option>Food</option>
                  <option>Supplies</option>
                  <option>Toiletries</option>
                  <option>Volunteer Work</option>
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">Save Changes</Button>
              <Button variant="secondary">Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default NewItem
