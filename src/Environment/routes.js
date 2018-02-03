import Schedule from './../Pages/Schedule'

import Messaging from './../Pages/Messaging'

import XRays from './../Pages/Xrays'

import Charts from './../Pages/Charts'

import Billing from './../Pages/Billing'

import TimeTracking from './../Pages/TimeTracking'

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
    ],
  },
  xRays: {
    component: XRays,
    name: "X-Rays",
    url: "/xrays",
    permissions: [
      "dentist",
      "hygienist",
      "assistant",
    ],
  },
  charts: {
    component: Charts,
    name: "Charts",
    url: "/charts",
    permissions: [
      "dentist",
      "hygienist",
      "assistant",
    ]
  },
  billing: {
    component: Billing,
    name: "Billing",
    url: "/billing",
    permissions: [
      "dentist",
      "officeManager",
      "accountant",
    ],
  },
  messaging: {
    component: Messaging,
    name: "Messaging",
    url: "/messaging",
    permissions: [
      "dentist",
      "officeManager",
      "hygienist",
      "assistant",
      "receptionist",
    ],
  },
  timeTracking: {
    component: TimeTracking,
    name: "Time Tracking",
    url: "/timetracking",
    permissions: [
      "dentist",
      "officeManager",
      "hygienist",
      "assistant",
    ],
  },
  settings: {
    component: Settings,
    name: "Settings",
    url: "/settings",
    subroutes: {
      account: {
        component: Users,
        name: "Your Practice",
        url: "/settings/account",
      },
      users: {
        component: Users,
        name: "Users",
        url: "/settings/users",
      },
    },
    permissions: [
      "dentist",
    ],
  },
}

export default routes