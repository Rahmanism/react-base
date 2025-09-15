// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Grid from '@mui/material/Grid'

// components
import MDBox from 'components/MDBox'
// import MDTypography from "components/MDTypography";

// example components
import DefaultNavbar from 'complex-components/Navbars/DefaultNavbar'
import PageLayout from 'complex-components/LayoutContainers/PageLayout'

// Authentication layout components
import Footer from 'layouts/authentication/components/Footer'
import { Consts } from 'common'

function CoverLayout({ coverHeight = '35vh', image, children }) {
  return (
    <PageLayout>
      <DefaultNavbar
        action={{
          type: 'external',
          route: '/',
          label: Consts.brand,
        }}
        transparent
        light
      />
      <MDBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.4),
              rgba(gradients.dark.state, 0.4)
            )}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <MDBox
        mt={{ xs: -20, lg: -18 }}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid size={{xs: 11, sm: 9, md: 5, lg: 4, xl: 3 }}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  )
}

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default CoverLayout
