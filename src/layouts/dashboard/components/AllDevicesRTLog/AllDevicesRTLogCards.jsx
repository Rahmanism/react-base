import { useState } from 'react'
import { CardContent, Grid2 } from '@mui/material'
import Loading from 'components/Loading'
import DeviceEventLogCards from './DeviceEventLogCards'
import MDTypography from 'components/MDTypography'
import useDashboardData from '../useDashboardData'

function AllDevicesRTLogCards() {
  const [events, setEvents] = useState([])
  const [refetchEvents, setRefetchEvents] = useState(true)
  const [isComponentLoading, setIsComponentLoading] = useState(true)

  const { isLoading } = useDashboardData({
    refetchEvents,
    onSuccessFunc: (data) => {
      setEvents(data)
      setIsComponentLoading(false)
    },
  })

  // We stop the refresh of device logs if a dialog is open
  // to prevent closing that dialog.
  function auxiliaryAction({ dialogOpen = false }) {
    setRefetchEvents(!dialogOpen)
  }

  return (
    <>
      {(isLoading || isComponentLoading) && <Loading />}
      <CardContent>
        <Grid2 container spacing={3}>
          {events.length > 0 && (
            <DeviceEventLogCards
              events={events}
              auxiliaryAction={auxiliaryAction}
            />
          )}
          {events.length === 0 && (
            <MDTypography variant="h6" color="text" fontWeight="regular">
              هیچ رویدادی ایجاد نشده
            </MDTypography>
          )}
        </Grid2>
      </CardContent>
    </>
  )
}

export default AllDevicesRTLogCards
