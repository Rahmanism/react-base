import { useState } from 'react'
import MDBox from 'components/MDBox'
import MDInput from 'components/MDInput'
import MDTypography from 'components/MDTypography'
import MyDialog from 'components/MyDialog'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

/**
 * A dialog for editing (or adding) a user.
 *
 * @param {function} options.formSubmit - The form submit function.
 * @param {boolean} options.isShowingForm - Indicates whether the form is currently being shown.
 * @param {Object} options.currentItem - The current user data. If it's a new user, it should be default user data.
 * @return {JSX.Element} The JSX element representing the form.
 */
export default function EditForm(options) {
  const { formSubmit, isShowingForm, currentItem } = options
  const [currentUser, setCurrentUser] = useState(currentItem)

  const submit = (result) => {
    if (formSubmit) {
      formSubmit(result, currentUser)
    }
  }

  return (
    <MyDialog
      title={currentItem.id === 0 ? 'کاربر جدید' : 'ویرایش کاربر'}
      close={submit}
      open={isShowingForm}
    >
      <MDBox
        px={3}
        py={3}
        mt={3}
        component="form"
        role="form"
        style={{ width: 'min(30rem, 80cqw)' }}
      >
        <MDBox mb={2}>
          <MDInput
            label="نام نمایشی"
            value={currentUser.givenName ?? ''}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, givenName: e.target.value })
            }
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="نام کاربری"
            value={currentUser.username ?? ''}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, username: e.target.value })
            }
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="کلمه عبور"
            onChange={(e) =>
              setCurrentUser({ ...currentUser, password: e.target.value })
            }
          />
          {currentUser.id !== 0 && (
            <MDBox>
              <MDTypography
                variant="caption"
                color="secondary"
                fontWeight="light"
                size="small"
              >
                اگر مایل به تغییر رمز عبور نیستید، این قسمت را خالی بگذارید.
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
        <MDBox mb={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser.canLogin}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      canLogin: e.target.checked,
                    })
                  }
                />
              }
              label={
                <MDTypography variant="body2" component="p" color="text">
                  امکان لاگین به پنل وب
                </MDTypography>
              }
            />
          </FormGroup>
        </MDBox>
        <MDBox mb={4}>
          <InputLabel id="demo-simple-select-label">نقش</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentUser.role}
            label="نقش"
            style={{ width: '150px' }}
            className="MuiInputBase-input MuiOutlinedInput-input rtl-5mmmz-MuiInputBase-input-MuiOutlinedInput-input"
            onChange={(e) =>
              setCurrentUser({ ...currentUser, role: e.target.value })
            }
          >
            <MenuItem value="2" selected={currentUser.role === '2'}>
              کاربر
            </MenuItem>
            <MenuItem value="1" selected={currentUser.role === '1'}>
              ادمین
            </MenuItem>
          </Select>
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="شناسه کارت"
            value={currentUser.cardId ?? ''}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, cardId: e.target.value })
            }
          />
        </MDBox>
      </MDBox>
    </MyDialog>
  )
}
