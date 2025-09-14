// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// base styles
import typography from 'assets/theme/base/typography'

import { Consts } from 'common'
import { getFullVersion } from 'common/common'
import { useEffect, useState } from 'react'

function Footer({ light = false }) {
  const { size } = typography
  const [version, setVersion] = useState()

  useEffect(() => {
    const getVerAsync = async () => {
      const ver = await getFullVersion()
      setVersion(ver)
    }
    getVerAsync()
  }, [])

  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
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
            color={light ? 'white' : 'text'}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}
            <Link href="/" target="_blank">
              <MDTypography
                variant="button"
                fontWeight="medium"
                color={light ? 'white' : 'dark'}
              >
                &nbsp;{Consts.brand}&nbsp;
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
            {/* <MDBox component="li" pr={2} lineHeight={1}>
              <Link href="/" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  {Consts.brand}
                </MDTypography>
              </Link>
            </MDBox> */}
            <MDBox component="li" px={2} lineHeight={1}>
              <Link href="/presentation" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  {Consts.brand}
                </MDTypography>
              </Link>
            </MDBox>
          </MDBox>
        </MDBox>
      </Container>
    </MDBox>
  )
}

// Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool,
}

export default Footer
