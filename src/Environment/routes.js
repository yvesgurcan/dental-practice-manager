import Schedule from './../Pages/Schedule'
import Appointment from './../Pages/Appointment'

import Patients from './../Pages/Patients'
import Patient from './../Pages/Patient'

import Messaging from './../Pages/Messaging'

import XRays from './../Pages/Xrays'

import Charts from './../Pages/Charts'

import Billing from './../Pages/Billing'

import TimeTracking from './../Pages/TimeTracking'

import Settings from './../Pages/Settings'
import SettingNotFound from './../Pages/Settings/SettingNotFound'
import ScheduleBoundaries from './../Pages/Settings/ScheduleBoundaries'
import Users from './../Pages/Settings/Users'
import User from './../Pages/Settings/User'
import UserLimited from './../Pages/Settings/UserLimited'
import Operatories from './../Pages/Settings/Operatories'
import Operatory from './../Pages/Settings/Operatory'

/*
  this is where the routes are defined
  to create a new route, use the following template inside the routes object:
  {
    component: MyComponent,
    name: "",
    url: "/route",
    permissions: ["userRole1", "userRole2"] || undefined,
    subroutes: {
      subroute1: {
        component: MyOtherComponent,
        name: "",
        url: "/route/subroute",
        idRoute: {
          component: MyIdSubrouteComponent,
          name: "",
          url: "/route/subroute/:id",
        },
      },
    },
    idRoute: {
      component: MyIdRouteComponent,
      name: "",
      url: "/route/:id",
    },
  },
*/

const routes = {
  schedule: {
    component: Schedule,
    name: "Schedule",
    url: "/schedule",
    permissions: [
      "dentist",
      "headHygienist",
      "officeManager",
      "hygienist",
      "assistant",
      "receptionist",
    ],
    idRoute: {
      component: Appointment,
      name: 'Appointment',
      url: '/schedule/:appointmentId([1-9]|[0-9]{2,}|new|add)'
    },
  },
  patients: {
    component: Patients,
    name: "Patients",
    url: "/patients",
    permissions: [
      "dentist",
      "headHygienist",
      "officeManager",
      "hygienist",
      "assistant",
      "receptionist",
    ],
    idRoute: {
      component: Patient,
      name: "Patient",
      url: "/patients/:patientId([1-9]|[0-9]{2,}|new|add)",
    },
  },
  xRays: {
    component: XRays,
    name: "X-Rays",
    url: "/xrays",
    permissions: [
      "dentist",
      "headHygienist",
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
      "headHygienist",
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
      "headHygienist",
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
      "headHygienist",
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
      "headHygienist",
      "officeManager",
      "hygienist",
      "assistant",
    ],
  },
  settings: {
    component: Settings,
    notFoundComponent: SettingNotFound,
    name: "Settings",
    url: "/settings",
    subroutes: {
      scheduleBoundaries: {
        component: ScheduleBoundaries,
        name: "Schedule",
        url: "/settings/schedule",
      },
      users: {
        component: Users,
        name: "Users",
        url: "/settings/users",
        idRoute: {
          component: User,
          name: "New User",
          url: "/settings/users/:userId([1-9]|[0-9]{2,}|new|add)",          
        },
      },
      operatories: {
        component: Operatories,
        name: "Operatories",
        url: "/settings/operatories",
        idRoute: {
          component: Operatory,
          name: "New Operatory",
          url: "/settings/operatories/:operatoryId([1-9]|[0-9]{2,}|new|add)",          
        },
      },
    },
    permissions: [
      "dentist",
      "headHygienist",
    ],
  },
  userProfile: {
    component: UserLimited,
    name: "User",
    url: "/settings/users/2",
    permissions: [
      "officeManager",
      "hygienist",
      "assistant",
      "receptionist",
      "accountant",
    ],
  },
}

export default routes
