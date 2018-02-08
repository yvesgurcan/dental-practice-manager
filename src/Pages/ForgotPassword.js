import React, { Component } from 'react'
import PublicPageWrapper from './../Components/PublicPageWrapper'
import PageHeader from './../Components/Web/PageHeader'
import ForgotPasswordForm from './../Components/ForgotPasswordForm'

class ForgotPassword extends Component {
  render () {
    return (
      <PublicPageWrapper>
        <PageHeader>Dental Practice Manager</PageHeader>
          <ForgotPasswordForm />
      </PublicPageWrapper>
    )  
  }
}

export default ForgotPassword