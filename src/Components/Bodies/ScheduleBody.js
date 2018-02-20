import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../Web/Block'
import ScheduleWeekNav from './../ScheduleWeekNav'
import ScheduleTable from './../ScheduleTable'

class ScheduleBodyComponent extends Component {
  componentWillMount = () => {
    apiRequestHandler(
      'get',
      'schedule',
      {},
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
      })
    }
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  render () {
    return (
      <Block>
        <ScheduleWeekNav />
        <ScheduleTable />
      </Block>
    )  
  }
}
const ScheduleBody = connect(mapStateToProps)(ScheduleBodyComponent)

export default ScheduleBody