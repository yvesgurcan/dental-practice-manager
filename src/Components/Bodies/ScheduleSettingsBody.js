import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../../Components/Web/Block'
import ScheduleBoundaries from './../Forms/ScheduleBoundaries'

class AccountBodyComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      'get',
      'settings',
      {},
      this.props.session,
      this.storeSettings,
    )
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
    const { daysOpen, scheduleStart, scheduleEnd, appointmentLength } = response.settings || {}
    this.props.dispatch({
      type: 'SELECT_SCHEDULE_BOUNDARIES',
      scheduleBoundaries: {
        daysOpen,
        scheduleStart,
        scheduleEnd,
        appointmentLength,
      },
    })
  }

  render () {
    return (
    <Block>
      <ScheduleBoundaries />
    </Block>
    )  
  }
}
const AccountBody = connect(mapStateToProps)(AccountBodyComponent)

export default AccountBody