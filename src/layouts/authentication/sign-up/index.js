// react-router-dom components
import { Link } from 'react-router-dom'

// @mui material components
import Card from '@mui/material/Card'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'

// Images
import bgImage from 'assets/images/bg.jpeg'

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            به ما بپیوندید
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            نام کاربری و کلمه عبور خود را برای ثبت نام وارد کنید.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="نام" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="ایمیل"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="کلمه عبور"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                ثبت نام
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                {`حساب کاربری دارید؟   `}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  ورود
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  )
}

export default Cover
