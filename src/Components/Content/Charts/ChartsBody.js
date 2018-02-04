import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../../Web/Block'

class ChartsBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const ChartsBody = connect(mapStateToProps)(ChartsBodyComponent)

export default ChartsBody