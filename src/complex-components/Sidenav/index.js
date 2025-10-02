import { useEffect } from 'react'

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @mui material components
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Icon from '@mui/material/Icon'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// example components
import SidenavCollapse from 'complex-components/Sidenav/SidenavCollapse'

// Custom styles for the Sidenav
import SidenavRoot from 'complex-components/Sidenav/SidenavRoot'
import sidenavLogoLabel from 'complex-components/Sidenav/styles/sidenav'

// context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from 'context'

function Sidenav({ color = 'info', brand = '', brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController()
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller
  // const { sidenavColor } = controller
  const location = useLocation()
  const collapseName = location.pathname.replace('/', '')

  let textColor = 'white'

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark'
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit'
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true)

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200)
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      )
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav)
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener('resize', handleMiniSidenav)

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleMiniSidenav)
  }, [dispatch, location])

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route }) => {
      if (type === 'hidden') return null

      switch (type) {
        case 'collapse':
          return href ? (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </Link>
          ) : (
            <NavLink key={key} to={route}>
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
              />
            </NavLink>
          )
        case 'title':
          return (
            <MDTypography
              key={key}
              color={textColor}
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              pl={3}
              mt={2}
              mb={1}
              ml={1}
            >
              {title}
            </MDTypography>
          )
        case 'divider':
          return (
            <Divider
              key={key}
              light={
                (!darkMode && !whiteSidenav && !transparentSidenav) ||
                (darkMode && !transparentSidenav && whiteSidenav)
              }
            />
          )
        default:
          return null
      }
    }
  )

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <MDBox component="img" src={brand} alt="Brand" width="2rem" />
          )}
          <MDBox
            width={!brandName && '100%'}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  )
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(Object).isRequired,
}

export default Sidenav
