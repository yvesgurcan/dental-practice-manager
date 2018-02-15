import {button, buttonHover, buttonClick} from './button'
import {secondaryButton, secondaryButtonHover, secondaryButtonClick} from './secondaryButton'
import block from './block'
import horizontalRuler from './horizontalRuler'
import standardMargin from './standardMargin'
import nav from './nav'
import navItem from './navItem'
import navItemLink from './navItemLink'
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
    button,
    buttonHover,
    buttonClick,
    secondaryButton,
    secondaryButtonHover,
    secondaryButtonClick,
    block,
    standardMargin,
    horizontalRuler,
    ...nav(viewport),
    navItem,
    navItemLink,
    link,
    linkHover,
    subNav,
    subNavItem,
    contentWrapper,
    publicPage,
    textbox,
    checkbox,
    checkboxChecked,
    dropdown,
    dropdownContainer,
    label,
    signInForm,
    formWrapper,
    error,
    warning,
    unauthorized,
    validationError,
    success,
    spacer,
    forgotPassword,
    userList,
  })
}

export default styles