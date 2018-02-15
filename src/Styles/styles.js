import {button, buttonHover, buttonClick} from './button'
import {secondaryButton, secondaryButtonHover, secondaryButtonClick} from './secondaryButton'
import block from './block'
import horizontalRuler from './horizontalRuler'
import standardMargin from './standardMargin'
import nav from './nav'
import navItem from './navItem'
import navItemLink from './navItemLink'
import navButton from './navButton'
import { link, linkHover } from './link'
import subNav from './subNav'
import subNavItem from './subNavItem'
import contentWrapper from './contentWrapper'
import publicPage from './publicPage'
import signInForm from './signInForm'
import formWrapper from './formWrapper'
import textbox from './textbox'
import {checkbox, checkboxChecked} from './checkbox'
import dropdown from './dropdown'
import dropdownContainer from './dropdownContainer'
import label from './label'
import error from './error'
import warning from './warning'
import unauthorized from './unauthorized'
import validationError from './validationError'
import success from './success'
import spacer from './spacer'
import forgotPassword from './forgotPassword'
import userList from './userList'

const styles = (viewport) => {
  return ({
    // utility
    standardMargin,
    spacer,
    // web
    block,
    horizontalRuler,
    // input
    label,
    textbox,
    checkbox,
    checkboxChecked,
    dropdown,
    dropdownContainer,
    // buttons
    button,
    buttonHover,
    buttonClick,
    secondaryButton,
    secondaryButtonHover,
    secondaryButtonClick,
    // nav
    ...nav(viewport),
    ...navButton(viewport),
    ...navItem(viewport),
    ...navItemLink(viewport),
    link,
    linkHover,
    // subnav
    ...contentWrapper(viewport),
    ...subNav(viewport),
    subNavItem,
    // feedback
    success,
    error,
    validationError,
    warning,
    unauthorized,
    // forms
    formWrapper,
    signInForm,
    forgotPassword,
    // other
    publicPage,
    userList,
  })
}

export default styles