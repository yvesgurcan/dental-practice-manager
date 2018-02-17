import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'

class ColumnComponent extends Component {
  render () {
    const { styles } = this.props.environment || {}
    const { span } = this.props || {}
    return (
      <Block style={styles["column" + span || 1]}>
        {this.props.children}
      </Block>
    )
  }
}
const Column = connect(mapStateToProps)(ColumnComponent)

export default Column