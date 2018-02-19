import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class SecondaryButtonComponent extends Component {
  state = {style: this.props.environment.styles.secondaryButton}
  componentWillMount = () => {
    const { disabled } = this.props || {}
    if (disabled) {
      const {styles} = this.props.environment || {}
      this.setState({ style: styles.secondaryButtonDisabled })
    }
  }
  componentWillUpdate = (nextProps) => {
    const { style } = this.state
    const {styles} = this.props.environment || {}
    if (this.props.disabled && !nextProps.disabled) {
      if (style !== styles.button) {
        this.setState({style: styles.secondaryButton})
      }
    }
    else if (!this.props.disabled && nextProps.disabled) {
      if (style !== styles.buttonDisabled) {
        this.setState({style: styles.secondaryButtonDisabled})
      }
    }
  }
  onHover = () => {
    const { disabled } = this.props || {}
    if (!disabled) {
      const {styles} = this.props.environment
      this.setState({style: styles.secondaryButtonHover})
    }
  }
  onClick = (input) => {
    const {styles} = this.props.environment
    this.setState({style: styles.secondaryButtonClick})
    setTimeout(this.restoreStyle, 200)
    this.props.onClick(input)
  }
  restoreStyle = () => {
    const {styles} = this.props.environment
    const { disabled } = this.props || {}
    this.setState({style: disabled ? styles.secondaryButtonDisabled : styles.secondaryButton})
  }
  render () {
    const { children, style, disabled, title, hidden } = this.props || {}
    const {onHover, onClick, restoreStyle} = this
    return (
      <button disabled={disabled} hidden={hidden} children={children} title={title} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}

SecondaryButtonComponent.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
}

const SecondaryButton = connect(mapStateToProps)(SecondaryButtonComponent)

export default SecondaryButton