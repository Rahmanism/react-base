import { forwardRef } from 'react'

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// Custom styles for MDAvatar
import MDAvatarRoot from 'components/MDAvatar/MDAvatarRoot'

const MDAvatar = forwardRef(({ 
  bgColor = 'rgba(0, 0, 0, 0)', 
  size = 'md', 
  shadow = 'none', 
  ...rest 
}, ref) => (
  <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
))

// Typechecking props for the MDAvatar
MDAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    'rgba(0, 0, 0, 0)',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  shadow: PropTypes.oneOf([
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    'inset',
  ]),
}

export default MDAvatar
