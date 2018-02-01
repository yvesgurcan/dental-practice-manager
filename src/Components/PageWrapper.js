import React, { Component } from 'react'
import Block from './Web/Block'
import Nav from './Nav'
import HorizontalRuler from './Web/HorizontalRuler'

class PageWrapper extends Component {
  render () {
    return (
      <Block>
        <Nav/>
        <HorizontalRuler/>
        {this.props.children}
      </Block>
    )  
  }
}

export default PageWrapper