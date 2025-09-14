import { lazy, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Grid2, Icon, Tooltip } from '@mui/material'
import { tSuccess, tError, tLoading } from 'common/toast'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

import DeviceApi from 'api/device'
import Loading from 'components/Loading'
import { Consts } from 'common'
import MyDialog, { DialogResult } from 'components/MyDialog'
import { getBaseUrl } from 'api/urls'
import MDButton from 'components/MDButton'
import useDevices from './useDevices'
import EditDevice from './editDevice'
import DeviceCameraDialog from './deviceCameraDialog'
import DeviceRTEventsDialog from './DeviceRTEventsDialog'
import { GridActionsCellItem } from '@mui/x-data-grid'
// import { goto } from 'common/common'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'

const defaultDevice = {
  id: 0,
  name: '',
  ip: '',
  mac: '',
  provinceId: 0,
  cameraIP: '',
}

const DoorAccessLogList2 = lazy(() => import('layouts/doorAccessLog/index2'))

export default function DeviceList() {
  const columns = [
    {
      headerName: 'نام',
      field: 'name',
      description: 'نام دستگاه',
      flex: 1,
      maxWidth: 300,
    },
    { headerName: 'IP', field: 'ip', flex: 1, maxWidth: 200 },
    { headerName: 'MAC', field: 'mac', flex: 1, maxWidth: 200 },
    {
      headerName: 'استان',
      field: 'provinceTitle',
      description: '',
      flex: 1,
      maxWidth: 200,
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      width: 450,
      align: 'center',
      type: 'actions',
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="ویرایش">
                <Icon fontSize="small" color="warning" data-id={id}>
                  edit
                </Icon>
              </Tooltip>
            }
            label="ویرایش"
            onClick={() => editThis(id)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="حذف">
                <Icon fontSize="small" color="error" data-id={id}>
                  delete
                </Icon>
              </Tooltip>
            }
            label="حذف"
            onClick={() => deleteThis(id)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="بررسی اتصال دستگاه">
                <Icon
                  fontSize="small"
                  color="info"
                  baseClassName="material-icons-outlined"
                  data-id={id}
                >
                  beenhere
                </Icon>
              </Tooltip>
            }
            onClick={() => connectToDevice(id)}
            label="بررسی اتصال دستگاه"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="قطع اتصال">
                <Icon fontSize="small" color="action" data-id={id}>
                  sensors_off
                </Icon>
              </Tooltip>
            }
            onClick={() => disconnect(id)}
            label="قطع اتصال"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="قطع آلارم دستگاه">
                <Icon fontSize="small" color="warning" data-id={id}>
                  alarm_off
                </Icon>
              </Tooltip>
            }
            onClick={() => cancelAlarm(id)}
            label="قطع آلارم دستگاه"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="راه‌اندازی مجدد دستگاه">
                <Icon fontSize="small" color="info" data-id={id}>
                  restart_alt
                </Icon>
              </Tooltip>
            }
            onClick={() => restartDevice(id)}
            label="راه‌اندازی مجدد دستگاه"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="مشاهده لاگ دستگاه">
                <Icon fontSize="small" color="primary" data-id={id}>
                  event_note
                </Icon>
              </Tooltip>
            }
            onClick={() => {
              setIsShowingLogDialog(true)
              setDeviceId(id)
              setDeviceName(row.name)
            }}
            // goto(`/reports?id=${id}`)
            label="مشاهده لاگ دستگاه"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="باز کردن در">
                <Icon fontSize="small" color="info" data-id={id}>
                  meeting_room
                </Icon>
              </Tooltip>
            }
            onClick={() => openDoor(id)}
            label="باز کردن در"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="مشاهده دوربین">
                <Icon fontSize="small" color="error" data-id={id}>
                  camera_alt
                </Icon>
              </Tooltip>
            }
            onClick={() => getCamStream(id)}
            label="مشاهده دوربین"
          />,
          // <GridActionsCellItem
          //   icon={
          //     <Tooltip title="مشاهده لاگ زنده">
          //       <Icon
          //         fontSize="small"
          //         color="info"
          //         data-id={id}
          //         data-name={row.name}
          //       >
          //         dvr
          //       </Icon>
          //     </Tooltip>
          //   }
          //   onClick={() => showRTEventsLog(id, row.name)}
          //   label="مشاهده لاگ زنده"
          // />,
        ]
      },
    },
  ]

  const queryClient = useQueryClient()
  const [isShowingForm, setIsShowingForm] = useState(false)
  const [isShowingCamDialog, setIsShowingCamDialog] = useState(false)
  const [isShowingLogDialog, setIsShowingLogDialog] = useState(false)
  const [streamUrl, setStreamUrl] = useState({})
  const [isShowingRTEventsDialog, setIsShowingRTEventsDialog] = useState(false)
  const apiObj = new DeviceApi()
  const [item, setItem] = useState(defaultDevice)
  const [deviceId, setDeviceId] = useState()
  const [deviceName, setDeviceName] = useState('')
  const toastId = useRef(0)

  const { data: devices, isLoading: devicesIsLoading } = useDevices()

  const connectToDevice = (id) => {
    apiObj.connectDevice({
      id: +id,
      resolve: (result) => {
        tSuccess(result)
      },
    })
  }

  const disconnect = (id) => {
    apiObj.disconnect({
      id: +id,
      resolve: (result) => tSuccess(result),
    })
  }

  const cancelAlarm = (id) => {
    apiObj.cancelAlarm({
      id: +id,
      resolve: (result) => tSuccess(result),
    })
  }

  const restartDevice = (id) => {
    apiObj.restartDevice({
      id: +id,
      resolve: (result) => tSuccess(result),
    })
  }

  const editThis = (id) => {
    const currentDeviceId = +id
    setDeviceId(currentDeviceId)

    if (devices == null) {
      queryClient.invalidateQueries([apiObj.apiUrl])
    }
    const row = devices?.filter((i) => i.id === currentDeviceId)[0]
    if (!row) return

    setItem({
      id: row.id,
      name: row.name,
      ip: row.ip,
      mac: row.mac,
      provinceId: row.provinceId,
      cameraIP: row.cameraIP,
    })
    setIsShowingForm(true)
  }

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      toastId.current = tLoading()
      return apiObj.remove({ id, showError: false })
    },
    onSuccess: (data) => {
      tSuccess(data, toastId.current)
      queryClient.invalidateQueries([apiObj.apiUrl], { exact: true })
    },
    onError: () => {
      tError(Consts.delete_failed, toastId.current)
    },
  })

  const deleteThis = (id) => {
    if (id !== null && window.confirm(Consts.delete_question)) {
      deleteMutation.mutate(+id)
    }
  }

  const openDoor = (id) => {
    apiObj.openDoor({
      deviceId: +id,
      doorId: 1,
      resolve: (result) => tSuccess(result),
      reject: (result) => tError(result),
    })
  }

  const getCamStream = (id) => {
    apiObj.getCamStream({
      deviceId: +id,
      resolve: (result) => {
        setIsShowingCamDialog(true)
        setStreamUrl(getBaseUrl(true) + result)
      },
      reject: (result) => tError(result),
    })
  }

  const showRTEventsLog = (id, name) => {
    const currentDeviceId = +id
    setDeviceId(currentDeviceId)
    const currentDeviceName = name
    setDeviceName(currentDeviceName)
    setIsShowingRTEventsDialog(true)
  }

  function saveMutationSuccess(data) {
    tSuccess(data?.message ?? Consts.save_success, toastId.current)
    queryClient.resetQueries([apiObj.apiUrl])
    setItem(defaultDevice)
  }

  const addMutation = useMutation({
    mutationFn: (deviceData) => {
      toastId.current = tLoading()
      return apiObj.add({ data: deviceData, showError: false })
    },
    onSuccess: (data) =>
      saveMutationSuccess({ data: data.data, message: data.message }),
    onError: (err) => tError(err.message, toastId.current),
  })

  const editMutation = useMutation({
    mutationFn: (deviceData) => {
      toastId.current = tLoading()
      return apiObj.edit({ data: deviceData, showError: false })
    },
    onSuccess: (data) => saveMutationSuccess({ data, message: data }),
    onError: (err) => tError(err.message, toastId.current),
  })

  const formSubmit = (result, returnedItem) => {
    if (result === DialogResult.Ok) {
      setItem(returnedItem)
      if (returnedItem.id === 0) {
        addMutation.mutate(returnedItem)
      } else {
        editMutation.mutate(returnedItem)
      }
    }
    setIsShowingForm(false)
  }

  const showForm = () => {
    setItem(defaultDevice)
    setIsShowingForm(true)
  }

  const isLoading =
    devicesIsLoading ||
    deleteMutation.isLoading ||
    addMutation.isLoading ||
    editMutation.isLoading

  return (
    <>
      {isLoading && Loading()}
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
          دستگاه‌ها
        </MDTypography>
      </MDBox>
      {isShowingForm && (
        <EditDevice
          formSubmit={formSubmit}
          isShowingForm={isShowingForm}
          item={item}
        />
      )}
      {(streamUrl !== '' || Object.keys(streamUrl).length !== 0) && (
        <DeviceCameraDialog
          streamUrl={streamUrl}
          isShowingForm={isShowingCamDialog}
          onClose={() => setIsShowingCamDialog(false)}
        />
      )}
      {isShowingLogDialog && (
        <MyDialog
          open={isShowingLogDialog}
          showCloseOnly
          close={() => setIsShowingLogDialog(false)}
          fullWidth
          maxWidth="xl"
        >
          <DoorAccessLogList2
            showingInDialog={true}
            deviceIdToShow={deviceId}
            deviceNameToShow={deviceName}
          />
        </MyDialog>
      )}
      {isShowingRTEventsDialog && (
        <DeviceRTEventsDialog
          deviceId={deviceId}
          deviceName={deviceName}
          isShowingForm={isShowingRTEventsDialog}
          onClose={() => setIsShowingRTEventsDialog(false)}
        />
      )}
      <MDBox py={3}>
        <Grid2 container pb={3}>
          <MDButton onClick={showForm} color="primary" variant="contained">
            <Icon fontSize="small" style={{ marginLeft: '.3rem' }}>
              add_circle
            </Icon>
            افزودن دستگاه جدید
          </MDButton>
        </Grid2>
        <DataGridRtl
          rows={devices || []}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.id}
        />
      </MDBox>
    </>
  )
}
