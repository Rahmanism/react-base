import MyDialog from 'components/MyDialog'
import RTEvents from './RTEvents'

function DeviceRTEventsDialog(options) {
  const { deviceId, deviceName, isShowingForm, onClose } = options

  return (
    <MyDialog
      open={isShowingForm}
      showCloseOnly
      close={onClose}
      fullWidth
      maxWidth="xl"
    >
      <RTEvents deviceId={deviceId} deviceName={deviceName} />
    </MyDialog>
  )
}

export default DeviceRTEventsDialog
