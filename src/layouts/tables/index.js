// @mui material components
import { Grid } from '@mui/material/Grid'
import Card from '@mui/material/Card'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

import DataTable from 'complex-components/Tables/DataTable'

// Data
import authorsTableData from 'layouts/tables/data/authorsTableData'
import projectsTableData from 'layouts/tables/data/projectsTableData'

function Tables() {
  const { columns, rows } = authorsTableData()
  const { columns: pColumns, rows: pRows } = projectsTableData()

  return (
    <Grid container spacing={6}>
      <Grid size={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              لاگ دسترسی درها
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </Grid>
      <Grid size={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Projects Table
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns: pColumns, rows: pRows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Tables
