import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import SubNavItem from './SubNavItem'

class ContentWrapperComponent extends Component {
  render () {
    const { styles } = this.props.environment
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
const ContentWrapper = connect(mapStateToProps)(ContentWrapperComponent)

export default ContentWrapper