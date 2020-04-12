import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo'


const MEMBERS_QUERY = gql `
  query MembersQuery {
    members {
      firstName
      lastName
      email
      zipCode
    }
  }
`
class ShowMembers extends Component {
  render() {
    return (
      <Fragment>
        <h2>Members</h2>
        <Query query={MEMBERS_QUERY}>
          {
            ({ loading, error, data }) => {
              if (loading) {
                return <h4>Loading...</h4>
              }
              if (error) {
                console.log('FOUND ERROR', error);
              }
              console.log(data);
              return <h4>test</h4>
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default ShowMembers
