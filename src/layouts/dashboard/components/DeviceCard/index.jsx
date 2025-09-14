import { lazy, useState } from 'react'
import { getBaseUrl } from 'api/urls'
import { ActionType } from 'common'
import { tSuccess, tError } from 'common/toast'
import InfoCard from 'complex-components/Cards/InfoCards/InfoCard'
// import DeviceRTEventsDialog from 'layouts/devices/DeviceRTEventsDialog'
import DeviceCameraDialog from 'layouts/devices/deviceCameraDialog'
import MyDialog from 'components/MyDialog'
import DoorAccessLogList2 from 'layouts/doorAccessLog/index2'

function DeviceCard(data) {
  const {
    icon = 'room_preferences',
    color = 'light',
    api,
    event = null,
    auxiliaryAction = null,
  } = data
  const { deviceName, deviceId } = event
  // const { deviceLog } = data
  const [streamUrl, setStreamUrl] = useState({})
  const [isShowingForm, setIsShowingForm] = useState(false)
  // const [showRTEventsDialog, setShowRTEventsDialog] = useState(false)
  const [showDeviceLogDialog, setShowDeviceLogDialog] = useState(false)

  // if (!device) return null

  function connect() {
    api.connectDevice({
      id: deviceId,
      resolve: (result) => tSuccess(result),
    })
  }

  // function disconnect() {
  //   api.disconnect({
  //     id: device.id,
  //     resolve: (result) => tSuccess(result),
  //   })
  // }

  function cancelAlarm() {
    api.cancelAlarm({
      id: deviceId,
      resolve: (result) => tSuccess(result),
    })
  }

  function restartDevice() {
    api.restartDevice({
      id: deviceId,
      resolve: (result) => tSuccess(result),
    })
  }

  // function showDeviceLog() {
  //   if (deviceLog instanceof Function) {
  //     deviceLog(device.id)
  //   }
  // }

  function openDoor() {
    api.openDoor({
      deviceId: deviceId,
      doorId: 1,
      resolve: (result) => tSuccess(result),
      reject: (result) => tError(result),
    })
  }

  function getCamStream() {
    if (auxiliaryAction) auxiliaryAction({ dialogOpen: true })
    api.getCamStream({
      deviceId: deviceId,
      resolve: (result) => {
        setIsShowingForm(true)
        setStreamUrl(getBaseUrl(true) + result)
      },
      reject: (result) => tError(result),
    })
  }

  function showDeviceLog() {
    if (auxiliaryAction) auxiliaryAction({ dialogOpen: true })
    setShowDeviceLogDialog(true)
  }

  // function showRTEventsLog() {
  //   if (auxiliaryAction) auxiliaryAction({ dialogOpen: true })
  //   setShowRTEventsDialog(true)
  // }

  function deviceCameraDialogClose() {
    setIsShowingForm(false)
    if (auxiliaryAction) auxiliaryAction({ dialogOpen: false })
  }

  function deviceLogDialogClose() {
    setShowDeviceLogDialog(false)
    if (auxiliaryAction) auxiliaryAction({ dialogOpen: false })
  }

  // function rtLogDialogClose() {
  //   setShowRTEventsDialog(false)
  //   if (auxiliaryAction) auxiliaryAction({ dialogOpen: false })
  // }

  return (
    <>
      <InfoCard
        color={color}
        icon={icon}
        title={deviceName}
        description="" // {device.ip}
        event={event}
        actions={[
          {
            commandType: ActionType.Command,
            title: 'اتصال به دستگاه',
            command: connect,
            color: 'success',
            icon: 'link',
          },
          // {
          //   commandType: ActionType.Command,
          //   title: 'قطع اتصال از دستگاه',
          //   command: disconnect,
          //   color: 'error',
          //   icon: 'link_off',
          // },
          {
            commandType: ActionType.Command,
            title: 'قطع آلارم دستگاه',
            command: cancelAlarm,
            color: 'warning',
            icon: 'alarm_off',
          },
          {
            commandType: ActionType.Command,
            title: 'راه‌اندازی مجدد دستگاه',
            command: restartDevice,
            color: 'info',
            icon: 'restart_alt',
          },
          {
            commandType: ActionType.Command,
            title: 'مشاهده لاگ دستگاه',
            command: showDeviceLog,
            // command: `/reports?id=${deviceId}`,
            color: 'primary',
            icon: 'event_note',
          },
          {
            commandType: ActionType.Command,
            title: 'باز کردن در',
            command: openDoor,
            color: 'info',
            icon: 'meeting_room',
          },
          {
            commandType: ActionType.Command,
            title: 'مشاهده دوربین',
            command: getCamStream,
            color: 'error',
            icon: 'camera_alt',
          },
          // {
          //   commandType: ActionType.Command,
          //   title: 'مشاهده لاگ زنده',
          //   command: showRTEventsLog,
          //   color: 'info',
          //   icon: 'dvr',
          // },
        ]}
      />
      {streamUrl?.url !== '' && (
        <DeviceCameraDialog
          streamUrl={streamUrl}
          isShowingForm={isShowingForm}
          onClose={deviceCameraDialogClose}
        />
      )}
      {showDeviceLogDialog && (
        <MyDialog
          open={showDeviceLogDialog}
          showCloseOnly
          close={deviceLogDialogClose}
          fullWidth
          maxWidth="xl"
        >
          <DoorAccessLogList2
            showingInDialog={true}
            deviceIdToShow={deviceId}
            deviceNameToShow={deviceName}
          />
        </MyDialog>
      )}
      {/* {showRTEventsDialog && (
        <DeviceRTEventsDialog
          deviceId={deviceId}
          deviceName={deviceName}
          isShowingForm={showRTEventsDialog}
          onClose={rtLogDialogClose}
        />
      )} */}
    </>
  )
}

export default DeviceCard
