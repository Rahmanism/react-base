import { lazy, useState } from 'react'

// components
import MDBox from 'components/MDBox'

import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
import { useMaterialUIController } from 'context'
import { ToastContainer } from 'react-toastify'
// import NotificationButton from './components/NotificationButton'

const AllDevicesRTLogCards = lazy(
  () => import('./components/AllDevicesRTLog/AllDevicesRTLogCards')
)
const AllDevicesRTLogGrid = lazy(
  () => import('./components/AllDevicesRTLog/AllDevicesRTLogGrid')
)
const DashboardMap = lazy(() => import('./components/Map/DashboardMap'))

function Dashboard() {
  const [controller] = useMaterialUIController()
  const { userRole } = controller
  const [showActiveTab, setShowActiveTab] = useState(
    userRole === 1 ? 'map' : 'cards'
  )

  const changeActiveTab = (tab) => {
    setShowActiveTab(tab)
  }

  return (
    <MDBox py={0} mt={-5}>
      <MDBox pt={0} pb={3}>
        {userRole === 1 && (
          <MDButton
            onClick={() => changeActiveTab('map')}
            style={{ marginLeft: '.5rem' }}
            color="primary"
            variant={showActiveTab === 'map' ? 'contained' : 'outlined'}
          >
            <Icon fontSize="small" style={{ marginLeft: '.3rem' }}>
              place
            </Icon>
            نمای نقشه
          </MDButton>
        )}
        <MDButton
          onClick={() => changeActiveTab('cards')}
          style={{ marginLeft: '.5rem' }}
          color="primary"
          variant={showActiveTab === 'cards' ? 'contained' : 'outlined'}
        >
          <Icon fontSize="small" style={{ marginLeft: '.3rem' }}>
            subtitles
          </Icon>
          نمای کارت
        </MDButton>
        <MDButton
          onClick={() => changeActiveTab('grid')}
          style={{ marginLeft: '.5rem' }}
          color="primary"
          variant={showActiveTab === 'grid' ? 'contained' : 'outlined'}
        >
          <Icon fontSize="small" style={{ marginLeft: '.3rem' }}>
            view_headline
          </Icon>
          نمای جدول
        </MDButton>
      </MDBox>
      {/* <NotificationButton /> */}
      {showActiveTab === 'map' && <DashboardMap />}
      {showActiveTab === 'grid' && <AllDevicesRTLogGrid />}
      {showActiveTab === 'cards' && <AllDevicesRTLogCards />}
      <ToastContainer rtl closeButton closeOnClick containerId="bottomLeft" limit={2} />
      {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> 
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
        </Grid>
      </MDBox> */}
    </MDBox>
  )
}

export default Dashboard
