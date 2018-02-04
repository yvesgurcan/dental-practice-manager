import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import ChartsBody from './../Components/Content/Charts/ChartsBody'

class ChartsComponent extends Component {
  render () {
    return (
      <PageWrapper route="/charts" menuRoute="/charts">
        <ChartsBody />
      </PageWrapper>
    )  
  }
}
const Charts = connect(mapStateToProps)(ChartsComponent)

export default Charts
