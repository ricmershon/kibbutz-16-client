import React, { Component } from 'react'
import K19Jumbotron from './K19Jumbotron'
import Items from './Items'
import NewItem from './NewItem'
import UpdateItem from './UpdateItem'
import { createApolloFetch } from 'apollo-fetch'
import { Container } from 'react-bootstrap'

const fetch = createApolloFetch({
  uri: `https://kibbutz-19-api.herokuapp.com/graphql` || process.env.APOLLO_FETCH
})

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memberId: "5e94947d1559150017bb1349",
      items: [],
      item: {},
      showNewModal: false,
      showUpdateModal: false
    }
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this)
    this.getItems = this.getItems.bind(this)
    this.handleEditItem = this.handleEditItem.bind(this)
    this.toggleNewModal = this.toggleNewModal.bind(this)
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this)
    this.handleNewItem = this.handleNewItem.bind(this)
  }

  componentDidMount() {
    this.getItems()
  }

  async getItems() {
    try {
      const requestBody = {
        query: `query {
          items { _id helpType tag notes quantity member { name } }
        }`
      }
      let response = await fetch(requestBody)
      this.setState({ items: response.data.items })
    } catch (error) {
      console.error(error);
    }
  }

  async handleEditItem(item) {
    try {
      const requestBody = {
        query: `mutation {
          updateItem(
            _id: "${item._id}"
            helpType: "${item.helpType}"
            tag: "${item.tag}"
            notes: "${item.notes}"
            quantity: ${item.quantity}
          ) { _id helpType tag notes quantity }
        }`
      }
      let response = await fetch(requestBody)
      let updatedItem = response.data
      let index = this.state.items.findIndex(item => item._id === updatedItem._id)
      let tempList = this.state.items
      tempList[index] = updatedItem
      this.setState({ items: tempList })
      this.setState({ showUpdateModal: false })
      console.log(this.state.items);
    } catch (error) {
      console.error(error);
    }
  }

  async handleNewItem(item) {
    console.log('inside handleNewItem');
    console.log(this.state.items);
    try {
      const requestBody = {
        query: `mutation {
          addItem(
            helpType: "${item.helpType}",
            tag: "${item.tag}",
            notes: "${item.notes}",
            memberId: "5e90d959d6a4dc0682a98f99"
          ) { _id helpType tag notes quantity member { name }}
        }`
      }
      let response = await fetch(requestBody)
      let newItem = response.data.addItem
      let currentItems = this.state.items
      currentItems.push(newItem)
      this.setState({ items: currentItems })
      this.setState( {showNewModal: false })
    } catch (error) {
      console.error(error);
    }
  }

  toggleUpdateModal(data) {
    this.setState({ showUpdateModal: !this.state.showUpdateModal })
    this.setState({ item: data })
  }

  toggleNewModal(data) {
    this.setState({ showNewModal: !this.state.showNewModal })
  }

  render() {
    return(
      <>
        <K19Jumbotron
          handleEditItem={ this.handleEditItem }
          toggleNewModal= { this.toggleNewModal }
        />
        <Container className="">
          <h5 className="">Latest Posts</h5>
          <Items
            items={ this.state.items }
            toggleUpdateModal={ this.toggleUpdateModal }
            />
        </Container>

        {
          this.state.showNewModal ?
          (<NewItem
            showNewModal={ this.state.showNewModal }
            handleNewItem={ this.handleNewItem }
          />) : ''
        }

        {
          this.state.showUpdateModal ?
          (<UpdateItem
            item={ this.state.item }
            contactMethod={ this.state.contactMethod }
            memberName={ this.state.memberName }
            handleEditItem={ this.handleEditItem }
          />) : ''
        }
      </>
    )
  }
}

export default Main
