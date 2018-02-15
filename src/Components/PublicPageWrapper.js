import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'

class PublicPageWrapperComponent extends Component {
  render () {
    const { styles } = this.props.environment
    return (
      <Block>
        <Block style={styles.publicPage}>
          {this.props.children}
        </Block>
      </Block>
    )  
  }
}
const PublicPageWrapper = connect(mapStateToProps)(PublicPageWrapperComponent)

export default PublicPageWrapper