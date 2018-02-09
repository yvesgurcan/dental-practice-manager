import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformArrayIntoOptions from './../Utility/transformArrayIntoOptions'
import Block from './Web/Block'
import Dropdown from './Web/Input/Dropdown'
import Feedback from './Feedback'

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
    this.props.dispatch({ type: 'SELECT_CLIENT', client: client.object, callback: (state) => this.getUsers(state) })
    this.props.dispatch({ type: "SET_LOCALSTORAGE_CLIENT", client: { ...client.object } })
    this.props.dispatch({ type: "REMOVE_LOCALSTORAGE_USER" })
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
    const {name} = this.props.session.supportUser || {}
    const {clients, loadingUsers} = this.props.support || {}
    const {client} = this.props.session || {}
    const clientOptions = transformArrayIntoOptions(clients, {value: "clientId", label: "name"})
    return (
      <Block>
        <Block>
          <Dropdown name='client' value={(client || {}).clientId} placeholder='Select Client' options={clientOptions} onChange={this.selectClient} />
        </Block>
      </Block>
    )  
  }
}
const SelectClient = connect(mapStateToProps)(SelectClientComponent)

export default SelectClient