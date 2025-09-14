import { useEffect, useMemo, useState } from 'react'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

import { DoorAccessLogApi } from 'api'
import { useQuery } from '@tanstack/react-query'
import { tError } from 'common/toast'
import DeviceSelector from 'complex-components/DeviceSelector'
import { useSearchParams } from 'react-router-dom'
import { getPersianDateTimeFromString } from 'common'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'
import { Box } from '@mui/material'

export default function DoorAccessLogList2({
  deviceIdToShow = 0,
  deviceNameToShow = '',
  showingInDialog = false,
}) {
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

  const apiObj = useMemo(() => new DoorAccessLogApi(), [])
  const [rows, setRows] = useState([])
  const [deviceId, setDeviceId] = useState(deviceIdToShow)
  const [deviceName, setDeviceName] = useState('')
  const [devices, setDevices] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [searchParams] = useSearchParams()
  if (searchParams.get('id') != null && deviceId !== searchParams.get('id')) {
    setDeviceId(searchParams.get('id'))
  }

  // const queryClient = useQueryClient()
  const { isLoading: isQueryLoading, refetch } = useQuery({
    enabled: deviceId !== 0,
    queryKey: [apiObj.apiUrl],
    queryFn: async () => apiObj.getDeviceDataRecords({ id: deviceId }),
    retry: false,
    onSuccess: (data) => {
      const jalaliTimeData = data?.map((item) => ({
        ...item,
        time: getPersianDateTimeFromString(item.time),
        id: Math.floor(Math.random() * 1000_000),
      }))
      setRows(jalaliTimeData)
      setIsLoading(false)
    },
    onError: () => tError('خواندن اطلاعات ناموفق بود.'),
  })

  const deviceSelect = ({
    deviceId: selectedDeviceId,
    deviceName: selectedDeviceName,
  }) => {
    setDeviceId(selectedDeviceId)
    setDeviceName(selectedDeviceName)
  }

  useEffect(() => {
    setIsLoading(true)
    if (deviceId !== 0) refetch()
  }, [deviceId])

  useEffect(() => {
    if (devices?.length > 0 && deviceName === '' && deviceId !== 0) {
      const currentDevice = devices.filter((d) => d.id === +deviceId)
      if (currentDevice !== null && currentDevice?.length > 0) {
        setDeviceName(
          `${currentDevice[0].name} - ${currentDevice[0].provinceTitle}`
        )
      }
    }
  }, [devices, devices?.length])

  return (
    <>
      {showingInDialog && deviceNameToShow && deviceNameToShow !== '' && (
        <b>لاگ دسترسی {deviceNameToShow}</b>
      )}
      {!showingInDialog && (
        <>
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
              لاگ دسترسی{' '}
              {deviceName === ''
                ? ' - برای نمایش لاگ، یک دستگاه انتخاب کنید'
                : deviceName}
            </MDTypography>
          </MDBox>
          <Box mt={2}>
            <DeviceSelector
              onSelected={deviceSelect}
              onLoad={(devices) => setDevices(devices)}
            />
          </Box>
        </>
      )}
      <MDBox py={3}>
        <DataGridRtl
          rows={rows}
          columns={columns}
          loading={(isQueryLoading || isLoading) && deviceId !== 0}
          columnVisibilityModel={{
            id: false,
          }}
        />
      </MDBox>
    </>
  )
}
