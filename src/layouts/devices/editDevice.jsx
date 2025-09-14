import { Card } from '@mui/material'
import ProvinceSelector from 'complex-components/ProvinceSelector'
import MDBox from 'components/MDBox'
import MDInput from 'components/MDInput'
import MyDialog from 'components/MyDialog'
import { useState } from 'react'

/**
 * A dialog for editing (or adding) a device.
 *
 * @param {Function} options.formSubmit - The form submit function.
 * @param {boolean} options.isShowingForm - A boolean which indicates whether the form is currently being shown.
 * @param {Object} options.item - An object representing the device that should be edited. If it's a new device, it should be default device data.
 * @return {JSX.Element} A JSX element representing the EditDevice component.
 */
export default function EditDevice(options) {
  const { formSubmit, isShowingForm, item } = options
  const [device, setDevice] = useState(item)

  const submit = (result) => {
    if (formSubmit) {
      formSubmit(result, device)
    }
  }

  const changeDeviceName = (e) => {
    setDevice((p) => ({ ...p, name: e.target.value }))
  }

  const changeIP = (e) => {
    setDevice((p) => ({ ...p, ip: e.target.value }))
  }

  const changeMac = (e) => {
    setDevice((p) => ({ ...p, mac: e.target.value }))
  }

  const changeCameraIP = (e) => {
    setDevice((p) => ({ ...p, cameraIP: e.target.value }))
  }

  const changeProvince = ({ provinceId, provinceTitle }) => {
    setDevice((p) => ({ ...p, provinceId, provinceTitle }))
  }

  return (
    <MyDialog
      title={device.id === 0 ? 'دستگاه جدید' : 'ویرایش دستگاه'}
      close={submit}
      open={isShowingForm}
    >
      <Card>
        <MDBox px={3} py={3}>
          <MDBox mt={3} component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                label="نام دستگاه"
                value={device.name}
                onChange={changeDeviceName}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                label="آی‌پی دستگاه"
                value={device.ip}
                onChange={changeIP}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                label="MAC Address"
                value={device.mac}
                onChange={changeMac}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                label="آی‌پی دوربین"
                value={device.cameraIP}
                onChange={changeCameraIP}
              />
            </MDBox>
            <MDBox mb={2}>
              <ProvinceSelector
                value={device.provinceId}
                onSelected={changeProvince}
              />
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </MyDialog>
  )
}
