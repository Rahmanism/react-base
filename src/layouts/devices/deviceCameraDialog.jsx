import MyDialog from 'components/MyDialog'
import { DeviceApi } from 'api'
import DeviceCamera from './DeviceCamera'
import { useBeforeunload } from 'common/useBeforeunload'

function DeviceCameraDialog(options) {
  const { streamUrl, isShowingForm, onClose } = options

  const apiObj = new DeviceApi()
  const closeDialog = () => {
    apiObj.closeCamStream()
    if (onClose) onClose()
  }

  useBeforeunload((event) => {
    closeDialog()
  })
  // useBeaconSave(() => {
  //   apiObj.closeCamStream()
  //   return { call: true }
  // })

  return (
    <MyDialog
      title="استریم دوربین دستگاه"
      open={isShowingForm}
      showCloseOnly
      close={closeDialog}
    >
      <DeviceCamera
        streamUrl={streamUrl}
        isOpen={isShowingForm}
        key={`${isShowingForm}${streamUrl}${Math.random()}`}
      />
    </MyDialog>
  )
}

export default DeviceCameraDialog
