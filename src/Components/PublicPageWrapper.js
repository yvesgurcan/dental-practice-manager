import React, { Component } from 'react'
import styles from './../Styles/styles'
import Block from './Web/Block'

class PublicPageWrapper extends Component {
  render () {
    return (
      <Block>
        <Block style={styles.publicPage}>
          {this.props.children}
        </Block>
      </Block>
    )  
  }
}

export default PublicPageWrapper