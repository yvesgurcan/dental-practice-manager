// utility
import alignLeft from './alignLeft'
import alignRight from './alignRight'
import alignCenter from './alignCenter'
// grids
import container from './container'
import grid2 from './grid2'
import mobileGrid2 from './mobileGrid2'
import grid3 from './grid3'
import grid4 from './grid4'
import grid5 from './grid5'
import grid12 from './grid12'
import scheduleGrid from './scheduleGrid'
import shiftUpperNavGrid from './shiftUpperNavGrid'
import shiftNavGrid from './shiftNavGrid'
import shiftGrid from './shiftGrid'
import column2 from './column2'
import column3 from './column3'
import column4 from './column4'
// buttons
import {button, buttonDisabled, buttonHover, buttonClick} from './button'
import {secondaryButton, secondaryButtonDisabled, secondaryButtonHover, secondaryButtonClick} from './secondaryButton'
import {cancelButton, cancelButtonHover, cancelButtonClick} from './cancelButton'
import {dangerButton, dangerButtonDisabled, dangerButtonHover, dangerButtonClick} from './dangerButton'
import readOnlyField from './readOnlyField'
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
// schedule
import appointmentScheduleCard from './appointmentScheduleCard'
import timeSlots from './timeSlots'
import timeSlot from './timeSlot'
import timeSlotHorizontalLine from './timeSlotHorizontalLine'
// time tracking
import selectedDay from './selectedDay'
import timerContainer from './timerContainer'
import timer from './timer'
import mobileDailyTotal from './mobileDailyTotal'

const styles = (viewport) => {
  return ({
    // utility
    standardMargin,
    spacer,
    ...alignLeft(viewport),
    ...alignRight(viewport),
    ...alignCenter(viewport),
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
    ...readOnlyField(viewport),
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
    ...container(viewport),
    ...grid2(viewport),
    ...mobileGrid2(viewport),
    ...grid3(viewport),
    ...grid4(viewport),
    ...grid12(viewport),
    ...grid5(viewport),
    ...scheduleGrid(viewport),
    // columns
    ...column2(viewport),
    ...column3(viewport),
    ...column4(viewport),
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
    // public page
    publicPage,
    // user settings
    userList,
    // schedule
    ...timeSlots(viewport),
    ...timeSlot(viewport),
    ...timeSlotHorizontalLine(viewport),
    ...appointmentScheduleCard(viewport),
    // timetracking
    ...shiftUpperNavGrid(viewport),
    ...shiftNavGrid(viewport),
    ...shiftGrid(viewport),
    ...selectedDay(viewport),
    ...timerContainer(viewport),
    ...timer(viewport),
    ...mobileDailyTotal(viewport),
  })
}

export default styles