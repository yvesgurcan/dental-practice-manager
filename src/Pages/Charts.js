import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import ChartsBody from './../Components/Content/Charts/ChartsBody'

class ChartsComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute="/charts">
        <ChartsBody />
      </PageWrapper>
    )  
  }
}
const Charts = connect(mapStateToProps)(ChartsComponent)

export default Charts
