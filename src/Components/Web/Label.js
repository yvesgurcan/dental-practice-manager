import React, { Component } from 'react'
import styles from './../../Styles/styles'

class Label extends Component {
  render () {
    return (
      <label {...this.props} style={{...styles.label, ...this.props.style}}/>
    )  
  }
}

export default Label