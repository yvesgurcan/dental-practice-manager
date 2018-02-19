import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import getRouteDetails from './../Utility/getRouteDetails'
import Block from './Web/Block'
import PageHeader from './Web/PageHeader'
import Nav from './Nav/Nav'
import NavButton from './Nav/NavButton'
import Feedback from './Feedback'
import ContentWrapper from './ContentWrapper'

class PageWrapperComponent extends Component {
  setWindowTitle = (title) => {
    let fullTitle = title
    const { client } = this.props.session || {}
    if (client && client.name) {
      fullTitle += ` - ${client.name}`
    }
    
    const { software } = this.props.environment || {}
    fullTitle += ` - ${software.name}`
    if (document.title !== fullTitle) {
      document.title = fullTitle
    }
    
  }
  render () {
    const { styles } = this.props.environment
    const {path} = this.props.routeData || {}
    const {environment, route, menuRoute, notFound, pageTitle} = this.props
    const {viewport, routes, showNav} = environment
    const routeDetails = getRouteDetails(routes, route || path)
    const pageHeader = pageTitle || (routeDetails || {}).name
    this.setWindowTitle(pageHeader)
    const subRoutes = getRouteDetails(routes, menuRoute, "subroutes")
    const subRouteHome = getRouteDetails(routes, menuRoute)
    return (
      <Block>
        <NavButton />
        {viewport.menu && !showNav ? null : <Nav/>}
        <ContentWrapper menu={subRoutes} subRouteHome={subRouteHome}>
          <Block style={styles.spacer}>
            <Feedback feedback={{status: "error", message: notFound}} />
          </Block>
          <PageHeader>{pageHeader}</PageHeader>
          {this.props.children}
        </ContentWrapper>
      </Block>
    )  
  }
}
const PageWrapper = connect(mapStateToProps)(PageWrapperComponent)

export default PageWrapper
