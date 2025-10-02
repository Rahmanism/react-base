import { useMemo, useEffect, useState } from 'react'

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// react-table components
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

// @mui material components
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Icon from '@mui/material/Icon'
import Autocomplete from '@mui/material/Autocomplete'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDPagination from 'components/MDPagination'

// example components
import DataTableHeadCell from 'complex-components/Tables/DataTable/DataTableHeadCell'
import DataTableBodyCell from 'complex-components/Tables/DataTable/DataTableBodyCell'
import { TableCell } from '@mui/material'

function DataTable({
  entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch = false,
  showTotalEntries = true,
  table,
  paginationView = { variant: 'gradient', color: 'info' },
  isSorted = true,
  noEndBorder = false,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ['5', '10', '15', '20', '25']
  const columns = useMemo(() => table.columns, [table])
  const data = useMemo(() => table.rows, [table])

  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const tableInstance = useReactTable({
    columns,
    data,
    initialState: {
      pagination: {
        pageIndex: 0,
      },
    },
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const {
    getHeaderGroups,
    getRowModel,
    getPaginationRowModel,
    getPageOptions,
    getCanPreviousPage,
    getCanNextPage,
    gotoPage,
    nextPage,
    getPageCount,
    previousPage,
    setPageSize,
  } = tableInstance

  console.log('%ccolumns', 'font-size: large; color: blue')
  console.log(columns)
  console.log('tableinstce columns:', tableInstance.getAllColumns())
  console.log('%crows (data)', 'font-size: large; color: green; font-weight: bold;')
  console.log(data)
  console.log('tableinstance rows: ', tableInstance.getPaginationRowModel().rows)

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue])

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value)

  // Render the paginations
  const renderPagination = getPageOptions().map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pagination.pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ))

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > getPageOptions().length || value < 0 ? gotoPage(0) : gotoPage(Number(value))

  // Customized page options starting from 1
  const customizedPageOptions = getPageOptions().map((option) => option + 1)

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1))

  // Search input value state
  const [search, setSearch] = useState(globalFilter)

  // Search input state handle
  const onSearchChange = (value) => {
    setGlobalFilter(value || undefined)
  }
  // const onSearchChange = useAsyncDebounce((value) => {
  //   setGlobalFilter(value || undefined)
  // }, 100)

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? 'desc' : 'asce'
    } else if (isSorted) {
      sortedValue = 'none'
    } else {
      sortedValue = false
    }

    return sortedValue
  }

  // Setting the entries starting point
  const entriesStart =
    pagination.pageIndex === 0
      ? pagination.pageIndex + 1
      : pagination.pageIndex * pagination.pageSize + 1

  // Setting the entries ending point
  let entriesEnd

  if (pagination.pageIndex === 0) {
    entriesEnd = pagination.pageSize
  } else if (pagination.pageIndex === getPageOptions().length - 1) {
    entriesEnd = getRowModel().rows.length
  } else {
    entriesEnd = pagination.pageSize * (pagination.pageIndex + 1)
  }

  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {entriesPerPage || canSearch ? (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10))
                }}
                size="small"
                sx={{ width: '5rem' }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
              <MDInput
                placeholder="جستجو..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }) => {
                  setSearch(search)
                  onSearchChange(currentTarget.value)
                }}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table>
        <MDBox component="thead">
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id ?? headerGroup.field}>
              {headerGroup.headers.map((header) => (
                <DataTableHeadCell
                  key={header.id ?? header.field}
                  width={header.column.columnDef.width ? header.column.columnDef.width : 'auto'}
                  align={header.column.columnDef.align ? header.column.columnDef.align : 'left'}
                  // sorted={setSortedValue(header)}
                  // sorted={header.column.getIsSorted()}
                  onClick={
                    header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody>
          {getPaginationRowModel().rows.map((row, key) => (
            <TableRow key={row.id}>
              {console.log('visible cells:')}
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  align={cell.column.columnDef.align ? cell.column.columnDef.align : 'left'}
                >
                  {cell.getValue()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && getPageOptions().length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              نمایش {entriesStart} تا {entriesEnd} از {rows.length} رکورد
            </MDTypography>
          </MDBox>
        )}
        {getPageOptions().length > 1 && (
          <MDPagination
            variant={paginationView.variant ? paginationView.variant : 'gradient'}
            color={paginationView.color ? paginationView.color : 'info'}
          >
            {getCanPreviousPage() && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{
                    type: 'number',
                    min: 1,
                    max: customizedPageOptions.length,
                  }}
                  value={customizedPageOptions[pagination.pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {getCanNextPage() && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  )
}

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.Object).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(['contained', 'gradient']),
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'light',
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
}

export default DataTable
