import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../../Web/Block'

class PatientsBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const PatientsBody = connect(mapStateToProps)(PatientsBodyComponent)

export default PatientsBody