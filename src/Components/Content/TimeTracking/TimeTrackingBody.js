import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../../Web/Block'

class TimeTrackingBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const TimeTrackingBody = connect(mapStateToProps)(TimeTrackingBodyComponent)

export default TimeTrackingBody