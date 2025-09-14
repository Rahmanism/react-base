/**
  All of the routes for the project are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav.
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

import { lazy } from 'react'

// @mui icons
import Icon from '@mui/material/Icon'

// layouts
// const BaseLayout = lazy(() => import('layouts/baseLayout'))
const Dashboard = lazy(() => import('layouts/dashboard'))
// const Tables = lazy(() => import('layouts/tables'))
// const Billing = lazy(() => import('layouts/billing'))
// const RTL = lazy(() => import('layouts/rtl'))
const Notifications = lazy(() => import('layouts/notifications'))
// const Profile = lazy(() => import('layouts/profile'))
const SignIn = lazy(() => import('layouts/authentication/sign-in'))
const SignUp = lazy(() => import('layouts/authentication/sign-up'))
const Users = lazy(() => import('layouts/users'))
const Configuration = lazy(() => import('layouts/configuration'))

const routes = [
  {
    type: 'collapse',
    name: 'داشبورد',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'کاربران',
    key: 'users',
    icon: <Icon fontSize="small">group</Icon>,
    route: '/users',
    component: <Users />,
    // component: <BaseLayout><Users /></BaseLayout>,
  },
  {
    type: 'collapse',
    name: 'اعلان‌ها',
    key: 'notifications',
    icon: <Icon fontSize="small">notifications</Icon>,
    route: '/notifications',
    component: <Notifications />,
  },
  {
    type: 'collapse',
    name: 'تنظیمات',
    key: 'configuration',
    icon: <Icon fontSize="small">tune</Icon>,
    route: '/configuration',
    component: <Configuration />,
  },
]

export const publicRoutes = [
  {
    name: 'ورود',
    key: 'sign-in',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    name: 'ثبت نام',
    key: 'sign-up',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
]

export default routes
