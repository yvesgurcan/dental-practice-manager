import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'
import SubNavItem from './SubNavItem'

class SubNavComponent extends Component {
  render () {
    const { styles } = this.props.environment
    const { menu, subRouteHome } = this.props
    return (
      <Block style={styles.subNav}>
        { !subRouteHome ? null : <SubNavItem item={subRouteHome}/> }
        {
          Object.keys(menu).map(item => <SubNavItem key={menu[item].name} item={menu[item]}/>)
        }
      </Block>
    )  
  }
}
const SubNav = connect(mapStateToProps)(SubNavComponent)

export default SubNav