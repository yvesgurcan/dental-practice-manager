import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './Store/store'
import mapStateToProps from './Store/mapStateToProps'
import checkUserPermissions from './Utility/checkUserPermissions'
import Home from './Pages/Home'

const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

class AppComponent extends Component {
  render () {
    let {environment, session} = this.props
    let {routes} = environment
    let {user} = session
    return (
      <Router>
        <Switch>
          {
            checkUserPermissions(routes, user).map(route => <Route key={routes[route].url} path={routes[route].url} component={routes[route].component} />)
          }
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    )
  }
}
const App = connect(mapStateToProps)(AppComponent)

export default Root
