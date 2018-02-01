import React, { Component } from 'react'
import Block from './Web/Block'
import Nav from './Nav'

class PageWrapper extends Component {
  render () {
    return (
      <Block>
        <Nav/>
        {this.props.children}
      </Block>
    )  
  }
}

export default PageWrapper