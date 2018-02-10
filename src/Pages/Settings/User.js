import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import PageWrapper from './../../Components/PageWrapper'
// import Block from './../../Components/Web/Block'

class UsersComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      "get",
      "users",
      {},
      this.props.session,
      this.storeUsers,
    )
  }
  storeUsers = (response) => {
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
  }
  render () {
    const {users} = this.props.settings
    const {userId} = this.props.match.params
    const userMatch = (users || []).filter(user => user.userId === Number(userId))
    const user = userMatch.length > 0 ? userMatch[0] : {}
    return (
      <PageWrapper pageTitle={user.name} route="/settings/users/:userId([1-9]|[0-9]{2,}|new|add)" menuRoute="/settings">
      </PageWrapper>
    )  
  }
}
const Users = connect(mapStateToProps)(UsersComponent)

export default Users