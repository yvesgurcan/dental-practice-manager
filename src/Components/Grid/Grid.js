import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'

class GridComponent extends Component {
  render () {
    const { styles } = this.props.environment || {}
    const { columns, style } = this.props || {}
    return (
      <Block style={style ? {...style} : styles["grid" + columns || 2]}>
        {this.props.children}
      </Block>
    )
  }
}

GridComponent.propTypes = {
  columns: PropTypes.oneOf([2,3,4,5,12]),
}

const Grid = connect(mapStateToProps)(GridComponent)

export default Grid