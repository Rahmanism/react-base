import DeviceSelector from 'complex-components/DeviceSelector'
import MDBox from 'components/MDBox'
import MyDialog from 'components/MyDialog'

export default function AddDeviceForm(options) {
  const { formSubmit, isAddFormVisible, deviceSelect } = options

  return (
    <MyDialog
      title="اضافه کردن دستگاه"
      close={formSubmit}
      open={isAddFormVisible}
    >
      <MDBox
        px={3}
        py={3}
        mt={3}
        component="form"
        role="form"
        style={{ width: 'min(30rem, 80cqw)' }}
      >
        <MDBox mb={2}>
          <DeviceSelector onSelected={deviceSelect} />
        </MDBox>
      </MDBox>
    </MyDialog>
  )
}
