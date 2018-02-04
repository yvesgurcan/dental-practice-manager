import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import PageHeader from './../../Web/PageHeader'
import Block from './../../Web/Block'

class HomeComponent extends Component {
  render () {
    const {name} = this.props.session.user
    return (
      <Block>
        <PageHeader>Hello, {name}</PageHeader>
      </Block>
    )  
  }
}
const Home = connect(mapStateToProps)(HomeComponent)

export default Home