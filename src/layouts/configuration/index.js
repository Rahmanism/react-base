import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ConfigurationApi } from 'api'
import { tSuccess, tLoading, tError } from 'common/toast'
import MDBox from 'components/MDBox'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'
import Loading from 'components/Loading'
import { ConfigurationTitles } from 'common/consts'
import { FormLabel } from '@mui/material'
import useConfiguration from './useConfiguration'

export default function Configuration() {
  const queryClient = useQueryClient()
  const configApiObj = new ConfigurationApi()
  const toastId = useRef(0)
  const [configs, setConfigs] = useState([{}])

  const { isLoading } = useConfiguration((loadedData) => setConfigs(loadedData))

  const updateMutation = useMutation({
    mutationFn: (data) => {
      toastId.current = tLoading()
      return configApiObj.edit({ data, showError: false })
    },
    onSuccess: (data) => {
      tSuccess(data, toastId.current)
      queryClient.resetQueries({
        queryKey: [configApiObj.apiUrl],
        exact: true,
      })
    },
    onError: (err) => tError(err.message, toastId.current),
  })

  const submitConfig = () => {
    updateMutation.mutate(configs)
  }

  return (
    <>
      {isLoading && Loading()}
      <h1>تنظیمات</h1>
      <MDBox px={3} py={3} mt={3} component="form" role="form">
        {configs &&
          configs.map((config) => (
            <MDBox mb={2} key={config.id}>
              <FormLabel>{ConfigurationTitles[config.id]}</FormLabel>
              <br />
              <MDInput
                value={config.value ?? ''}
                onChange={(e) => {
                  const newConfigs = configs.map((c) => {
                    if (c.id === config.id) {
                      return { id: c.id, value: e.target.value.trim() }
                    }
                    return c
                  })
                  setConfigs(newConfigs)
                }}
              />
            </MDBox>
          ))}
        <MDBox mb={2}>
          <MDButton onClick={submitConfig} variant="gradient" color="success">
            ذخیره
          </MDButton>
        </MDBox>
      </MDBox>
    </>
  )
}
