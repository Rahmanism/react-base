import { forwardRef } from 'react'

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// Custom styles for MDButton
import MDButtonRoot from 'components/MDButton/MDButtonRoot'

// contexts
import { useMaterialUIController } from 'context'

const MDButton = forwardRef(
  ({ color = 'white', variant = 'contained', size = 'medium', circular = false, iconOnly = false, children, ...rest }, ref) => {
    const [controller] = useMaterialUIController()
    const { darkMode } = controller

    return (
      <MDButtonRoot
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === 'gradient' ? 'contained' : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </MDButtonRoot>
    )
  }
)

// Typechecking props for the MDButton
MDButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['text', 'contained', 'outlined', 'gradient']),
  color: PropTypes.oneOf([
    'white',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default MDButton
