import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'

class HorizontalRulerComponent extends Component {
  render () {
    const {styles} = this.props.environment
    return (
      <div style={{...styles.horizontalRuler, ...this.props.style}}/>
    )  
  }
}
const HorizontalRuler = connect(mapStateToProps)(HorizontalRulerComponent)

export default HorizontalRuler