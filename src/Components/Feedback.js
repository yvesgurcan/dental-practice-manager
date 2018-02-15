import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'

class Feedback extends Component {
  render () {
    if (this.props.hidden) return null
    return (
      <InternalFeedback {...this.props} />
    )  
  }
}

class InternalFeedbackComponent extends Component {
  render () {
    const { styles } = this.props.environment
    let {feedback} = this.props
    return (
      <Block style={styles[(feedback || {}).status]}>{(feedback || {}).message}</Block>
    )  
  }
}
const InternalFeedback = connect(mapStateToProps)(InternalFeedbackComponent)

export default Feedback