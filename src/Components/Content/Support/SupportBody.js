import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import PageHeader from './../../Web/PageHeader'
import Block from './../../Web/Block'

class SupportBodyComponent extends Component {
  render () {
    let {name} = this.props.session.supportUser || {}
    return (
      <Block>
        <PageHeader>Hi, {name}</PageHeader>
      </Block>
    )  
  }
}
const SupportBody = connect(mapStateToProps)(SupportBodyComponent)

export default SupportBody