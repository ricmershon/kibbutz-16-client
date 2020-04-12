import React, { Component } from 'react'
import Item from './Item.js'

class Items extends Component {
  render() {
    return (
      <>
        {
          this.props.items.reverse().map((item, index) => {
            return(
              <Item
                key={ this.props.items[index]._id }
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
