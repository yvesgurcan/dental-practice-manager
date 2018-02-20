import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import SectionHeader from './Web/SectionHeader'
import Grid from './Grid/Grid'
import Column from './Grid/Column'
import AppointmentScheduleCard from './AppointmentScheduleCard'

class ScheduleTableComponent extends Component {
  getTimeSlots = () => {
    const { scheduleStart, scheduleEnd, appointmentLength } = this.props.settings || {}
    if (!scheduleStart || !scheduleEnd || !appointmentLength) {
      return null
    }
    const slotsNumber = parseInt(moment(scheduleEnd, 'HH:mm').add(appointmentLength, 'minutes').diff(moment(scheduleStart, 'HH:mm'), 'minutes') / appointmentLength, 10)

    if (slotsNumber <= 0) {
      return null
    }

    let timeSlots = []
    for (let i = 0; i < slotsNumber; i++) {
      timeSlots.push([moment(scheduleStart, 'HH:mm').add(appointmentLength*i, 'minutes').format('h:mm')])
    }

    return timeSlots

  }

  render () {
    const { styles, viewport } = this.props.environment || {}
    const { daysOpen } = this.props.settings || {}
    const { weeklySchedule } = this.props.schedule || {}
    const timeSlots = this.getTimeSlots()
    return (
      <Block>
        <Grid style={styles.scheduleGrid}>
          <Column style={styles.timeSlots}>
            <Block>
              {
                (timeSlots || []).map(timeSlot => 
                  <Block key={timeSlot} style={styles.timeSlot}>
                    {timeSlot}
                  </Block>)
              }
            </Block>
          </Column>
          {
            (weeklySchedule || []).map(dailySchedule => (
              <Block
                key={dailySchedule.date}
                hidden={(dailySchedule.appointments || []).length === 0 && (daysOpen || []).indexOf(moment(dailySchedule.date).format('dddd')) === -1}>
                <SectionHeader>
                  {moment(dailySchedule.date).format(viewport.desktop ? 'ddd M/D' : 'dddd M/D')}
                </SectionHeader>
                <Block>
                  {
                    (dailySchedule.appointments || []).map(appointment => <AppointmentScheduleCard key={appointment.date} appointment={appointment} />)
                  }
                </Block>
              </Block>
            ))
          }
        </Grid>   
      </Block>
    )  
  }
}
const ScheduleTable = connect(mapStateToProps)(ScheduleTableComponent)

export default ScheduleTable