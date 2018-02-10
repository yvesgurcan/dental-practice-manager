import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import MessagingBody from './../Components/Content/Messaging/MessagingBody'

class CheckInComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute="/messaging">
        <MessagingBody />
      </PageWrapper>
    )  
  }
}
const CheckIn = connect(mapStateToProps)(CheckInComponent)

export default CheckIn
