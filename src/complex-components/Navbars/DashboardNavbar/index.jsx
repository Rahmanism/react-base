import { useState, useEffect } from 'react'

// react-router components
import { useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @material-ui core components
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Icon from '@mui/material/Icon'

// components
import MDBox from 'components/MDBox'

// example components
import Breadcrumbs from 'complex-components/Breadcrumbs'
import NotificationItem from 'complex-components/Items/NotificationItem'

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from 'complex-components/Navbars/DashboardNavbar/styles'

// context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  // setOpenConfigurator,
} from 'context'
import { goto } from 'common/common'
import routes from 'routes'
import { Tooltip } from '@mui/material'
import theme from 'assets/theme'

function DashboardNavbar({ absolute = false, light = false, isMini = false }) {
  const [navbarType, setNavbarType] = useState()
  const [controller, dispatch] = useMaterialUIController()
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller
  // const { openConfigurator } = controller
  const [openMenu, setOpenMenu] = useState(false)
  const route = useLocation().pathname.split('/').slice(1)

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      )
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar)

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav)
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator)
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget)
  const handleCloseMenu = () => setOpenMenu(false)

  // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'left',
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem
  //       icon={<Icon>email</Icon>}
  //       title="پیام‌های جدید را بررسی کنید."
  //     />
  //   </Menu>
  // )

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main
      }

      return colorValue
    },
  })

  // const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    goto('/authentication/sign-in')
    // navigate('/authentication/sign-in', { replace: true })
    return true
  }

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon sx={iconsStyle} fontSize="medium">
              {miniSidenav ? 'menu_open' : 'menu'}
            </Icon>
          </IconButton>
          <Breadcrumbs
            icon="home"
            title={
              routes?.filter((r) => r.key === route[route.length - 1])[0]?.name
            }
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput label="جستجو" />
            </MDBox> */}
            <MDBox color={light ? 'white' : 'inherit'}>
              {/* <Link to="/authentication/sign-in/basic"> */}
              <Tooltip title="خروج">
                <IconButton
                  sx={() => navbarIconButton(theme, "1.7rem")}
                  disableRipple
                  onClick={logout}
                >
                  <Icon sx={iconsStyle}>logout</Icon>
                </IconButton>
              </Tooltip>
              {/* </Link> */}
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton> */}
              {/* renderMenu() */}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  )
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
}

export default DashboardNavbar
