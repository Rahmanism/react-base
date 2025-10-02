import { useState, useEffect, useMemo, Suspense, lazy } from 'react'

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// @mui material components
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// example components
import Sidenav from 'complex-components/Sidenav'
import Configurator from 'complex-components/Configurator'

// themes
// import theme from 'assets/theme'
import themeRTL from 'assets/theme/theme-rtl'

// dark mode themes
// import themeDark from 'assets/theme-dark'
import themeDarkRTL from 'assets/theme-dark/theme-rtl'

// rtl plugins
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// routes
import routes, { publicRoutes } from 'routes'

// context
import { useMaterialUIController, setMiniSidenav } from 'context'

// Images
import brandWhite from 'assets/images/logo-ct.png'
import brandDark from 'assets/images/logo-ct-dark.png'

// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Consts } from 'common'
import BaseLayout from 'layouts/baseLayout'

const Loading = lazy(() => import('components/Loading'))

const SignInPage = lazy(() => import('layouts/authentication/sign-in'))

export default function App() {
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    direction,
    layout,
    // openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller
  const [onMouseEnter, setOnMouseEnter] = useState(false)
  const [rtlCache, setRtlCache] = useState(null)
  const { pathname } = useLocation()

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [rtlPlugin],
    })

    setRtlCache(cacheRtl)
  }, [])

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator)

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  // TODO: move this to PrivateRoute component
  // const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = () => localStorage.getItem('token')?.length > 0

  const signInRoute = '/authentication/sign-in'
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        )
      }

      return null
    })

  const configsButton = (
    <>&nbsp;</>
    // <MDBox
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   width="3.25rem"
    //   height="3.25rem"
    //   bgColor="white"
    //   shadow="sm"
    //   borderRadius="50%"
    //   position="fixed"
    //   right="2rem"
    //   bottom="2rem"
    //   zIndex={99}
    //   color="dark"
    //   sx={{ cursor: 'pointer' }}
    //   onClick={handleConfiguratorOpen}
    // >
    //   <Icon fontSize="small" color="inherit">
    //     settings
    //   </Icon>
    // </MDBox>
  )

  const returnValue = () => {
    let result
    if (!isAuthenticated()) {
      if (location.pathname !== signInRoute) {
        return <Navigate to={signInRoute} />
      }
      result = <SignInPage />
    } else {
      result = (
        <BaseLayout>
          <Suspense fallback={<Loading />}>
            {layout === 'dashboard' && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={
                    (transparentSidenav && !darkMode) || whiteSidenav
                      ? brandDark
                      : brandWhite
                  }
                  brandName={Consts.brand}
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === 'vr' && <Configurator />}
            <Routes>
              {isAuthenticated() && getRoutes(routes)}
              {isAuthenticated() && (
                <Route path="*" element={<Navigate to="/dashboard" />} />
              )}
              {!isAuthenticated() && getRoutes(publicRoutes)}
            </Routes>
          </Suspense>
        </BaseLayout>
      )
    }

    return (
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
          <CssBaseline />
          <ToastContainer rtl closeButton closeOnClick />
          {result}
        </ThemeProvider>
      </CacheProvider>
    )
  }

  // return direction === 'rtl' ? (
  return returnValue()
  /* ) : (
    // Do the same above for the following
     <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <ToastContainer />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName={Consts.brand}
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
   ) */
}
