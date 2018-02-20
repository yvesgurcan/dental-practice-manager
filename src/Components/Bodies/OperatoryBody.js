import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../../Components/Web/Block'

class OperatoryBodyComponent extends Component {
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
    // const { styles } = this.props.environment || {}
    // const { operatories, maxOperatories } = this.props.settings || {}
    return (
    <Block>
    </Block>
    )  
  }
}
const OperatoryBody = connect(mapStateToProps)(OperatoryBodyComponent)

export default OperatoryBody
