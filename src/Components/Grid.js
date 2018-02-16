import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'

class GridComponent extends Component {
  render () {
    const { styles } = this.props.environment || {}
    const { columns } = this.props || {}
    return (
      <Block style={styles["grid" + columns || 2]}>
        {this.props.children}
      </Block>
    )
  }
}
const Grid = connect(mapStateToProps)(GridComponent)

export default Grid