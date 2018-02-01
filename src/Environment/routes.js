import Home from './../Pages/Home'
import Schedule from './../Pages/Schedule'
import Settings from './../Pages/Settings'
import Users from './../Pages/Settings/Users'

/* this is where the routes are defined */

const routes = {
  schedule: {
    component: Schedule,
    name: "Schedule",
    url: "/schedule",
    permissions: [
      "dentist",
      "officeManager",
      "hygienist",
      "assistant",
      "receptionist",
    ]
  },
  checkIn: {
    component: Home,
    name: "Check In",
    url: "/checkin",
    permissions: [
      "dentist",
      "officeManager",
      "receptionist",
    ]
  },
  xRays: {
    component: Home,
    name: "X-Rays",
    url: "/xrays",
    permissions: [
      "dentist",
      "hygienist",
      "assistant",
    ]
  },
  charts: {
    component: Home,
    name: "Charts",
    url: "/charts",
    permissions: [
      "dentist",
      "hygienist",
      "assistant",
    ]
  },
  billing: {
    component: Home,
    name: "Billing",
    url: "/billing",
    permissions: [
      "dentist",
      "officeManager",
      "accountant",
    ]
  },
  payroll: {
    component: Home,
    name: "Payroll",
    url: "/payroll",
    permissions: [
      "dentist",
      "accountant",
    ]
  },
  settings: {
    component: Settings,
    name: "Settings",
    url: "/settings",
    subroutes: {
      users: {
        component: Users,
        name: "Users",
        url: "/settings/users",
      }
    },
    permissions: [
      "dentist",
    ]
  },
}

export default routes