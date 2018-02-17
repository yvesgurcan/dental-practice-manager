import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../../Web/Block'
import Grid from './../../Grid'

class ScheduleBodyComponent extends Component {
  renderTimeSlotsOnLargeScreen = () => {
    const { weekdays } = this.props.environment || {}
    const scheduleStart = 8.5
    const scheduleEnd = 17.45
    const appointmentLength = 1
    const slotsNumber = parseInt(scheduleEnd - scheduleStart)
    const scheduleArray = [{name: "Time"}].concat(weekdays)
    let weeklySchedule = []
    for (let i = 0; i < slotsNumber; i++) {
      weeklySchedule[i] = []
      scheduleArray.map((day, x) => {
        weeklySchedule[i][x] = (<Block key={day.name + "_" + i}>{day.name}_{i}</Block>)        
        return null
      })
    }

    return weeklySchedule
  }

  render () {
    const { weekdays, styles, viewport } = this.props.environment || {}
    const scheduleArray = [{name: "Time"}].concat(weekdays)
    return (
      <Block>
        <Block hidden={!viewport.desktop}>
          <Grid style={styles.scheduleGrid}>
          {
            scheduleArray.map(day => <Block key={day.name}>{day.name}</Block>)
          }
          {
            this.renderTimeSlotsOnLargeScreen().map(component => component)
          }
          </Grid>
        </Block>
        <Block hidden={viewport.desktop}>
          {
            weekdays.map(day => <Block key={day.name}>{day.name}</Block>)
          }        
        </Block>
      </Block>
    )  
  }
}
const ScheduleBody = connect(mapStateToProps)(ScheduleBodyComponent)

export default ScheduleBody