import ProvinceSelector from 'complex-components/ProvinceSelector'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MyDialog from 'components/MyDialog'

export default function AddProvinceForm(options) {
  const {
    provinceSelect,
    selectedProvinceId,
    formProvinceSubmit,
    isAddProvinceFormVisible,
  } = options

  return (
    <MyDialog
      title="اضافه کردن دستگاه‌های یک استان"
      close={formProvinceSubmit}
      open={isAddProvinceFormVisible}
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
          <span>
            استان مورد نظر را انتخاب کنید.
            <br />
            <MDTypography
              variant="caption"
              color="secondary"
              fontWeight="light"
              size="small"
            >
              مجوزهای تمام دستگاه‌های استان انتخاب شده برای کاربر ثبت خواهند شد.
            </MDTypography>
          </span>
          <ProvinceSelector
            onSelected={provinceSelect}
            value={selectedProvinceId}
          />
        </MDBox>
      </MDBox>
    </MyDialog>
  )
}
