import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import HomeBody from './../Components/Bodies/HomeBody'

class HomeComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper>
        <HomeBody />
      </PageWrapper>
    )  
  }
}
const Home = connect(mapStateToProps)(HomeComponent)

export default Home