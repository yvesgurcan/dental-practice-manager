import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'

class AppointmentScheduleCardComponent extends Component {
  render () {
    const { styles } = this.props.environment || {}
    const { appointment, calculatePosition } = this.props || {}
    const { viewport } = this.props.environment || {}
    return (
      <Block style={{
        ...styles.appointmentScheduleCard,
        height: viewport.tablet ? null : Math.max(20, (appointment.duration || 60)),
        top: viewport.tablet ? null : calculatePosition(appointment),
        marginBottom: viewport.tablet ? null : (appointment.duration * -1 - 4)
      }}>
        {appointment.patientId}
      </Block>
    )  
  }
}

AppointmentScheduleCardComponent.propTypes = {
  appointment: PropTypes.object.isRequired,
}

const AppointmentScheduleCard = connect(mapStateToProps)(AppointmentScheduleCardComponent)

export default AppointmentScheduleCard