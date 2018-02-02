import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import getRouteDetails from './../Utility/getRouteDetails'
import Block from './Web/Block'
import HorizontalRuler from './Web/HorizontalRuler'
import PageHeader from './Web/PageHeader'

class UnathenticatedPageWrapper extends Component {
  render () {
    return (
      <Block>
        <PageHeader>Dental Practice Manager</PageHeader>
          {this.props.children}
      </Block>
    )  
  }
}

export default UnathenticatedPageWrapper