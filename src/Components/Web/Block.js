import React, { Component } from 'react'
import styles from './../../Styles/styles'

class Block extends Component {
  render () {
    const {style} = this.props
    return (
      <div {...this.props} style={{...styles.block, ...style}}/>
    )  
  }
}

export default Block