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
  getStartAndStopOfDay = () => {
    const { scheduleStart, scheduleEnd } = this.props.settings || {}
    const { interval } = this.props.schedule || {}
    let earliestStart = scheduleStart
    let latestStop = scheduleEnd
    if (
      interval
      && interval.earliestDailyStart
      && interval.latestDailyStop
    ) {
      if (earliestStart > interval.earliestDailyStart) {
        earliestStart = interval.earliestDailyStart
      }
      if (latestStop < interval.latestDailyStop) {
        latestStop = interval.latestDailyStop
      }
    }

    return { earliestStart, latestStop }
  }

  getNumberOfTimeSlots = () => {
    const { scheduleStart, scheduleEnd, appointmentLength } = this.props.settings || {}
    if (!scheduleStart || !scheduleEnd || !appointmentLength) {
      return null
    }

    const { earliestStart, latestStop } = this.getStartAndStopOfDay()

    const slotsNumber = parseInt(moment(latestStop, 'HH:mm').add(appointmentLength, 'minutes').diff(moment(earliestStart, 'HH:mm'), 'minutes') / appointmentLength, 10)

    return Math.max(0, slotsNumber)
  }

  getTimeSlots = () => {

    const slotsNumber = this.getNumberOfTimeSlots()

    if (slotsNumber <= 0) {
      return null
    }

    const { appointmentLength } = this.props.settings || {}
    const { earliestStart } = this.getStartAndStopOfDay()

    let timeSlots = []
    for (let i = 0; i < slotsNumber; i++) {
      timeSlots.push([moment(earliestStart, 'HH:mm').add(appointmentLength*i, 'minutes').format('ha')])
    }

    return timeSlots

  }

  calculatePosition = (appointment) => {
    const { earliestStart } = this.getStartAndStopOfDay()

    if (!earliestStart) {
      return 0
    }

    const sameDayEarliestStart = moment(appointment.date).startOf('day').set({
      hour: moment(earliestStart, 'HH:mm').get('hour'),
      minute: moment(earliestStart, 'HH:mm').get('minute'),
    })

    const offsetInMinutes = moment(appointment.date).diff(sameDayEarliestStart, 'minutes')

    const offset = offsetInMinutes / 60 * 76

    return offset
  }

  render () {
    const { styles, viewport } = this.props.environment || {}
    const { daysOpen } = this.props.settings || {}
    const { weeklySchedule } = this.props.schedule || {}
    const timeSlots = this.getTimeSlots()
    const daysDisplayed = (weeklySchedule || []).filter(dailySchedule => (dailySchedule.appointments || []).length > 0 || (daysOpen || []).indexOf(moment(dailySchedule.date).format('dddd')) > -1).length
    console.log('days displayed',daysDisplayed)
    return (
      <Block>
        {!viewport.desktop ? null :
          <Block>
            {
              (timeSlots || []).map((timeSlot, index) => 
                <Block key={timeSlot} style={{...styles.timeSlotHorizontalLine, top: (-6 + (index+1)*76)}} />
              )
            }
          </Block>
        }
        <Grid style={styles.scheduleGrid}>
          {!viewport.desktop ? null :
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
          }
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
                    (dailySchedule.appointments || []).map(appointment =>
                      <AppointmentScheduleCard 
                        key={appointment.date} 
                        appointment={appointment}
                        calculatePosition={this.calculatePosition}
                      />
                    )
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