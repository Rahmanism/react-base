import { useState } from 'react'

// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDAlert from 'components/MDAlert'
import MDSnackbar from 'components/MDSnackbar'
import MDButton from 'components/MDButton'
// import MDSnackbar from 'components/MDSnackbar'

function Notifications() {
  const [successSB, setSuccessSB] = useState(false)
  const [infoSB, setInfoSB] = useState(false)
  const [warningSB, setWarningSB] = useState(false)
  const [errorSB, setErrorSB] = useState(false)

  const openSuccessSB = () => setSuccessSB(true)
  const closeSuccessSB = () => setSuccessSB(false)
  const openInfoSB = () => setInfoSB(true)
  const closeInfoSB = () => setInfoSB(false)
  const openWarningSB = () => setWarningSB(true)
  const closeWarningSB = () => setWarningSB(false)
  const openErrorSB = () => setErrorSB(true)
  const closeErrorSB = () => setErrorSB(false)

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{' '}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  )

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  )

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  )

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  )

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  )

  return (
    <Grid container justifyContent="center">
      <Grid size={{ xs: 12, lg: 8 }}>
        <Card>
          <MDBox p={2}>
            <MDTypography variant="h5">اعلان‌ها</MDTypography>
          </MDBox>
          <MDBox pt={2} px={2}>
            <MDAlert color="success" dismissible>
              {alertContent('success')}
            </MDAlert>
          </MDBox>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <Card>
          <MDBox p={2} lineHeight={0}>
            <MDTypography variant="h5">Notifications</MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              Notifications on this page use Toasts from Bootstrap. Read more details here.
            </MDTypography>
          </MDBox>
          <MDBox p={2}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
                  success notification
                </MDButton>
                {renderSuccessSB}
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                  info notification
                </MDButton>
                {renderInfoSB}
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
                  warning notification
                </MDButton>
                {renderWarningSB}
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                  error notification
                </MDButton>
                {renderErrorSB}
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Notifications
