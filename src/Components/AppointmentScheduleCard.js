import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'

class AppointmentScheduleCardComponent extends Component {
  render () {
    const { styles } = this.props.environment || {}
    const { appointment } = this.props || {}
    return (
      <Block style={{...styles.appointmentScheduleCard, minHeight: 19, height: (appointment.duration || 60) * 1.1}}>
        {appointment.date}
      </Block>
    )  
  }
}

AppointmentScheduleCardComponent.propTypes = {
  appointment: PropTypes.object.isRequired,
}

const AppointmentScheduleCard = connect(mapStateToProps)(AppointmentScheduleCardComponent)

export default AppointmentScheduleCard