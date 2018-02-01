import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'

class UsersComponent extends Component {
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