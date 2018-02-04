import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import PageWrapper from './../../Components/PageWrapper'

class UsersComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      "get",
      "users",
      {clientId: 1},
      this.storeUsers,
    )
  }
  storeUsers = (response) => {
    this.props.dispatch({type: "STORE_USERS", users: response.users})
  }
  render () {
    return (
      <PageWrapper route="/settings/users" menuRoute="/settings">
        content of Users
      </PageWrapper>
    )  
  }
}
const Users = connect(mapStateToProps)(UsersComponent)

export default Users