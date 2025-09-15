// components
import MDBox from 'components/MDBox'

import { Grid2 } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import Projects from 'layouts/rtl/components/Projects'
import ReportsLineChartData from 'layouts/rtl/data/reportsLineChartData'
import ReportsBarChartData from 'layouts/rtl/data/reportsBarChartData'
// import NotificationButton from './components/NotificationButton'

import sales from 'layouts/dashboard/data/reportsLineChartData'
import tasks from 'layouts/dashboard/data/reportsLineChartData'
import ReportsLineChart from 'complex-components/Charts/LineCharts/ReportsLineChart'
import reportsBarChartData from 'layouts/rtl/data/reportsBarChartData'

function Dashboard() {
  return (
    <MDBox py={0} mt={-5}>
      {/* <NotificationButton /> */}
      <ToastContainer rtl closeButton closeOnClick containerId="bottomLeft" limit={2} />
      <MDBox mt={4.5}>
          <Grid2 container spacing={3}>
            <Grid2 item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChartData
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid2>
            <Grid2 item xs={12} md={6} lg={4}>
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
            </Grid2>
            <Grid2 item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChartData
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid2>
          </Grid2>
        </MDBox> 
      <MDBox>
        <Grid2 container spacing={3}>
          <Grid2 item xs={12} md={6} lg={8}>
            <Projects />
          </Grid2>
        </Grid2>
      </MDBox>
    </MDBox>
  )
}

export default Dashboard
