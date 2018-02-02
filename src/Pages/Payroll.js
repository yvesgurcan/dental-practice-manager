import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class SettingsComponent extends Component {
  render () {
    return (
      <PageWrapper route="/settings" menuRoute="/settings">
        content of Settings
      </PageWrapper>
    )  
  }
}
const Settings = connect(mapStateToProps)(SettingsComponent)

export default Payrollimport React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class PayrollComponent extends Component {
  render () {
    return (
      <PageWrapper route="/payroll" menuRoute="/payroll">
        content of payroll
      </PageWrapper>
    )  
  }
}
const Payroll = connect(mapStateToProps)(PayrollComponent)

export default Payroll
