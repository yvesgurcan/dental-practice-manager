import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../../Components/Web/Block'
import Text from './../../Components/Web/Text'
import Label from './../../Components/Web/Label'
import RouteLink from './../../Components/RouteLink'

class OperatoriesBodyComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      'get',
      'settings',
      {},
      this.props.session,
      this.storeSettings,
    )
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  render () {
    const { styles } = this.props.environment || {}
    const { operatories, maxOperatories } = this.props.settings || {}
    return (
    <Block>
        <Block style={styles.standardMargin}>
          <Label>Operatories:</Label>
          {" "}
          <Text>{(operatories || []).length}/{maxOperatories || 0}</Text>
        </Block>
        {(operatories || []).map(operatory => {
          return (
            <Block key={operatory.operatoryId} style={styles.userList}>
            <RouteLink to={`/settings/operatories/${operatory.operatoryId}`}>{operatory.name}</RouteLink>
          </Block>
          )
        })}
        <Block style={styles.userList}>
          <RouteLink to={`/settings/operatories/new`}>Add Operatory</RouteLink>
        </Block>
    </Block>
    )  
  }
}
const OperatoriesBody = connect(mapStateToProps)(OperatoriesBodyComponent)

export default OperatoriesBody
