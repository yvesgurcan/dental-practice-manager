import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageHeader from './../Components/Web/PageHeader'
import PageWrapper from './../Components/PageWrapper'
import HomeBody from './../Components/Content/Home/HomeBody'

class HomeComponent extends Component {
  render () {
    const {name} = this.props.session.user
    return (
      <PageWrapper>
        <HomeBody />
      </PageWrapper>
    )  
  }
}
const Home = connect(mapStateToProps)(HomeComponent)

export default Home