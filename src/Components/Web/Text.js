import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class TextComponent extends Component {
  render () {
    const {styles} = this.props.environment
    const {style, children, onClick} = this.props
    return (
      <span children={children} onClick={onClick} style={{...styles.block, ...style}}/>
    )  
  }
}
const Text = connect(mapStateToProps)(TextComponent)

export default Text