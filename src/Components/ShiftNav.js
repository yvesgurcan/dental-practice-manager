import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import moment from 'moment'
import Block from './Web/Block'
import Link from './Web/Link'
import Grid from './Grid/Grid'

class ScheduleWeekNavComponent extends Component {
  getPreviousWeek = () => {
    this.switchToDay(-7)
    /*
    const { weekOf } = this.props.schedule || {}
    const previousWeek = moment(weekOf).subtract(7, 'days').format('YYYY-MM-DD')
    apiRequestHandler(
      'get',
      'schedule',
      {start: previousWeek},
      this.props.session,
      this.storeShifts,
    )
    */
  }

  getNextWeek = () => {
    this.switchToDay(7)
    /*
    const { weekOf } = this.props.schedule || {}
    const nextWeek = moment(weekOf).add(7, 'days').format('YYYY-MM-DD')
    apiRequestHandler(
      'get',
      'schedule',
      {start: nextWeek},
      this.props.session,
      this.storeShifts,
    )
    */
  }

  storeShifts = (response) => {
    if (response.feedback.status === 'success') {
      /*
      this.props.dispatch({
        type: 'STORE_SCHEDULE',
        weeklySchedule: [...response.weeklySchedule],
        weekOf: response.weekOf,
        interval: response.interval,
      })
      */
      
      if (window.history.pushState) {
        const { routes } = this.props.environment || {}
        const controller = routes.schedule.url
        window.history.pushState('','',`${controller}/${moment(response.weekOf).format('YYYY/M/D')}`);
        
      }
      
    }
  }

  switchToDay = (weekdayNumber) => {
    const { day } = this.props.timetracking || {}
    const newDay = moment(day).startOf('week').add(1, 'day').add(weekdayNumber,'day')
    this.props.dispatch({type: "STORE_SHIFT_DAY", day: newDay})

    if (window.history.pushState) {
      const { routes } = this.props.environment || {}
      const controller = routes.timetracking.url
      window.history.pushState('','',`${controller}/${moment(newDay).format('YYYY/M/D')}`)

    }

  }

  weekdaysToArray = () => {
    const { day } = this.props.timetracking || {}
    const weekStart = moment(day).startOf('week').add(1, 'day')
    let weekdays = []
    for (let i = 0; i < 5; i++) {
      weekdays.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'))
    }

    return weekdays
  }

  render () {
    const { styles, viewport } = this.props.environment || {}
    const { mobile, tablet } = viewport 
    const { day } = this.props.timetracking || {}
    const { getPreviousWeek, getNextWeek, switchToDay } = this || {}
    const shiftDateFormat = tablet ? 'ddd' : 'dddd'
    const weekdays = this.weekdaysToArray()
    return (
      <Grid style={styles.shiftNavGrid}>
        <Block style={styles.alignLeft}>
          <Link onClick={getPreviousWeek}>
          &lt;
          </Link>
        </Block>
        {!mobile && weekdays.map(weekday => 
          <Block key={weekday} style={moment(weekday).isSame(moment(day)) ? styles.selectedDay : null}>
            <Link onClick={() => switchToDay(moment(weekday).subtract(1, 'day').format('d')) }>
              {moment(weekday).format(shiftDateFormat)}
            </Link>
          </Block> 
        )} 
        <Block style={styles.alignRight}>
          <Link onClick={getNextWeek}>
          &gt; 
          </Link>
        </Block>
      </Grid>
    )  
  }
}
const ScheduleWeekNav = connect(mapStateToProps)(ScheduleWeekNavComponent)

export default ScheduleWeekNav