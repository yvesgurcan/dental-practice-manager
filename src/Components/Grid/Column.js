import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'

class ColumnComponent extends Component {
  render () {
    const { styles } = this.props.environment || {}
    const { span, style } = this.props || {}
    return (
      <Block style={{...styles["column" + span || 1], ...style}}>
        {this.props.children}
      </Block>
    )
  }
}

ColumnComponent.propTypes = {
  span: PropTypes.oneOf([2,3,4]),
}

const Column = connect(mapStateToProps)(ColumnComponent)

export default Column