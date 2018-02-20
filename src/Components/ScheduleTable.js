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
  renderTimeSlotsOnLargeScreen = () => {
    const { weekdays } = this.props.environment || {}
    const scheduleStart = 8.5
    const scheduleEnd = 18.5
    const appointmentLength = 1
    const slotsNumber = parseInt(scheduleEnd - scheduleStart, 10)
    const scheduleArray = [{name: "Time"}].concat(weekdays)
    let weeklySchedule = []
    for (let i = 0; i <= slotsNumber; i++) {
      weeklySchedule[i] = []
      scheduleArray.map((day, x) => {
        if (x === 0) {
          weeklySchedule[i][x] = (<Block key={scheduleStart+i*appointmentLength}>{scheduleStart+i*appointmentLength}</Block>)
          return null
        }
        weeklySchedule[i][x] = (<Block key={day.name + "_" + i}>{day.name}_{i}</Block>)
        return null
      })
    }

    return weeklySchedule
  }

  getTimes = () => {
    const { scheduleStart, scheduleEnd, appointmentLength } = this.props.settings || {}
  }

  render () {
    const { styles, viewport } = this.props.environment || {}
    const { daysOpen } = this.props.settings || {}
    const { weeklySchedule } = this.props.schedule || {}
    return (
      <Block>
        <Grid style={styles.scheduleGrid}>
          <Column>
            Time
            <Block>
              {

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