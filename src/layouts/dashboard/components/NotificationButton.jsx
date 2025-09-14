import { Notifications } from '@mui/icons-material'
import { Fab } from '@mui/material'

/**
 * A button to display notifications in the left bottom of dashbaord screen.
 * @returns Notification button
 */
function NotificationButton() {
  return (
    <Fab
      color="primary"
      aria-label="notification"
      className="fab"
    >
      <Notifications fontSize="medium" />
    </Fab>
  )
}

export default NotificationButton
