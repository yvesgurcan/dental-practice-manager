import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../../Web/Block'

class ScheduleBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const ScheduleBody = connect(mapStateToProps)(ScheduleBodyComponent)

export default ScheduleBody