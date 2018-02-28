import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import Link from './Web/Link'
import Shift from './Shift'

class ShiftsTableComponent extends Component {
  addShift = () => {
    this.props.dispatch({ type: 'ADD_SHIFT' })
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