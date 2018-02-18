import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'
import UpdateAppointmentForm from './../Forms/UpdateAppointmentForm'

class AppointmentBodyComponent extends Component {
  render () {
    return (
      <Block>
        <UpdateAppointmentForm />
      </Block>
    )  
  }
}
const AppointmentBody = connect(mapStateToProps)(AppointmentBodyComponent)

export default AppointmentBody
