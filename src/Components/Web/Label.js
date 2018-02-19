import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class LabelComponent extends Component {
  render () {
    const { styles } = this.props.environment
    const { children } = this.props
    return (
      <label children={children} style={{...styles.label, ...this.props.style}}/>
    )  
  }
}

LabelComponent.propTypes = {
  children: PropTypes.any.isRequired,
}

const Label = connect(mapStateToProps)(LabelComponent)

export default Label