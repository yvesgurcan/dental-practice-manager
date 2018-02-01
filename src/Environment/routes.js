import Home from './../Pages/Home'
import Schedule from './../Pages/Schedule'

/* this is where the routes are defined */

const routes = {
  schedule: {
    component: Schedule,
    name: "Schedule",
    url: "/schedule",
    permissions: [
      "dentist",
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
      "accountant",
    ]
  },
}

export default routes