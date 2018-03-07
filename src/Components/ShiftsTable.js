import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from '../Utility/apiRequestHandler';
import Block from './Web/Block'
import Link from './Web/Link'
import Shift from './Shift'

class ShiftsTableComponent extends Component {
  addShift = () => {
    const { getNewShiftTime } = this
    const { day } = this.props.timetracking || {}
    const { scheduleStart, scheduleEnd } = this.props.settings || {}
    const tempShiftId = 'newShift' + Math.random()
    const start = getNewShiftTime(scheduleStart)
    const end = getNewShiftTime(scheduleEnd, true)
    this.props.dispatch({
      type: 'ADD_SHIFT',
      tempShiftId,
      start,
      end,
    })
    apiRequestHandler(
      'post',
      'shifts',
      { day, start, end },
      this.props.session,
      (response) => this.updateNewShiftId(response, tempShiftId)
    )
  }

  getNewShiftTime = (referenceTime, openEnded) => {
    const { day } = this.props.timetracking || {}

    if (moment(day, 'YYYY-MM-DD').isSame(moment(), 'day')) {
      if (openEnded) {
        return undefined
      }
      else {
        const date = (
          moment(`
          ${moment(day).format('YYYY')}-
            ${moment(day).format('MM')}-
            ${moment(day).format('DD')} 
            ${moment().format('HH')}:
            ${moment().format('mm')}
            `, 'YYYY-MM-DD HH:mm')
            .format('YYYY-MM-DD HH:mm')
        )
        return date
      }
      
    }
    else {
      return `${day} ${referenceTime}`
    }
    
  }

  updateNewShiftId = (response, tempShiftId) => {
    if (response.feedback.status === 'success') {
      this.props.dispatch({
        type: 'STORE_NEW_SHIFT_ID',
        tempShiftId,
        newShiftId: response.newShiftId,
      })  
    }
  }

  render () {
    const { shifts } = this.props.timetracking || {}
    return (
      <Block>
        <Block>
        {
          (shifts || []).map(shift =>
            <Shift
              key={shift.shiftId}
              shift={shift}
            />
          )
        }
        </Block>
        <Link onClick={this.addShift}>Add Timer</Link>
      </Block>
    )
  }
}

export default connect(mapStateToProps)(ShiftsTableComponent)