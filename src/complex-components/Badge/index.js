import { useState } from 'react'
import MDBox from 'components/MDBox'
import MDBadge from 'components/MDBadge'

function TwoState(options) {
  const {
    ok = true,
    okTitle = 'فعال',
    notOkTitle = 'غیرفعال',
    okColor = 'success',
    notOkColor = 'dark',
    onClick,
    data,
    ...rest
  } = options
  const [okState, setOkState] = useState(ok)

  const clicked = () => {
    if (!onClick) return
    setOkState((v) => !v)
    onClick(!okState, data)
  }

  if (okState) {
    return (
      <MDBox ml={-1} {...rest} onClick={clicked}>
        <MDBadge
          badgeContent={okTitle}
          color={okColor}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    )
  }
  return (
    <MDBox ml={-1} {...rest} onClick={clicked}>
      <MDBadge
        badgeContent={notOkTitle}
        color={notOkColor}
        variant="gradient"
        size="sm"
      />
    </MDBox>
  )
}

// TwoState.propTypes = {
//   ok: PropTypes.bool.isRequired,
//   okTitle: PropTypes.string.isRequired,
//   notOkTitle: PropTypes.string.isRequired,
//   okColor: PropTypes.string.isRequired,
//   notOkColor: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   data: PropTypes.node.isRequired,
//   rest: PropTypes.node,
// }

export default TwoState
