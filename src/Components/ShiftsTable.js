import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from '../Utility/apiRequestHandler';
import Block from './Web/Block'
import Link from './Web/Link'
import Shift from './Shift'

class ShiftsTableComponent extends Component {
  addShift = () => {
    const tempShiftId = 'newShift' + Math.random()
    this.props.dispatch({ type: 'ADD_SHIFT', tempShiftId })
    const { day } = this.props.timetracking || {}
    apiRequestHandler(
      'post',
      'shifts',
      { day },
      this.props.session,
      (response) => this.updateShiftId(response, tempShiftId)
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