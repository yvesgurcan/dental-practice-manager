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
  }

  getNextWeek = () => {
    this.switchToDay(7)
  }

  storeShifts = (response) => {
    if (response.feedback.status === 'success') {
      if (window.history.pushState) {
        const { routes } = this.props.environment || {}
        const controller = routes.schedule.url
        window.history.pushState('','',`${controller}/${moment(response.weekOf).format('YYYY/M/D')}`);
        
      }
      
    }
  }

  switchToDay = (weekdayNumber) => {
    const { day } = this.props.timetracking || {}
    const { getShifts, excludeWeekend } = this.props || {}
    let newDay = moment(day).startOf('week').add(1, 'day').add(weekdayNumber,'day')
    newDay = excludeWeekend(newDay)

    this.props.dispatch({type: "STORE_SHIFT_DAY", day: moment(newDay).format('YYYY-MM-DD')})
    getShifts(newDay)

    if (window.history.pushState) {
      const { routes } = this.props.environment || {}
      const controller = routes.timetracking.url
      window.history.pushState('','',`${controller}/${moment(newDay).format('YYYY/M/D')}`)

    }

  }

  switchToDayMobile = (weekdayNumber) => {
    const { day } = this.props.timetracking || {}
    const { getShifts, excludeWeekend } = this.props || {}
    let newDay = moment(day).startOf('week').add(weekdayNumber === '6' ? '8' : weekdayNumber,'day')
    newDay = excludeWeekend(newDay)

    this.props.dispatch({type: "STORE_SHIFT_DAY", day: moment(newDay).format('YYYY-MM-DD')})
    getShifts(newDay)

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
    const { day, dailyTotals } = this.props.timetracking || {}
    const { getPreviousWeek, getNextWeek, switchToDay, switchToDayMobile } = this || {}
    const { excludeWeekend } = this.props;
    const shiftDateFormat = tablet ? 'ddd' : 'dddd'
    const weekdays = this.weekdaysToArray()
    return (
      <Grid style={styles.shiftNavGrid}>
        <Block style={styles.alignLeft}>
          <Link onClick={mobile ? () => switchToDayMobile(moment(day).subtract(1, 'day').format('d')) : getPreviousWeek}>
          &lt;
          </Link>
        </Block>
        {!mobile && weekdays.map(weekday => {
            const matchTotal = (dailyTotals || []).filter(total => moment(total.day).isSame(moment(weekday), 'day'))
            let duration = '0:00'
            let ongoing = false
            if (matchTotal.length > 0) {
              duration = moment.utc(matchTotal[0].total * 60 * 1000).format('HH:mm')
              ongoing = matchTotal[0].ongoing
            }
            return (
              <Block key={weekday} style={moment(weekday).isSame(moment(day)) ? styles.selectedDay : null}>
              <Link onClick={() => switchToDay(moment(weekday).subtract(1, 'day').format('d')) }>
                {moment(weekday).format(shiftDateFormat)}
              </Link>
              <Block style={ongoing ? styles.selectedDayTime : null}>{duration}</Block>
            </Block> 
            )
          })
        } 
        <Block style={styles.alignRight}>
          <Link onClick={mobile ? () => switchToDayMobile(moment(day).add(1, 'day').format('d')) : getNextWeek}>
          &gt; 
          </Link>
        </Block>
      </Grid>
    )  
  }
}
const ScheduleWeekNav = connect(mapStateToProps)(ScheduleWeekNavComponent)

export default ScheduleWeekNav