import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageHeader from './../Web/PageHeader'
import Block from './../Web/Block'

class HomeBodyComponent extends Component {
  render () {
    let {name} = this.props.session.user || {}
    return (
      <Block>
        <PageHeader>Hello, {name}</PageHeader>
      </Block>
    )  
  }
}
const HomeBody = connect(mapStateToProps)(HomeBodyComponent)

export default HomeBody