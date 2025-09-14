import {
  ding,
  DingEvents,
  EventStatus,
  getPersianDateTimeFromString,
} from 'common'
import { useRTEventsForAll } from 'layouts/devices/useRTEvents'
import { getEventStatus } from '../../../common/getEventColor'
import { tError, tInfo, tWarn } from '../../../common/toast'

const oldData = []

function useDashboardData({ refetchEvents = true, onSuccessFunc }) {
  const { isLoading } = useRTEventsForAll({
    onSuccess: (data) => {
      if (!refetchEvents) return
      // AcutallyThatObtainDoorStatusAndAlarmStatus
      // There's no document about this event type, so we filter it out.
      const filteredData = data.filter((item) => {
        if (
          data.find((x) => x.deviceId === item.deviceId && x.eventType !== 255)
        ) {
          return item.eventType !== 255
        }
        if (item.eventType === 255) {
          item.comment = 'متصل'
        }
        return item
      })

      // If there's no data, no need to reset the state and refresh the table.
      if (filteredData.length === 0) return

      const jalaliTimeData = filteredData?.map((item, index) => {
        // We don't want to show this event if we showed it before.
        const hasItem = oldData.some((x) => x.id == item.id)
        if (!hasItem && DingEvents.includes(item.eventType)) {
          const toastOptions = {
            position: 'bottom-left',
            containerId: 'bottomLeft',
          }
          const wait = 1000 * (index + 1)
          ding()
          const status = getEventStatus(item.eventTypeCode)
          const msg = (
            <>
              {item.deviceName}: <br />
              {item.comment}
            </>
          )
          switch (status) {
            case EventStatus.success:
              setTimeout(() => {
                tInfo(msg, 0, {
                  ...toastOptions,
                  autoClose: 3000 + Math.random() * 5000,
                })
              }, wait)
              break
            case EventStatus.warning:
              setTimeout(() => {
                tWarn(msg, 0, {
                  ...toastOptions,
                  autoClose: 5500 + Math.random() * 5000,
                })
              }, wait)
              break
            case EventStatus.error:
              setTimeout(() => {
                tError(msg, 0, {
                  ...toastOptions,
                  autoClose: 8000 + Math.random(),
                })
              }, wait)
              break
            case EventStatus.ok:
            default:
              setTimeout(() => {
                tInfo(msg, 0, {
                  ...toastOptions,
                  autoClose: 3000 + Math.random() * 5000,
                })
              }, wait)
          }
        }
        return {
          ...item,
          deviceName: item.deviceName,
          deviceId: item.deviceId,
          time: getPersianDateTimeFromString(item.moment),
          locationTitle: item.deviceName,
          lat: item.lat ?? Math.random() * (36.5 - 25) + 25, // Random latitude between 25 and 36.5
          lng: item.lng ?? Math.random() * (60 - 44) + 44, // Random longitude between 44 and 60
        }
      })

      oldData.push(...data)
      onSuccessFunc(jalaliTimeData)
    },
  })
  return { isLoading }
}

export default useDashboardData
