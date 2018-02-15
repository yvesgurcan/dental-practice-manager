import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class LabelComponent extends Component {
  render () {
    const { styles } = this.props.environment
    const { children } = this.props
    return (
      <label children={children} style={{...styles.label, ...this.props.style}}/>
    )  
  }
}
const Label = connect(mapStateToProps)(LabelComponent)

export default Label