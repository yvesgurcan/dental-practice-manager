import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../../Web/Block'

class BillingBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const BillingBody = connect(mapStateToProps)(BillingBodyComponent)

export default BillingBody