import React, { Component } from 'react'
import styles from './../Styles/styles'
import Block from './Web/Block'
import SubNavItem from './SubNavItem'

class ContentWrapper extends Component {
  render () {
    const { menu } = this.props
    return (
      <Block style={!menu ? null : styles.contentWrapper}>
        {!menu ? null : <Block style={styles.subNav}>
          {
            Object.keys(menu).map(item => <SubNavItem key={menu[item].name} item={menu[item]}/>)
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