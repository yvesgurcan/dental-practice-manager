import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class PayrollComponent extends Component {
  render () {
    return (
      <PageWrapper route="/timetracking" menuRoute="/timetracking">
      </PageWrapper>
    )  
  }
}
const Payroll = connect(mapStateToProps)(PayrollComponent)

export default Payroll
