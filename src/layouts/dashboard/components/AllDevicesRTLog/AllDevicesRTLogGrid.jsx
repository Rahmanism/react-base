import { Card, CardContent, CardHeader } from '@mui/material'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'
import Loading from 'components/Loading'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import { useState } from 'react'
import useDashboardData from '../useDashboardData'

function AllDevicesRTLogGrid() {
  const [rows, setRows] = useState([])
  const columns = [
    { headerName: 'دستگاه', field: 'deviceName', flex: 1, maxWidth: 300 },
    { headerName: 'شماره کارت', field: 'cardId', flex: 1, maxWidth: 100 },
    { headerName: 'کاربر', field: 'userName', flex: 1, maxWidth: 300 },
    // { headerName: 'نوع تایید', field: 'verifyMode', flex: 1, maxWidth: 300 },
    { headerName: 'درب', field: 'door', flex: 1, maxWidth: 100 },
    { headerName: 'رویداد', field: 'comment', flex: 1, maxWidth: 250 },
    // { headerName: 'وضعیت ورود/خروج', field: 'direction', flex: 1, maxWidth: 300 },
    { headerName: 'زمان', field: 'time', flex: 1, maxWidth: 450 },
  ]

  const { isLoading } = useDashboardData({
    onSuccessFunc: (data) => {
      setRows(data)
    },
  })

  return (
    <Card>
      {isLoading && <Loading />}
      {/* This CardHeader should be here to fix the top padding of the Card */}
      <CardHeader></CardHeader>
      <CardContent>
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
            لاگ زنده همه دستگاه‌ها
          </MDTypography>
        </MDBox>
        <MDBox py={3}>
          <DataGridRtl rows={rows} columns={columns} loading={isLoading} />
        </MDBox>
      </CardContent>
    </Card>
  )
}

export default AllDevicesRTLogGrid
