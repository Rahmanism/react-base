import { useEffect, useState } from 'react'
// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Link from '@mui/material/Link'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// base styles
import typography from 'assets/theme/base/typography'
import { Consts } from 'common'
import { getFullVersion } from 'common/common'

function Footer({
  company = { href: '/', name: Consts.brand },
  links = [
    // { href: '/', name: Consts.brand },
    { href: '/presentation', name: 'درباره ما' },
  ],
}) {
  const { href, name } = company
  const { size } = typography

  const renderLinks = () =>
    links.map((link) => (
      <MDBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <MDTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </MDTypography>
        </Link>
      </MDBox>
    ))

  const [version, setVersion] = useState()
  useEffect(() => {
    const getVerAsync = async () => {
      const ver = await getFullVersion()
      setVersion(ver)
    }
    getVerAsync()
  }, [])

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: 'column', lg: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}
        <Link href={href} target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </MDTypography>
        </Link>
        <MDTypography variant="span" fontWeight="light" color="text">
          -&nbsp;{version}&nbsp;
        </MDTypography>
      </MDBox>
      <MDBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          listStyle: 'none',
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up('lg')]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </MDBox>
    </MDBox>
  )
}

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(Object),
}

export default Footer
