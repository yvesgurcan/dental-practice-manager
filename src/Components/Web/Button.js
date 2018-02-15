import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class ButtonComponent extends Component {
  state = {style: this.props.environment.styles.button}
  componentWillMount = () => {
    const { disabled } = this.props || {}
    if (disabled) {
      const {styles} = this.props.environment || {}
      this.setState({ style: styles.buttonDisabled })
    }
  }
  componentWillUpdate = (nextProps) => {
    const { style } = this.state
    const {styles} = this.props.environment || {}
    if (this.props.disabled && !nextProps.disabled) {
      if (style !== styles.button) {
        this.setState({style: styles.button})
      }
    }
    else if (!this.props.disabled && nextProps.disabled) {
      if (style !== styles.buttonDisabled) {
        this.setState({style: styles.buttonDisabled})
      }
    }
  }
  onHover = () => {
    const { disabled } = this.props || {}
    if (!disabled) {
      const {styles} = this.props.environment || {}
      this.setState({style: styles.buttonHover})  
    }
  }
  onClick = (input) => {
    const {styles} = this.props.environment || {}
    this.setState({style: styles.buttonClick})
    setTimeout(this.restoreStyle, 200)
    this.props.onClick(input)
  }
  restoreStyle = () => {
    const {styles} = this.props.environment || {}
    const { disabled } = this.props || {}
    this.setState({style: disabled ? styles.buttonDisabled : styles.button})
  }
  render () {
    const { style, children, disabled, title } = this.props || {}
    const {onHover, onClick, restoreStyle} = this
    return (
      <button disabled={disabled} children={children} title={title} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}
const Button = connect(mapStateToProps)(ButtonComponent)

export default Button