import React, { Component } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Form, Col, Button } from 'react-bootstrap'

class UpdateItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: true,
      _id: this.props.item._id,
      helpType: this.props.item.helpType,
      tag: this.props.item.tag,
      notes: this.props.item.notes,
      quantity: this.props.item.quantity,
      member: this.props.item.member,
      contactMethod: this.props.contactMethod,
      contactName: this.props.contactName
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(event) {
    this.setState({ showModal: false })
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.Value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ showModal: false })
    const item = {
      _id: this.state._id,
      helpType: this.state.helpType,
      tag: this.state.tag,
      notes: this.state.notes,
      quantity: this.state.quantity,
      contactMethod: this.state.contactMethod
    }
    this.props.handleEditItem(item)
  }

  render() {
    return(
      <Modal show={ this.state.showModal } onHide={ this.handleClose }>
        <Modal.Header closeButton="true">
          <Modal.Title>{ this.state.member.name } is { this.state.helpType }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{ this.state.contactName }</h3>
          <Form onSubmit={ this.handleSubmit }>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

}

export default UpdateItem
