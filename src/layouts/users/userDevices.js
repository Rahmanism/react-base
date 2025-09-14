import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Icon, Tooltip } from '@mui/material'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import { tSuccess, tError, tLoading, tInfo } from 'common/toast'
import Loading from 'components/Loading'
import { UserApi } from 'api'
import { Consts } from 'common'
import DeviceSelector from 'complex-components/DeviceSelector'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'
import { GridActionsCellItem } from '@mui/x-data-grid'
import ProvinceSelector from 'complex-components/ProvinceSelector'

/**
 * The grid of devices which user has access to their doors.
 *
 * @param {string} options.userId - The user ID.
 * @return {ReactElement} The JSX element representing the grid and adding device button.
 */
export default function UserDevices(options) {
  const { userId } = options
  const queryClient = useQueryClient()
  const [apiObj] = useState(new UserApi())
  const [rows, setRows] = useState([])
  const devicesUrl = `${apiObj.apiUrl}/GetDevices`
  const [deviceId, setDeviceId] = useState(0)
  const [provinceId, setProvinceId] = useState(0)
  const [reset, setReset] = useState(false)
  const toastId = useRef(0)

  const columns = [
    { headerName: 'ID', field: 'id', flex: 0, maxWidth: 10 },
    { headerName: 'نام', field: 'name', flex: 1, maxWidth: 300 },
    { headerName: 'IP', field: 'ip', flex: 1, maxWidth: 300 },
    {
      headerName: 'عملیات',
      field: 'actions',
      flex: 1,
      maxWidth: 300,
      align: 'center',
      type: 'actions',
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="حذف">
              <Icon fontSize="small" color="error" data-rowid={id}>
                delete
              </Icon>
            </Tooltip>
          }
          label="حذف"
          onClick={() => deleteThis(id)}
        />,
      ],
    },
  ]

  const { data, isLoading: devicesIsLoading } = useQuery({
    queryKey: [devicesUrl],
    queryFn: async () => apiObj.getDevices({ userId }),
    onSuccess: (data) => setRows(data),
  })

  const deleteMutation = useMutation({
    mutationFn: (rowId) => {
      toastId.current = tLoading()
      return apiObj.removeDevice({
        userId,
        deviceId: rowId,
        showError: false,
      })
    },
    onSuccess: (data) => {
      tSuccess(data, toastId.current)
      setReset(false)
      queryClient.invalidateQueries([devicesUrl], { exact: true })
    },
    onError: () => tError(Consts.delete_failed, toastId.current),
  })

  const deleteThis = (id) => {
    if (id != null && window.confirm(Consts.delete_question)) {
      deleteMutation.mutate(id)
    }
  }

  const addMutation = useMutation({
    mutationFn: (mutateDeviceId) => {
      toastId.current = tLoading()
      return apiObj.addDevice({
        userId,
        deviceId: mutateDeviceId,
        showError: false,
      })
    },
    onSuccess: (data) => {
      tSuccess(data, toastId.current)
      setDeviceId(0)
      setReset(true)
      queryClient.invalidateQueries([devicesUrl], { exact: true })
    },
    onError: (err) => {
      setDeviceId(0)
      setReset(true)
      return tError(err.message, toastId.current)
    },
  })

  const addProvinceMutation = useMutation({
    mutationFn: (mutateProvinceId) => {
      toastId.current = tLoading()
      return apiObj.addProvinceDevices({
        userId,
        provinceId: mutateProvinceId,
        showError: false,
      })
    },
    onSuccess: (data) => {
      tInfo(data, toastId.current)
      // setProvinceId(0)
      setReset(true)
      queryClient.invalidateQueries([devicesUrl], { exact: true })
    },
    onError: (err) => {
      // setProvinceId(0)
      setReset(true)
      return tError(err.message, toastId.current)
    },
  })

  const addButtonClick = () => {
    addMutation.mutate(deviceId)
  }

  const addProvinceButtonClick = () => {
    addProvinceMutation.mutate(provinceId)
  }

  const deviceSelect = ({ deviceId: selectedDeviceId }) => {
    setDeviceId(selectedDeviceId)
    setReset(false)
  }

  const provinceSelect = ({ provinceId: selectedProvinceId }) => {
    setProvinceId(selectedProvinceId)
    setReset(false)
  }

  const isLoading =
    devicesIsLoading || deleteMutation?.isLoading || addMutation?.isLoading

  return (
    <>
      {isLoading && Loading()}
      <MDBox>
        <MDBox>
          <DeviceSelector onSelected={deviceSelect} reset={reset} />
        </MDBox>
        <MDBox item>
          <MDButton onClick={addButtonClick} variant="gradient" color="success">
            <Icon fontSize="small">add_circle</Icon>
            افزودن
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox pt={3}>
        <MDBox>
          <ProvinceSelector
            title="افزودن به کل دستگاه‌های استان"
            value={provinceId}
            onSelected={provinceSelect}
          />
        </MDBox>
        <MDBox item>
          <MDButton
            onClick={addProvinceButtonClick}
            variant="gradient"
            color="success"
            disabled={provinceId === 0}
          >
            <Icon fontSize="small">add_circle</Icon>
            افزودن به همه دستگاه‌های استان
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox py={3}>
        <DataGridRtl rows={rows} columns={columns} loading={isLoading} />
      </MDBox>
    </>
  )
}
