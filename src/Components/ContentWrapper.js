import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import SubNav from './Nav/SubNav'

class ContentWrapperComponent extends Component {
  render () {
    const { styles } = this.props.environment || {}
    const { menu, subRouteHome } = this.props || {}
    return (
      <Block style={!menu ? {...styles.container} : {...styles.contentWrapper, ...styles.container}}>
        {!menu ? null : <SubNav menu={menu} subRouteHome={subRouteHome} />}
        <Block>
          {this.props.children}
        </Block>
      </Block>
    )  
  }
}
const ContentWrapper = connect(mapStateToProps)(ContentWrapperComponent)

export default ContentWrapper