import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PublicPageWrapper from './../Components/PublicPageWrapper'
import ForgotPasswordBody from './../Components/Bodies/ForgotPasswordBody'

class ForgotPasswordComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PublicPageWrapper>
        <ForgotPasswordBody />
      </PublicPageWrapper>
    )  
  }
}
const ForgotPassword = connect(mapStateToProps)(ForgotPasswordComponent)

export default ForgotPassword