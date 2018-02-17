import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import BillingBody from './../Components/Bodies/BillingBody'

class BillingComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute="/billing">
        <BillingBody />
      </PageWrapper>
    )  
  }
}
const Billing = connect(mapStateToProps)(BillingComponent)

export default Billing
