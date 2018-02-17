import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'
import ScheduleSettingsBody from './../../Components/Bodies/ScheduleSettingsBody'

class AccountComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute='/settings'>
        <ScheduleSettingsBody />
      </PageWrapper>
    )  
  }
}
const Account = connect(mapStateToProps)(AccountComponent)

export default Account