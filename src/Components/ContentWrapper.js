import React, { Component } from 'react'
import styles from './../Styles/styles'
import Block from './Web/Block'
import Link from './Web/Link'

class ContentWrapper extends Component {
  render () {
    const {menu, prependUrl} = this.props
    return (
      <Block style={styles.contentWrapper}>
        {!menu ? null : <Block style={styles.subnav}>
          {
            Object.keys(menu).map(item => <Link key={menu[item].name} href={menu[item].url}>{menu[item].name}</Link>)
          }
        </Block>}
        <Block>
          {this.props.children}
        </Block>
      </Block>
    )  
  }
}

export default ContentWrapper