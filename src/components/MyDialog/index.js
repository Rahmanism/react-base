import { forwardRef } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MDButton from 'components/MDButton'

const Transition = forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
))

export const DialogResult = {
  Cancel: 'cancel',
  Ok: 'ok',
}

function MyDialog(options) {
  const {
    open,
    close,
    title,
    children,
    showCloseOnly = false,
    // True will set the width to maxWidth
    fullWidth = false,
    // possible values: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    maxWidth = 'md',
    ...rest
  } = options

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClose = (result) => {
    close?.(result)
  }

  const handleCancel = () => {
    handleClose(DialogResult.Cancel)
  }

  const handleOk = () => {
    handleClose(DialogResult.Ok)
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      {...rest}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ minWidth: '400px' }}>{children}</DialogContent>
      <DialogActions>
        {showCloseOnly && (
          <MDButton onClick={handleOk} variant="gradient" color="primary">
            بستن
          </MDButton>
        )}
        {!showCloseOnly && (
          <>
            <MDButton
              onClick={handleCancel}
              variant="outlined"
              color="secondary"
            >
              لغو
            </MDButton>
            <MDButton onClick={handleOk} variant="gradient" color="success">
              موافقم
            </MDButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default MyDialog
