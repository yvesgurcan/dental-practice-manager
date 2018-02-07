import React, { Component } from 'react'
import Block from './Web/Block'
import styles from './../Styles/styles'

class Feedback extends Component {
  render () {
    if (this.props.hidden) return null
    return (
      <InternalFeedback {...this.props} />
    )  
  }
}

class InternalFeedback extends Component {
  render () {
    let {feedback} = this.props
    return (
      <Block style={styles[(feedback || {}).status]}>{(feedback || {}).message}</Block>
    )  
  }
}

export default Feedback