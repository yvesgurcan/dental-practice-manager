import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class DangerButtonComponent extends Component {
  state = {style: this.props.environment.styles.dangerButton}

  componentWillMount = () => {
    const { disabled } = this.props || {}
    if (disabled) {
      const {styles} = this.props.environment || {}
      this.setState({ style: styles.dangerButtonDisabled })
    }
  }

  componentDidMount () {
    this.mounted = true
  }

  componentWillUpdate = (nextProps) => {
    const { style } = this.state
    const {styles} = this.props.environment || {}
    if (this.props.disabled && !nextProps.disabled) {
      if (style !== styles.button) {
        this.setState({style: styles.dangerButton})
      }
    }
    else if (!this.props.disabled && nextProps.disabled) {
      if (style !== styles.buttonDisabled) {
        this.setState({style: styles.dangerButtonDisabled})
      }
    }
  }

  onHover = () => {
    const { disabled } = this.props || {}
    if (!disabled) {
      const {styles} = this.props.environment
      this.setState({style: styles.dangerButtonHover})
    }
  }

  onClick = (input) => {
    const {styles} = this.props.environment
    this.setState({style: styles.dangerButtonClick})
    setTimeout(this.restoreStyle, 200)
    this.props.onClick(input)
  }

  restoreStyle = () => {
    if (this.mounted) {
      const {styles} = this.props.environment
      const { disabled } = this.props || {}
      this.setState({style: disabled ? styles.dangerButtonDisabled : styles.dangerButton})
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  render () {
    const { children, style, disabled, title, hidden } = this.props || {}
    const {onHover, onClick, restoreStyle} = this
    return (
      <button disabled={disabled} hidden={hidden} children={children} title={title} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}
const DangerButton = connect(mapStateToProps)(DangerButtonComponent)

export default DangerButton