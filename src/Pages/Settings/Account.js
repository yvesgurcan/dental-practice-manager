import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'
import AccountBody from './../../Components/Content/Settings/AccountBody'

class AccountComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute='/settings'>
        <AccountBody />
      </PageWrapper>
    )  
  }
}
const Account = connect(mapStateToProps)(AccountComponent)

export default Account