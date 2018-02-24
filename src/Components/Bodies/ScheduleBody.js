import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import setWindowTitle from './../../Utility/setWindowTitle'
import Block from './../Web/Block'
import SectionHeader from './../Web/SectionHeader'
import ScheduleWeekNav from './../ScheduleWeekNav'
import ScheduleTable from './../ScheduleTable'

class ScheduleBodyComponent extends Component {
  componentWillMount = () => {
    const { year, month, day } = this.props.routeData.params || {}
    let start = undefined
    if (year && month && day) {
      start = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD')
    }
    apiRequestHandler(
      'get',
      'schedule',
      {start: start},
      this.props.session,
      this.storeAppointments,
    )
    apiRequestHandler(
      'get',
      'settings',
      {},
      this.props.session,
      this.storeSettings,
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

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  render () {
    const {
      session,
      environment,
      routeData,
      schedule,
    } = this.props || {}
    const { routes } = environment || {}
    const { weekOf } = schedule || {}
    const mainHeader = `Week of ${moment(weekOf).format('MMMM D, YYYY')}`
    setWindowTitle(mainHeader, session, environment, routeData)
    return (
      <Block>
        <ScheduleWeekNav />
        <SectionHeader>{mainHeader}</SectionHeader>
        <ScheduleTable />
      </Block>
    )  
  }
}
const ScheduleBody = connect(mapStateToProps)(ScheduleBodyComponent)

export default ScheduleBody