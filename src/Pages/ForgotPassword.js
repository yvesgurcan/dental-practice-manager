import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PublicPageWrapper from './../Components/PublicPageWrapper'
import PageHeader from './../Components/Web/PageHeader'
import ForgotPasswordForm from './../Components/ForgotPasswordForm'

class ForgotPasswordComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PublicPageWrapper>
        <PageHeader>Dental Practice Manager</PageHeader>
          <ForgotPasswordForm />
      </PublicPageWrapper>
    )  
  }
}
const ForgotPassword = connect(mapStateToProps)(ForgotPasswordComponent)

export default ForgotPassword