import React, { Component } from 'react'
import { Container, CardColumns } from 'react-bootstrap'
import Item from './Item.js'

class Items extends Component {
  render() {
    return (
      <>
        {
          this.props.items.map((item, index) => {
            return(
              <Item
                toggleUpdateModal={ this.props.toggleUpdateModal }
                item={ item }
                index={ index }
              />
            )
          })
        }
      </>
    )
  }
}

export default Items
