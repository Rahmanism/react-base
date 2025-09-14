import { useState } from 'react'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDBadge from 'components/MDBadge'

import { Api, ApiUrls } from 'api'
import { useQuery } from '@tanstack/react-query'
import DataGridRtl from 'complex-components/Tables/DataGridRtl'

export default function DoorAccessLogList() {
  const columns = [
    { headerName: 'کاربر', field: 'userName', flex: 1, maxWidth: 200 },
    { headerName: 'زمان', field: 'moment', flex: 1, maxWidth: 500 },
    {
      headerName: 'شناسه کارت',
      field: 'cardId',
      flex: 1,
      maxWidth: 100,
      align: 'left',
    },
    {
      headerName: 'نتیجه',
      field: 'successful',
      flex: 1,
      maxWidth: 200,
      type: 'boolean',
      renderCell: (params) => {
        return (
          <MDBox ml={-1} key={`${params.id}-${params.value}`}>
            {params.row.successful && (
              <MDBadge
                badgeContent="موفق"
                color="success"
                variant="gradient"
                size="sm"
              />
            )}
            {!params.row.successful && (
              <MDBadge
                badgeContent="ناموفق"
                color="error"
                variant="gradient"
                size="sm"
              />
            )}
          </MDBox>
        )
      },
    },
    { headerName: 'درب', field: 'door', flex: 1, maxWidth: 100 },
    { headerName: 'دستگاه', field: 'deviceName', flex: 1, maxWidth: 300 },
  ]

  const [apiObj] = useState(new Api(ApiUrls.doorAccessLog))
  const [rows, setRows] = useState([])

  const loadData = useQuery({
    queryKey: [apiObj.apiUrl],
    queryFn: async () => await apiObj.getAll({ first: 0, count: 0 }),
    staleTime: Infinity,
    onSuccess: (data) => setRows(data),
  })

  return (
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
          لاگ دسترسی
        </MDTypography>
      </MDBox>
      <MDBox py={3}>
        <DataGridRtl
          rows={rows}
          columns={columns}
          loading={loadData.isLoading}
        />
      </MDBox>
    </>
  )
}
