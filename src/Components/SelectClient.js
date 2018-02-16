import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformArrayIntoOptions from './../Utility/transformArrayIntoOptions'
import FormGroup from './Web/Input/FormGroup'

class SelectClientComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      'get',
      'clients',
      {},
      this.props.session,
      this.storeAllClients,
    )
  }

  storeAllClients = (response) => {
    this.props.dispatch({ type: 'STORE_ALL_CLIENTS', clients: response.clients })
  }

  selectClient = (client) => {

    this.props.dispatch({ type: 'USERS_LOADING'})
    this.props.dispatch({ type: 'SELECT_CLIENT', client: client.object, callback: (state) => this.getEnvironment(state) })
    this.props.dispatch({ type: "SET_LOCALSTORAGE_CLIENT", client: { ...client.object } })
    this.props.dispatch({ type: "REMOVE_LOCALSTORAGE_USER" })
  }

  getEnvironment = (state) => {
    this.getSettings(state)
    this.getUsers(state)
  }

  getSettings = (state) => {
    apiRequestHandler(
      'get',
      'settings',
      {},
      state,
      this.storeSettings,
    )
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  getUsers = (state) => {
    apiRequestHandler(
      'get',
      'users',
      {},
      state,
      this.storeUsers,
    )
  }

  storeUsers = (response) => {
    this.props.dispatch({ type: 'STORE_USERS', users: [ ...response.users ] })
    this.props.dispatch({ type: 'USERS_LOADED'})
  }
  
  render () {
    const {clients} = this.props.support || {}
    const {client} = this.props.session || {}
    const clientOptions = transformArrayIntoOptions(clients, {value: "clientId", label: "name"})
    return (
      <FormGroup
        label="Client"
        name="client"
        value={(client || {}).clientId}
        placeholder='Select Client'
        options={clientOptions}
        onChange={this.selectClient}
      />
    )  
  }
}
const SelectClient = connect(mapStateToProps)(SelectClientComponent)

export default SelectClient