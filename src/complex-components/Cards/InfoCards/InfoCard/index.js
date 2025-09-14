import { useMemo } from 'react'

// prop-types is library for typechecking of props
import PropTypes from 'prop-types'

// @mui material components
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import { ActionType } from 'common'
import { Link } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material'
import colors from 'assets/theme/base/colors'
import getEventColor from 'common/getEventColor'
import DeviceEventLog from './DeviceEventLog'

function InfoCard({ color = 'info', icon, title = '', description = '', actions = ActionType.command, event = null }) {
  const renderActions = actions?.map(
    ({
      commandType,
      command,
      color: actionColor,
      icon: actionIcon,
      title: actionTitle,
      ...rest
    }) => {
      switch (commandType) {
        case ActionType.Command:
          return (
            <Tooltip key={`${command}-${actionIcon}`} title={actionTitle}>
              <IconButton
                onClick={() => (command ? command() : null)}
                color={actionColor}
                {...rest}
              >
                <Icon fontSize="medium" color="inherit">
                  {actionIcon}
                </Icon>
              </IconButton>
            </Tooltip>
          )
        case ActionType.InternalLink:
          return (
            <Tooltip key={`${command}-${actionIcon}`} title={actionTitle}>
              <IconButton
                key={`${command}-${actionIcon}`}
                component={Link}
                to={command}
                color={actionColor}
                {...rest}
              >
                <Icon fontSize="medium" color="inherit">
                  {actionIcon}
                </Icon>
              </IconButton>
            </Tooltip>
          )
        case ActionType.ExternalLink:
          return (
            <Tooltip key={`${command}-${actionIcon}`} title={actionTitle}>
              <IconButton
                key={`${command}-${actionIcon}`}
                component="a"
                href={command}
                target="_blank"
                rel="noreferrer"
                color={actionColor}
                {...rest}
              >
                <Icon fontSize="medium" color="inherit">
                  {actionIcon}
                </Icon>
              </IconButton>
            </Tooltip>
          )
        default:
          return (
            <Tooltip key={`${command}-${actionIcon}`} title={actionTitle}>
              <IconButton
                key={`${command}-${actionIcon}`}
                component="span"
                onClick={command}
                rel="noreferrer"
                color={actionColor}
                {...rest}
              >
                <Icon fontSize="medium" color="inherit">
                  {actionIcon}
                </Icon>
              </IconButton>
            </Tooltip>
          )
      }
    }
  )

  const eventColor = useMemo(
    () => getEventColor(event.eventTypeCode),
    [event.eventTypeCode]
  )

  const eventColorValue = colors[eventColor]?.main

  return (
    <Card
      style={{
        background: `color-mix(in srgb, ${eventColorValue} 1%, rgba(0, 0, 0, 0))`,
      }}
    >
      <MDBox
        display="flex"
        justifyContent="space-between"
        pt={1}
        px={2}
        style={{
          borderRadius: '.75rem',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          background: `color-mix(in srgb, ${eventColorValue} 90%, rgba(0, 0, 0, 0))`,
        }}
      >
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === 'light' ? 'dark' : 'white'}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography
            variant="h4"
            fontSize="large"
            fontWeight="regular"
            color="dark"
          >
            {title}
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2} lineHeight={1.25}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {description && (
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </MDTypography>
          )}
          {event && <DeviceEventLog eventColor={eventColor} event={event} />}
        </div>
        {description && !actions ? null : <Divider />}
        {actions && renderActions}
      </MDBox>
    </Card>
  )
}

// Typechecking props for the InfoCard
InfoCard.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
  event: PropTypes.objectOf(PropTypes.object),
  // PropTypes.oneOf(Object.keys(ActionType)),
}

export default InfoCard
