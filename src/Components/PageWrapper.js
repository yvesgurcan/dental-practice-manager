import React, { Component } from 'react'
import Block from './Web/Block'
import HorizontalRuler from './Web/HorizontalRuler'
import PageHeader from './Web/PageHeader'
import Nav from './Nav'

class PageWrapper extends Component {
  render () {
    return (
      <Block>
        <Nav/>
        <HorizontalRuler/>
        <PageHeader>{this.props.pageTitle}</PageHeader>
        <Block>
          {this.props.children}
        </Block>
      </Block>
    )  
  }
}

export default PageWrapper