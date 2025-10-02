// components
import MDBox from 'components/MDBox'

import Grid from '@mui/material/Grid'
import { ToastContainer } from 'react-toastify'
import Projects from 'layouts/rtl/components/Projects'
import ReportsLineChartData from 'layouts/dashboard/data/reportsLineChartData'
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData'
import ReportsBarChartData from 'complex-components/Charts/BarCharts/ReportsBarChart'
// import NotificationButton from './components/NotificationButton'

import sales from 'layouts/dashboard/data/reportsLineChartData'
import tasks from 'layouts/dashboard/data/reportsLineChartData'
import ReportsLineChart from 'complex-components/Charts/LineCharts/ReportsLineChart'
import NotificationButton from './components/NotificationButton'

function Dashboard() {
  return (
    <MDBox py={0} mt={-5}>
      <NotificationButton />
      <ToastContainer rtl closeButton closeOnClick containerId="bottomLeft" limit={2} />
      <MDBox mt={4.5}>
        {/* <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <MDBox mb={3}>
              <ReportsBarChartData
                color="info"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
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
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <MDBox mb={3}>
              <ReportsLineChartData
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid> */}
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <Projects />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  )
}

export default Dashboard
