import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import PageHeader from './../Web/PageHeader'
import Block from './../Web/Block'
import Grid from './../Grid/Grid'
import SelectClient from './../Forms/SelectClient'
import SelectUser from './../Forms/SelectUser'
import NewClientForm from './../Forms/NewClientForm'
import NewUserForm from './../Forms/NewUserForm'

class SupportBodyComponent extends Component {
  componentWillMount = () => {
    const { session } = this.props || {}
    const { client } = session || {}
    if (client && client.clientId) {
      apiRequestHandler(
        'get',
        'settings',
        {},
        session,
        this.storeSettings,
      )
    }
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  render () {
    const {styles} = this.props.environment
    const {name} = this.props.session.supportUser || {}
    return (
      <Block>
        <PageHeader>Hi, {name}</PageHeader>
        <Block style={styles.formWrapper}>
          <Block style={styles.standardMargin}>Which user would you like to help today?</Block>
          <SelectClient />
          <SelectUser />
        </Block>
        <Grid columns={2}>
          <NewClientForm />
          <NewUserForm />
        </Grid>
      </Block>
    )
  }
}
const SupportBody = connect(mapStateToProps)(SupportBodyComponent)

export default SupportBody