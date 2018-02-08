import React from 'react';
import ReactDOM from 'react-dom'
import { configure } from 'enzyme'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router'

import App from './App';
import PageHeader from './Components/Web/PageHeader'
import SignIn from './Pages/SignIn'
import ForgotPassword from './Pages/ForgotPassword'
import Home from './Pages/Home'
import Settings from './Pages/Settings'
import Support from './Pages/Support'
import SupportBody from './Components/Content/Support/SupportBody'
import PageWrapper from './Components/PageWrapper'

configure({ adapter: new Adapter() })

const dummyHtmlElement = document.createElement('div')

it("App renders without crashing", () => {
  ReactDOM.render(<App />, dummyHtmlElement)
  ReactDOM.unmountComponentAtNode(dummyHtmlElement)
})

it("App shows <SignIn/> when browsing '/'", () => {
  const wrapper = mount(
  <MemoryRouter initialEntries={[ '/' ]}>
    <App/>
  </MemoryRouter>
  )
  expect(wrapper.find(SignIn)).toHaveLength(1)
})