import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import apiRequestHandler from './../../../Utility/apiRequestHandler'
import PageHeader from './../../Web/PageHeader'
import Block from './../../Web/Block'
import SelectClient from './../../SelectClient'
import SelectUser from './../../SelectUser'
import NewUserForm from './../../NewUserForm'

class SupportBodyComponent extends Component {
  render () {
    const {name} = this.props.session.supportUser || {}
    return (
      <Block>
        <PageHeader>Hi, {name}</PageHeader>
        <SelectClient />
        <SelectUser />
        <NewUserForm />
      </Block>
    )
  }
}
const SupportBody = connect(mapStateToProps)(SupportBodyComponent)

export default SupportBody