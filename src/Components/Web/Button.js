import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class ButtonComponent extends Component {
  state = {style: this.props.environment.styles.button}
  onHover = () => {
    const {styles} = this.props.environment
    this.setState({style: styles.buttonHover})
  }
  onClick = (input) => {
    const {styles} = this.props.environment
    this.setState({style: styles.buttonClick})
    setTimeout(this.restoreStyle, 200)
    this.props.onClick(input)
  }
  restoreStyle = () => {
    const {styles} = this.props.environment
    this.setState({style: styles.button})
  }
  render () {
    const { style, children } = this.props
    const {onHover, onClick, restoreStyle} = this
    return (
      <button children={children} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}
const Button = connect(mapStateToProps)(ButtonComponent)

export default Button