// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// components
import MDBox from 'components/MDBox'

function DataTableBodyCell({ noBorder = false, align = 'left', children }) {
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({
        palette: { light },
        typography: { size },
        borders: { borderWidth },
      }) => ({
        fontSize: size.sm,
        borderBottom: noBorder
          ? 'none'
          : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: 'middle' }}
      >
        {children}
      </MDBox>
    </MDBox>
  )
}

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right', 'center']),
}

export default DataTableBodyCell
