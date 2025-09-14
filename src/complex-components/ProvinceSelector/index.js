import { useEffect, useState } from 'react'
import { ProvinceApi } from 'api'
import { useQuery } from '@tanstack/react-query'
import { tError } from 'common/toast'
import MDBox from 'components/MDBox'
import { Autocomplete, TextField } from '@mui/material'

export default function ProvinceSelector(options) {
  const { onSelected, value: oldProvinceId, title = 'استان' } = options

  const apiObj = new ProvinceApi()
  const [selectedProvinceId, setSelectedProvinceId] = useState(oldProvinceId)
  const [selectedProvinceTitle, setSelectedProvinceTitle] = useState('')

  const { data: provinces } = useQuery({
    queryKey: [apiObj.apiUrl],
    queryFn: async () => apiObj.getAll({ first: 0, count: 0 }),
    onError: () => tError('مشکل در خواندن لیست استان‌ها'),
    onSuccess: (data) => {
      if (selectedProvinceTitle !== '') return
      if (data?.length <= 0) return
      setSelectedProvinceTitle(
        data.filter((l) => l.id === oldProvinceId)[0]?.title
      )
    },
  })

  const inputChanged = (e, newValue) => {
    setSelectedProvinceId(newValue.id)
    setSelectedProvinceTitle(newValue.title)
  }

  useEffect(() => {
    if (selectedProvinceId === oldProvinceId) return
    if (onSelected) {
      onSelected({
        provinceId: selectedProvinceId,
        provinceTitle: selectedProvinceTitle,
      })
    }
  }, [selectedProvinceId])

  return (
    <>
      <h3>{title}</h3>
      <MDBox mb={2}>
        {provinces && (
          <Autocomplete
            id="province-combobox"
            options={provinces}
            autoHighlight
            value={{ id: selectedProvinceId, title: selectedProvinceTitle }}
            getOptionLabel={(option) => option?.title ?? ''}
            renderInput={(params) => <TextField {...params} />}
            onChange={inputChanged}
          />
        )}
      </MDBox>
    </>
  )
}
