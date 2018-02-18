
import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../Web/Block'
import Button from './../Web/Button'
import FormGroup from './../Web/Input/FormGroup'
import Feedback from './../Feedback'

class UpdateAppointmentFormComponent extends Component {
  updatePatient = () => {
    
  }
  
  render () {
    const { styles } = this.props.environment || {}
    const { updateAppointmentFeedback } = this.props.appointments || {}
    const { appointments } = this.props.appointments || {}
    const updateAppointment = {}
    return (
      <Block style={styles.formWrapper}>
        <Block>
          <FormGroup
            label='Appointment Date'
            name='date'
            value={(updateAppointment || {}).date}
            onChange={this.updateAppointment}
          />
          <Feedback feedback={(updateAppointmentFeedback || {}).form} />
        </Block>
      </Block>
    )
  }
}
const UpdateAppointmentForm = connect(mapStateToProps)(UpdateAppointmentFormComponent)

export default UpdateAppointmentForm
