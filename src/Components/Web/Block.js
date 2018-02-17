import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class BlockComponent extends Component {
  render () {
    const { styles } = this.props.environment
    const { style, children, onClick, hidden } = this.props
    return (
      <div children={children} onClick={onClick} hidden={hidden} style={{...styles.block, ...style}}/>
    )  
  }
}
const Block = connect(mapStateToProps)(BlockComponent)

export default Block