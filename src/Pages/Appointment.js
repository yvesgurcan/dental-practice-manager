import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import AppointmentBody from './../Components/Bodies/AppointmentBody'

class AppointmemtComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: 'STORE_ROUTE', ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute='/patients'>
        <AppointmentBody />
      </PageWrapper>
    )  
  }
}
const Appointment = connect(mapStateToProps)(AppointmentComponent)

export default Appointment
