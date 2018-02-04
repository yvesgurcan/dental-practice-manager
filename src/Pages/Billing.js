import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import BillingBody from './../Components/Content/Billing/BillingBody'

class BillingComponent extends Component {
  render () {
    return (
      <PageWrapper route="/billing" menuRoute="/billing">
        <BillingBody />
      </PageWrapper>
    )  
  }
}
const Billing = connect(mapStateToProps)(BillingComponent)

export default Billing
