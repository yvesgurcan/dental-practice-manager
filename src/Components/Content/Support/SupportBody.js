import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import apiRequestHandler from './../../../Utility/apiRequestHandler'
import PageHeader from './../../Web/PageHeader'
import Block from './../../Web/Block'
import Dropdown from './../../Web/Input/Dropdown'
import Feedback from './../../Feedback'

class SupportBodyComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      'get',
      'clients',
      {},
      this.props.session,
      this.storeAllClients,
    )
    
    const {client} = this.props.session || {}
    if (client) {
      apiRequestHandler(
        'get',
        'users',
        {},
        this.props.session,
        this.storeUsers,
      )
    }

  }
  storeAllClients = (response) => {
    this.props.dispatch({ type: 'STORE_ALL_CLIENTS', clients: response.clients })
  }
  selectClient = (client) => {

    this.props.dispatch({ type: 'USERS_LOADING'})
    this.props.dispatch({ type: 'SELECT_CLIENT', client: client.object, callback: (state) => this.getUsers(state) })
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
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
    this.props.dispatch({ type: 'USERS_LOADED'})
  }
  selectUser = (user) => {
    this.props.dispatch({ type: 'SELECT_USER', user: user.object })
  }
  render () {
    const {name} = this.props.session.supportUser || {}
    const {clients, loadingUsers} = this.props.support || {}
    const {client} = this.props.session || {}
    const {users} = this.props.settings || {}
    const {user} = this.props.session || {}
    const clientOptions = (clients || []).map(client => ({value: client.clientId, label: client.name, object: client}))
    const userOptions = (users || []).map(user => ({value: user.userId, label: user.name, object: user}))
    return (
      <Block>
        <PageHeader>Hi, {name}</PageHeader>
        <Block>
          <Dropdown name='client' value={(client || {}).clientId} placeholder='Select Client' options={clientOptions} onChange={this.selectClient} />
        </Block>
        <Block hidden={!(client || {}).clientId}>
          <Dropdown name='user' value={(user || {}).userId} placeholder='Select User' options={userOptions} onChange={this.selectUser} />
          <Feedback hidden={loadingUsers || !users || users.length > 0} feedback={{status: 'warning', message: 'No user were found for this client.'}}/>
        </Block>
      </Block>
    )  
  }
}
const SupportBody = connect(mapStateToProps)(SupportBodyComponent)

export default SupportBody