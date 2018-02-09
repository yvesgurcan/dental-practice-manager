import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import SectionHeader from './Web/SectionHeader'
import styles from './../Styles/styles'
import UserForm from './UserForm'

class NewUserFormComponent extends Component {
  render () {
    const {client} = this.props.session
    if (!client || !client.clientId) {
      return null
    }
    return (
      <Block style={styles.newUserForm}>
        <SectionHeader>New User</SectionHeader>
        <UserForm />
      </Block>
    )
  }
}
const NewUserForm = connect(mapStateToProps)(NewUserFormComponent)

export default NewUserForm