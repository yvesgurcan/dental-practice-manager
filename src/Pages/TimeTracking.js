import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import TimeTrackingBody from './../Components/Bodies/TimeTrackingBody'

class PayrollComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper pageTitle={null} menuRoute="/timetracking">
        <TimeTrackingBody />
      </PageWrapper>
    )  
  }
}
const Payroll = connect(mapStateToProps)(PayrollComponent)

export default Payroll
