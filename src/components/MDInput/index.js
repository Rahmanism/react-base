import { forwardRef } from 'react'

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// Custom styles for MDInput
import MDInputRoot from 'components/MDInput/MDInputRoot'

const MDInput = forwardRef(({ error = false, success = false, disabled = false, ...rest }, ref) => (
  <MDInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
))

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default MDInput
