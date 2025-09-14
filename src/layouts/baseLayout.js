// components
import MDBox from 'components/MDBox'

import DashboardLayout from 'complex-components/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'complex-components/Navbars/DashboardNavbar'
import Footer from 'complex-components/Footer'

export default function BaseLayout(options) {
  const { children } = options

  return (
    <DashboardLayout>
      {/* <DashboardNavbar absolute isMini /> */}
      <DashboardNavbar />
      <MDBox pt={6} pb={3} style={{ flex: '1' }}>
        {children}
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}
