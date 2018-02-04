import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import HomeBody from './../Components/Content/Home/HomeBody'

class HomeComponent extends Component {
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