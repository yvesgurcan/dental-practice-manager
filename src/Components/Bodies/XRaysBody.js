import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'

class XRaysBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const XRaysBody = connect(mapStateToProps)(XRaysBodyComponent)

export default XRaysBody