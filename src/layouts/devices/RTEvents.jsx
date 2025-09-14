import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@mui/material'
import MDBox from 'components/MDBox'
import { getPersianDateTimeFromString } from 'common'
import MDTypography from 'components/MDTypography'
import Loading from 'components/Loading'
import useRTEvents from './useRTEvents'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'

function RTEvents(options) {
  const { deviceId, deviceName } = options

  const [rows, setRows] = useState([])
  const columns = [
    { headerName: 'ID', field: 'id', flex: 0, maxWidth: 10 },
    { headerName: 'شماره کارت', field: 'cardNo', flex: 1, maxWidth: 100 },
    { headerName: 'پین', field: 'pin', flex: 1, maxWidth: 100 },
    { headerName: 'کاربر', field: 'userGivenName', flex: 1, maxWidth: 200 },
    { headerName: 'نوع تایید', field: 'verifyMode', flex: 1, maxWidth: 200 },
    { headerName: 'درب', field: 'door', flex: 1, maxWidth: 100 },
    { headerName: 'رویداد', field: 'eventTypeString', flex: 1, maxWidth: 200 },
    {
      headerName: 'وضعیت ورود/خروج',
      field: 'direction',
      flex: 1,
      maxWidth: 200,
    },
    { headerName: 'زمان', field: 'time', flex: 1, maxWidth: 400 },
  ]

  const { isLoading } = useRTEvents({
    onSuccess: (data) => {
      // There's no document about this event type, so we filter it out.
      const filteredData = data.filter(
        (item) =>
          item.eventType !== 'AcutallyThatObtainDoorStatusAndAlarmStatus'
      )
      // If there's no data, no need to reset the state and refresh the table.
      if (filteredData.length === 0) return
      const jalaliTimeData = filteredData?.map((item) => ({
        ...item,
        time: getPersianDateTimeFromString(item.time),
        id: Math.floor(Math.random() * 1000_000),
      }))
      setRows((r) => [...jalaliTimeData, ...r])
    },
    deviceId,
  })

  return (
    <Card>
      {isLoading && <Loading />}
      {/* This CardHeader should be here to fix the top padding of the Card */}
      <CardHeader />
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
            لاگ زنده {deviceName}
          </MDTypography>
        </MDBox>
        <MDBox py={3}>
          <DataGridRtl
            rows={rows}
            columns={columns}
            loading={isLoading}
            columnVisibilityModel={{
              id: false,
            }}
          />
        </MDBox>
      </CardContent>
    </Card>
  )
}

export default RTEvents
