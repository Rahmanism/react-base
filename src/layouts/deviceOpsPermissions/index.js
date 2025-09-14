import {
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Consts, DeviceOpTitles, DeviceOps } from 'common'
import { UserPermittedDeviceOpsApi } from 'api'
import { Icon, Tooltip } from '@mui/material'
import Loading from 'components/Loading'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import MDTypography from 'components/MDTypography'
import TwoState from 'complex-components/Badge'
import { tSuccess, tError, tWarn, tLoading } from 'common/toast'
import { DialogResult } from 'components/MyDialog'
import AddDeviceForm from './addDeviceForm'
import AddProvinceForm from './addProvinceForm'
import { GridActionsCellItem } from '@mui/x-data-grid'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'

export default function DeviceOpsPermissions() {
  const columns = [
    { headerName: 'ID', field: 'deviceId', flex: 0, maxWidth: 10 },
    { headerName: 'دستگاه', field: 'deviceName', flex: 1, maxWidth: 400 },
    {
      headerName: 'اتصال',
      field: DeviceOpTitles.ConnectDevice,
      flex: 1,
      maxWidth: 70,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.ConnectDevice]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.ConnectDevice,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'قطع اتصال',
      field: DeviceOpTitles.Disconnect,
      flex: 1,
      maxWidth: 100,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.Disconnect]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.Disconnect,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'لغو آلارم',
      field: DeviceOpTitles.CancelAlarm,
      flex: 1,
      maxWidth: 100,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.CancelAlarm]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.CancelAlarm,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'ری‌استارت',
      field: DeviceOpTitles.RestartDevice,
      flex: 1,
      maxWidth: 100,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.RestartDevice]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.RestartDevice,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'باز کردن در',
      field: DeviceOpTitles.OpenDoor,
      flex: 1,
      maxWidth: 100,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.OpenDoor]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.OpenDoor,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'بستن در',
      field: DeviceOpTitles.CloseDoor,
      flex: 1,
      maxWidth: 100,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.CloseDoor]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.CloseDoor,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'تغییر IP',
      field: DeviceOpTitles.ChangeIP,
      flex: 1,
      maxWidth: 100,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.ChangeIP]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.ChangeIP,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'دریافت لاگ',
      field: DeviceOpTitles.GetRTLogs,
      flex: 1,
      maxWidth: 100,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState
            key={`${params.id}-${params.row.userId}-${params.row.deviceId}`}
            ok={!!params.row[DeviceOpTitles.GetRTLogs]}
            data={{
              deviceId: params.row.deviceId,
              operationId: DeviceOps.GetRTLogs,
            }}
            onClick={permissionClick}
          />
        )
      },
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      align: 'center',
      maxWidth: 200,
      type: 'actions',
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="ذخیره">
              <Icon fontSize="small" color="warning" data-rowid={row.deviceId}>
                save
              </Icon>
            </Tooltip>
          }
          label="ذخیره"
          onClick={() => setSaveIt(true)}
        />,
      ],
    },
  ]

  const [changes, setChanges] = useState([])
  const [apiObj] = useState(new UserPermittedDeviceOpsApi())
  const [rows, setRows] = useState([])
  const [searchParams] = useSearchParams()
  const userId = +searchParams.get('userId')
  const [saveIt, setSaveIt] = useState(false)
  const toastId = useRef(0)
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [selectedDeviceId, setSelectedDeviceId] = useState()
  const [isAddProvinceFormVisible, setIsAddProvinceFormVisible] =
    useState(false)
  const [selectedProvinceId, setSelectedProvinceId] = useState()

  const queryClient = useQueryClient()
  const permissionList = useQuery({
    enabled: userId > 0,
    queryKey: [apiObj.apiUrl],
    queryFn: async () => apiObj.getDeviceOpsPermissionsOfUser({ userId }),
    retry: false,
    onSuccess: (data) => {
      const processedRows = data?.reduce((acc, item) => {
        let processedRow = acc.find((r) => r.deviceId === item.deviceId)
        if (!processedRow) {
          processedRow = { ...item, id: item.deviceId }
          acc.push(processedRow)
        }
        processedRow[item.operationTitle] = true
        return acc
      }, [])
      setRows(processedRows)
    },
    onError: () => tError(Consts.reading_data_failed),
  })

  const mutation = useMutation({
    mutationFn: (data) => {
      toastId.current = tLoading()
      return apiObj.changeRangePermissions({
        data: data.data,
        userId,
        showError: false,
      })
    },
    onSuccess: (data) => {
      setSelectedDeviceId(0)
      setChanges([])
      tSuccess(data, toastId.current)
      queryClient.setQueryData([apiObj.apiUrl, data.deviceId], data.data)
      queryClient.invalidateQueries([apiObj.apiUrl], { exact: true })
    },
    onError: (err) => tError(err.message, toastId.current),
  })

  const addProvincePermissionMutation = useMutation({
    mutationFn: () => {
      toastId.current = tLoading()
      return apiObj.addProvinceDeviceOpsPermission({
        userId,
        provinceId: selectedProvinceId,
        showError: false,
      })
    },
    onSuccess: (data) => {
      setSelectedProvinceId(0)
      setChanges([])
      tSuccess(data, toastId.current)
      queryClient.invalidateQueries([apiObj.apiUrl])
    },
    onError: (err) => tError(err.message, toastId.current),
  })

  useEffect(() => {
    if (!saveIt) return
    mutation.mutate({ userId, data: changes })
    setSaveIt(false)
  }, [saveIt])

  const permissionClick = (okState, data) => {
    setChanges((c) => [
      ...c,
      {
        deviceId: data.deviceId,
        operationId: data.operationId,
        permissionState: okState,
      },
    ])
  }

  const deviceSelect = ({ deviceId }) => {
    setSelectedDeviceId(deviceId)
  }

  const showForm = () => {
    setIsAddFormVisible(true)
  }

  const showAddProvinceForm = () => {
    setIsAddProvinceFormVisible(true)
  }

  const provinceSelect = ({ provinceId }) => {
    setSelectedProvinceId(provinceId)
  }

  const formSubmit = (result) => {
    if (result === DialogResult.Ok) {
      if (!selectedDeviceId) {
        tWarn('دستگاهی انتخاب نشده است.')
      } else {
        const data = [
          {
            DeviceId: +selectedDeviceId,
            OperationId: DeviceOps.ConnectDevice,
            PermissionState: true,
          },
        ]
        mutation.mutate({ userId, data })
      }
    }
    setIsAddFormVisible(false)
  }

  const formProvinceSubmit = (result) => {
    setIsAddProvinceFormVisible(false)
    if (result === DialogResult.Ok) {
      if (!selectedProvinceId) {
        tWarn('استانی انتخاب نشده است')
        return false
      }
      addProvincePermissionMutation.mutate()
    }
    return false
  }

  const isLoading = permissionList.isLoading || mutation.isLoading

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              مجوزهای دستگاه {/* TODO: برای کاربر فلانی */}
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDButton onClick={showForm} color="info" variant="contained">
              <Icon fontSize="small" style={{ marginLeft: '.3rem' }}>
                add_circle
              </Icon>
              دستگاه جدید
            </MDButton>
            <MDButton
              onClick={showAddProvinceForm}
              color="primary"
              variant="contained"
            >
              <Icon fontSize="small" style={{ marginLeft: '.3rem' }}>
                library_add
              </Icon>
              افزودن دستگاه‌های استان
            </MDButton>
            {isAddFormVisible && (
              <AddDeviceForm
                deviceSelect={deviceSelect}
                formSubmit={formSubmit}
                isAddFormVisible={isAddFormVisible}
              />
            )}
            {isAddProvinceFormVisible && (
              <AddProvinceForm
                provinceSelect={provinceSelect}
                selectedProvinceId={selectedProvinceId}
                formProvinceSubmit={formProvinceSubmit}
                isAddProvinceFormVisible={isAddProvinceFormVisible}
              />
            )}
          </MDBox>
          <MDBox py={3}>
            <DataGridRtl
              rows={rows}
              columns={columns}
              loading={isLoading}
              columnVisibilityModel={{ id: false }}
            />
          </MDBox>
        </>
      )}
    </>
  )
}
