import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class BillingComponent extends Component {
  render () {
    return (
      <PageWrapper route="/billing" menuRoute="/billing">
        content b
      </PageWrapper>
    )  
  }
}
const Billing = connect(mapStateToProps)(BillingComponent)

export default Billing
