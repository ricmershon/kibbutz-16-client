import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'


class News extends Component {


  render() {
    return(
      <>
      <Jumbotron className="px-5 mt-3 pb-4 mb-4" fluid>
        <h2 className="mx-auto">News</h2>
        <p>Our goal is to create a community where people can come together to share vital resources and supplies during the Covid-19 crisis. Not all of us are able to get to the store, and a lot of stores do not have what we need. If you need something, or have something to share please join our Kibbutz-19 community.</p>
      </Jumbotron>

      </>
    )
  }
}

export default News
