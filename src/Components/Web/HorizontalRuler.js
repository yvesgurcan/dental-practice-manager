import React, { Component } from 'react'
import styles from './../../Styles/styles'

class HorizontalRuler extends Component {
  render () {
    return (
      <div {...this.props} style={{...styles.horizontalRuler, ...this.props.style}}/>
    )  
  }
}

export default HorizontalRuler