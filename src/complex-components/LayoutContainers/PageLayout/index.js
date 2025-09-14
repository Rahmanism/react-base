import { useEffect } from 'react'

// react-router-dom components
import { useLocation } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// components
import MDBox from 'components/MDBox'

// context
import { useMaterialUIController, setLayout } from 'context'

function PageLayout({ background = 'default', children }) {
  const [, dispatch] = useMaterialUIController()
  const { pathname } = useLocation()

  useEffect(() => {
    setLayout(dispatch, 'page')
  }, [pathname])

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: 'hidden' }}
    >
      {children}
    </MDBox>
  )
}

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(['white', 'light', 'default']),
  children: PropTypes.node.isRequired,
}

export default PageLayout
