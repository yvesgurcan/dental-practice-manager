// grids
import grid2 from './grid2'
import grid3 from './grid3'
// buttons
import {button, buttonDisabled, buttonHover, buttonClick} from './button'
import {secondaryButton, secondaryButtonDisabled, secondaryButtonHover, secondaryButtonClick} from './secondaryButton'
import {cancelButton, cancelButtonHover, cancelButtonClick} from './cancelButton'
import {dangerButton, dangerButtonDisabled, dangerButtonHover, dangerButtonClick} from './dangerButton'
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
import { dropdown, dropdownDisabled } from './dropdown'
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
    dropdownDisabled,
    dropdownContainer,
    // buttons
    button,
    buttonDisabled,
    buttonHover,
    buttonClick,
    secondaryButton,
    secondaryButtonDisabled,
    secondaryButtonHover,
    secondaryButtonClick,
    cancelButton,
    cancelButtonHover,
    cancelButtonClick,
    dangerButton,
    dangerButtonDisabled,
    dangerButtonHover,
    dangerButtonClick,
    // grid
    ...grid2(viewport),
    ...grid3(viewport),
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