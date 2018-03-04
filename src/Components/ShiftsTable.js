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
    const { day } = this.props.timetracking || {}
    const { scheduleStart } = this.props.settings || {}
    const tempShiftId = 'newShift' + Math.random()
    const start = moment(day, 'YYYY-MM-DD').isSame(moment('YYYY-MM-DD')) || !scheduleStart ? moment().set({year: moment(day).format('YYYY'), month: moment(day).format('MM'), day: moment(day).format('DD')}).format('YYYY-MM-DD HH:mm') : `${day} ${scheduleStart}`
    this.props.dispatch({
      type: 'ADD_SHIFT',
      tempShiftId,
      start,
    })
    apiRequestHandler(
      'post',
      'shifts',
      { day, start },
      this.props.session,
      (response) => this.updateNewShiftId(response, tempShiftId)
    )
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