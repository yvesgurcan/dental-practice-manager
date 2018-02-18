import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'

class PatientBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const PatientBody = connect(mapStateToProps)(PatientBodyComponent)

export default PatientBody
