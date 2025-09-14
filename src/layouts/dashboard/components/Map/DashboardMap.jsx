import { useState } from 'react'
import ZkmMap from './ZkmMap'
import Loading from 'components/Loading'
import useDashboardData from '../useDashboardData'

function DashboardMap() {
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
      <div style={{ display: 'flex' }}>
        <ZkmMap events={events} auxiliaryAction={auxiliaryAction} />
      </div>
    </>
  )
}

export default DashboardMap
