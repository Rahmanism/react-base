import { forwardRef } from 'react'

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// Custom styles for MDTypography
import MDTypographyRoot from 'components/MDTypography/MDTypographyRoot'

// contexts
import { useMaterialUIController } from 'context'

const MDTypography = forwardRef(
  (
    {
      color = 'dark',
      fontWeight = false,
      textTransform = 'none',
      verticalAlign = 'unset',
      textGradient = false,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController()
    const { darkMode } = controller

    return (
      <MDTypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode,
        }}
      >
        {children}
      </MDTypographyRoot>
    )
  }
)

// Typechecking props for the MDTypography
MDTypography.propTypes = {
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'text',
    'white',
  ]),
  fontWeight: PropTypes.oneOf([false, 'light', 'regular', 'medium', 'bold']),
  textTransform: PropTypes.oneOf([
    'none',
    'capitalize',
    'uppercase',
    'lowercase',
  ]),
  verticalAlign: PropTypes.oneOf([
    'unset',
    'baseline',
    'sub',
    'super',
    'text-top',
    'text-bottom',
    'middle',
    'top',
    'bottom',
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
}

export default MDTypography
