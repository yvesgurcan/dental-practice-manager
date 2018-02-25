import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import Shift from './Shift'

class ShiftsTableComponent extends Component {
  render () {
    const { shifts } = this.props.timetracking || {}
    return (
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
    )
  }
}

export default connect(mapStateToProps)(ShiftsTableComponent)