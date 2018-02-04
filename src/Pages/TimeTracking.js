import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import TimeTrackingBody from './../Components/Content/TimeTracking/TimeTrackingBody'

class PayrollComponent extends Component {
  render () {
    return (
      <PageWrapper route="/timetracking" menuRoute="/timetracking">
        <TimeTrackingBody />
      </PageWrapper>
    )  
  }
}
const Payroll = connect(mapStateToProps)(PayrollComponent)

export default Payroll
