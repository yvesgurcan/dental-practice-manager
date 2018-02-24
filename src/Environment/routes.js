import Schedule from './../Pages/Schedule'
import Appointment from './../Pages/Schedule/Appointment'

import Patients from './../Pages/Patients'
import Patient from './../Pages/Patient'

import Messaging from './../Pages/Messaging'

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
    subroutes: {
      appointments: {
        component: Appointment,
        name: "Appointments",
        url: "/schedule/appointments",
        idRoute: {
          component: Appointment,
          name: "Appointment",
          url: "/schedule/appointments/:appointmentId([1-9]|[0-9]{2,}|new|add)",
        },
      },
    },
    idRoute: {
      component: Schedule,
      name: 'Schedule',
      url: '/schedule/:year(2[0-9][0-9]{2})/:month([1-9]|0[1-9]|1[0-2])/:day([1-9]|0[1-9]|[1-2][0-9]|3[0-1])'
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
  billing: {
    component: Billing,
    name: "Billing",
    url: "/billing",
    permissions: [
      "dentist",
      "headHygienist",
      "officeManager",
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
      'officeManager',
    ],
  },
  userProfile: {
    component: UserLimited,
    name: "User",
    url: "/settings/users/2",
    permissions: [
      "hygienist",
      "assistant",
      "receptionist",
    ],
  },
}

export default routes
