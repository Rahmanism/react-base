import { useEffect, useMemo, useState } from 'react'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import { faIR } from '@mui/x-data-grid/locales'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import MDInput from 'components/MDInput'
import { Box } from '@mui/material'

// Create rtl cache
const cacheRtl = createCache({
  key: 'data-grid-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

/**
 * Custom toolbar for the DataGrid which contains a search all of the columns input
 *
 * @param {queryChange} onChange Runs if the query changes
 * @returns
 */
const CustomToolbar = ({ queryChange }) => {
  return (
    <GridToolbarContainer>
      <Box sx={{ flexGrow: 1 }} />
      {/* <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        /> */}
      <MDInput
        placeholder="جستجو در همه ستون‌ها"
        variant="standard"
        onChange={(e) => queryChange(e)}
      />
    </GridToolbarContainer>
  )
}

/**
 * A Right-to-Left MUI DataGrid
 *
 * @param {rows} data rows
 * @param {columns} data columns definition
 * @returns A React component that displays a Right-to-Left MUI DataGrid
 */
function DataGridRtl({ rows, columns, ...rest }) {
  const existingTheme = useTheme()

  // set the localRows state to the rows prop with checking if it's not empty
  const [localRows, setLocalRows] = useState([])
  useEffect(() => {
    if (rows?.length > 0) {
      setLocalRows([...rows])
    }
  }, [rows?.length])

  const queryChange = (e) => {
    const query = e.target.value ?? ''
    if (rows?.length < 1) return
    if (query?.trim().length < 1) {
      // clear out the filer and show all data
      setLocalRows([...rows])
    } else {
      // filter the data based on the query
      setLocalRows([
        ...rows.filter((row) => {
          return Object.keys(row).some((key) =>
            String(row[key]).toLowerCase().includes(query.toLowerCase())
          )
        }),
      ])
    }
  }

  const theme = useMemo(
    () =>
      createTheme({}, faIR, existingTheme, {
        direction: 'rtl',
      }),
    [existingTheme]
  )

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div
          dir="rtl"
          style={{
            width: '100%',
            minHeight: '400px',
            height: 'clamp(400px, 631px, 80vh - 200px)',
          }}
        >
          <DataGrid
            rows={localRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: { queryChange: queryChange },
            }}
            {...rest}
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default DataGridRtl
