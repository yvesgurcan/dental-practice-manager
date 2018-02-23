import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import moment from 'moment'
import Block from './Web/Block'
import Link from './Web/Link'
import Grid from './Grid/Grid'

class ScheduleWeekNavComponent extends Component {
  getPreviousWeek = () => {
    const { weekOf } = this.props.schedule || {}
    const previousWeek = moment(weekOf).subtract(7, 'days').format('YYYY-MM-DD')
    apiRequestHandler(
      'get',
      'schedule',
      {start: previousWeek},
      this.props.session,
      this.storeAppointments,
    )
  }

  getNextWeek = () => {
    const { weekOf } = this.props.schedule || {}
    const nextWeek = moment(weekOf).add(7, 'days').format('YYYY-MM-DD')
    apiRequestHandler(
      'get',
      'schedule',
      {start: nextWeek},
      this.props.session,
      this.storeAppointments,
    )
  }

  storeAppointments = (response) => {
    if (response.feedback.status === 'success') {
      this.props.dispatch({
        type: 'STORE_SCHEDULE',
        weeklySchedule: [...response.weeklySchedule],
        weekOf: response.weekOf,
        interval: response.interval,
      })
      
      if (window.history.pushState) {
        const { routes } = this.props.environment || {}
        const controller = routes.schedule.url
        window.history.pushState('','',`${controller}/${moment(response.weekOf).format('YYYY/M/D')}`);
        
      }
      
    }
  }

  render () {
    const { styles } = this.props.environment || {}
    const { weekOf } = this.props.schedule || {}
    const previousWeek = moment(weekOf).subtract(7, 'days')
    const nextWeek = moment(weekOf).add(7, 'days')
    const { getPreviousWeek, getNextWeek } = this || {}
    return (
      <Grid columns={2}>
        <Block style={styles.alignLeft}>
          <Link onClick={getPreviousWeek}>
          &lt; Week of {moment(previousWeek).format('M/D')}
          </Link>
        </Block>
        <Block style={styles.alignRight}>
          <Link onClick={getNextWeek}>
          Week of {moment(nextWeek).format('M/D')} &gt; 
          </Link>
        </Block>
      </Grid>
    )  
  }
}
const ScheduleWeekNav = connect(mapStateToProps)(ScheduleWeekNavComponent)

export default ScheduleWeekNav