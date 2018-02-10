import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'
import UsersBody from './../../Components/Content/Settings/UsersBody'

class UsersComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute='/settings'>
        <UsersBody />
      </PageWrapper>
    )  
  }
}
const Users = connect(mapStateToProps)(UsersComponent)

export default Users