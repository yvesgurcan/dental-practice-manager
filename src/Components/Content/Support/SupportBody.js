import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import styles from './../../../Styles/styles'
import PageHeader from './../../Web/PageHeader'
import Block from './../../Web/Block'
import SelectClient from './../../SelectClient'
import SelectUser from './../../SelectUser'
import NewClientForm from './../../NewClientForm'
import NewUserForm from './../../NewUserForm'

class SupportBodyComponent extends Component {
  render () {
    const {name} = this.props.session.supportUser || {}
    return (
      <Block>
        <PageHeader>Hi, {name}</PageHeader>
        <Block style={styles.formWrapper}>
          <Block style={styles.standardMargin}>Which user would you like to help today?</Block>
          <SelectClient />
          <SelectUser />
          <NewClientForm />
          <NewUserForm />
        </Block>
      </Block>
    )
  }
}
const SupportBody = connect(mapStateToProps)(SupportBodyComponent)

export default SupportBody