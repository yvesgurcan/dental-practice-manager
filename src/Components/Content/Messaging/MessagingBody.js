import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../../Web/Block'

class MessagingBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const MessagingBody = connect(mapStateToProps)(MessagingBodyComponent)

export default MessagingBody