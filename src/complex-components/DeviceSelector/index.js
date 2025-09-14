import { useMemo } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import MDBox from 'components/MDBox'
import { DeviceApi } from 'api'
import { tError } from 'common/toast'

/**
 * An autocomplete for selecting a device.
 *
 * @param onSelected - The function to call when a device is selected.
 * @param onLoad - The function to call when data of devices is loaded.
 * @param variant - The variant of the text field (standard, outlined, filled).
 * @returns The JSX element representing the device selector.
 */
export default function DeviceSelector(options) {
  const { onSelected, variant = 'standard', onLoad } = options
  const deviceApiObj = useMemo(() => new DeviceApi(), [])

  const { data: devices } = useQuery({
    queryKey: [deviceApiObj.apiUrl],
    queryFn: async () => deviceApiObj.getAll({ first: 0, count: 0 }),
    onSuccess: async (data) => {
      if (onLoad) {
        onLoad(data)
      }
    },
    onError: () => tError('مشکل در خواندن لیست دستگاه‌ها'),
  })

  const handleDeviceId = ({ label, value }) => {
    if (value != null) {
      if (onSelected) {
        onSelected({
          deviceId: value,
          deviceName: label,
        })
      }
    }
  }

  return (
    <MDBox>
      <Autocomplete
        options={devices?.map((device) => ({
          label: `${device.name} - ${device.provinceTitle}`,
          value: device.id,
        }))}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            label="یک دستگاه انتخاب کنید"
          />
        )}
        onChange={(event, selectedOption) => {
          if (!selectedOption) return
          handleDeviceId(selectedOption)
        }}
      />
    </MDBox>
  )
}
