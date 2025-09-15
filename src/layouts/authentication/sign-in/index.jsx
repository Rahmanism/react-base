import { useState } from 'react'

// react-router-dom components
import { useNavigate, Navigate } from 'react-router-dom'

// @mui material components
import Card from '@mui/material/Card'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout'

// Images
import bgImage from 'assets/images/bg.jpeg'

import Login from 'api/login'
import { tSuccess, tError } from 'common/toast'
import { setUserRole, useMaterialUIController } from 'context'

function Basic() {
  const [isAuthenticated] = useState(localStorage.getItem('token')?.length > 0)

  // const [rememberMe, setRememberMe] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorVisible, setErrorVisible] = useState(false)

  const login = new Login()
  const navigate = useNavigate()

  // const handleSetRememberMe = () => setRememberMe(!rememberMe)

  const emailChange = (e) => {
    setUsername(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const loginData = {
    username,
    password,
  }
  const [controller, dispatch] = useMaterialUIController()

  const loginSuccessful = (loginResult) => {
    localStorage.setItem('token', loginResult)
    login
      .tokenData(loginResult)
      .then((user) => setUserRole(dispatch, +user.role))

    tSuccess('ورود با موفقیت انجام شد.')
    navigate('/dashboard', { replace: true })
  }

  const loginUnsuccessful = (loginResult) => {
    if (loginResult.status === 404) {
      setErrorVisible(true)
    } else {
      tError('مشکلی در ورود به سایت پیش آمده.')
    }
  }

  const signInClick = async (e) => {
    e?.preventDefault()

    // await login.tryLogin({
    //   data: loginData,
    //   resolve: loginSuccessful,
    //   reject: loginUnsuccessful,
    // })

    // TODO: This line should be removed and the await call above must be uncommented.
    loginSuccessful()
  }

  const editKeyDown = (e) => {
    if (e.key === 'Enter') {
      signInClick()
    }
  }

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            ورود
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {errorVisible && (
            <MDBox component="div">
              <div style={{ color: 'red' }}>ایمیل یا رمز عبور اشتباه است.</div>
            </MDBox>
          )}
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="username"
                label="نام کاربری"
                fullWidth
                onChange={emailChange}
                onKeyDown={editKeyDown}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="کلمه عبور"
                fullWidth
                onChange={passwordChange}
                onKeyDown={editKeyDown}
              />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;مرا به خاطر بسپار
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={signInClick}
              >
                ورود
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                {`آیا حساب کاربری ندارید؟      `}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  ثبت نام
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  )
}

export default Basic
