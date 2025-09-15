import { useState, useRef, useEffect } from 'react'

import { Icon, Tooltip } from '@mui/material'
import Grid from '@mui/material/Grid'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'

import { UserApi } from 'api'
import Loading from 'components/Loading'
import { tSuccess, tLoading, tError } from 'common/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Consts } from 'common'
import { DialogResult } from 'components/MyDialog'
import TwoState from 'complex-components/Badge'
import useUsers from './useUsers'
import EditForm from './editForm'
import { GridActionsCellItem } from '@mui/x-data-grid'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'

const defaultUser = {
  id: 0,
  givenName: '',
  username: '',
  password: '',
  role: '2',
  cardId: '',
  enabled: true,
  canLogin: false,
}

export default function UserList() {
  const columns = [
    { headerName: 'نام کاربری', field: 'username', flex: 1, maxWidth: 300 },
    { headerName: 'نام نمایشی', field: 'givenName', flex: 1, maxWidth: 300 },
    {
      headerName: 'نقش',
      field: 'role',
      flex: 1,
      maxWidth: 200,
      description: 'ادمین یا کاربر',
      valueGetter: (value) => {
        return value === '1' ? 'ادمین' : 'کاربر'
      },
    },
    {
      headerName: 'شناسه کارت',
      field: 'cardId',
      flex: 1,
      maxWidth: 200,
      align: 'left',
    },
    {
      headerName: 'امکان لاگین',
      field: 'canLogin',
      flex: 1,
      maxWidth: 200,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <TwoState key={`${params.id}-${params.value}`} ok={params.value} />
        )
      },
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      width: 250,
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
        ]
      },
    },
  ]

  const queryClient = useQueryClient()
  const [isShowingForm, setIsShowingForm] = useState(false)
  const apiObj = new UserApi()
  const [rows, setRows] = useState([])
  const [currentItem, setCurrentItem] = useState(defaultUser)
  const toastId = useRef(0)
  const dataRef = useRef()

  const { data: users, isLoading: usersIsLoading } = useUsers()
  // const { isStale } = useUsers(processData)

  const showForm = () => {
    setCurrentItem(defaultUser)
    setIsShowingForm(true)
  }

  // function gotoPermissions(e) {
  //   let row = rows.filter((i) => i.id == e.target.dataset.id)
  //   if (row.length < 1) return
  //   row = row[0]
  // }

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      toastId.current = tLoading()
      return apiObj.remove({
        id,
        showError: false,
      })
    },
    onSuccess: (data) => {
      tSuccess(data, toastId.current)
      queryClient.invalidateQueries([apiObj.apiUrl], { exact: true })
    },
    onError: () => tError(Consts.delete_failed, toastId.current),
  })

  const deleteThis = (id) => {
    if (id !== null && window.confirm(Consts.delete_question)) {
      deleteMutation.mutate(+id)
    }
  }

  const editThis = (id) => {
    const currentUserId = +id
    setUserId(currentUserId)

    if (users == null) {
      queryClient.invalidateQueries([apiObj.apiUrl])
    }
    const item = users?.filter((i) => i.id === currentUserId)[0]
    if (!item) return

    setCurrentItem({
      id: item.id,
      givenName: item.givenName,
      username: item.username,
      password: '',
      role: item.role,
      cardId: item.cardId,
      enabled: item.enabled,
      canLogin: item.canLogin,
    })
    setIsShowingForm(true)
  }

  useEffect(() => {
    setRows(users)
  }, [users?.length])

  function saveMutationSuccess(data) {
    tSuccess(data.message, toastId.current)
    queryClient.resetQueries({
      queryKey: [apiObj.apiUrl],
      exact: true,
    })
    setCurrentItem(defaultUser)
  }

  const addMutation = useMutation({
    mutationFn: (data) => {
      toastId.current = tLoading()
      return apiObj.add({ data, showError: false })
    },
    onSuccess: (data) =>
      saveMutationSuccess({ data: data.data, message: data.message }),
    onError: (err) => tError(err.message, toastId.current),
  })

  const editMutation = useMutation({
    mutationFn: (data) => {
      toastId.current = tLoading()
      return apiObj.edit({ data, showError: false })
    },
    onSuccess: (data) => saveMutationSuccess({ data, message: data }),
    onError: (err) => tError(err.message, toastId.current),
  })

  const formSubmit = (result, returnedItem) => {
    if (result === DialogResult.Ok) {
      dataRef.current = returnedItem
      setCurrentItem(returnedItem)
      if (returnedItem.id === 0) {
        addMutation.mutate(returnedItem)
      } else {
        editMutation.mutate(returnedItem)
      }
    }
    setIsShowingForm(false)
  }

  const isLoading =
    usersIsLoading ||
    deleteMutation.isPending ||
    addMutation.isPending ||
    editMutation.isPending

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
          کاربران
        </MDTypography>
      </MDBox>
      {isShowingForm && (
        <EditForm
          formSubmit={formSubmit}
          isShowingForm={isShowingForm}
          currentItem={currentItem}
        />
      )}
      <MDBox py={3}>
        <Grid container pb={3}>
          <MDButton onClick={showForm} color="primary" variant="contained">
            <Icon fontSize="small" style={{ marginLeft: '.3rem' }}>
              add_circle
            </Icon>
            افزودن کاربر جدید
          </MDButton>
        </Grid>
        <DataGridRtl rows={rows} columns={columns} loading={isLoading} />
      </MDBox>
    </>
  )
}
