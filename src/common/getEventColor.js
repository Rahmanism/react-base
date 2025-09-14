import { EventStatus, TheColors, TheColorsCodes } from './consts'

/**
 * Gets the suitable color name based on the event type code.
 *
 * @param {string} eventTypeCode - The event type code that came from API.
 * @returns {string} A color from the `TheColors` (default, primary, error , ...)
 */
export default function getEventColor(eventTypeCode) {
  const status = getEventStatus(eventTypeCode)
  switch (status) {
    case EventStatus.success:
      return TheColors[TheColorsCodes.success]
    case EventStatus.ok:
      return TheColors[TheColorsCodes.primary]
    case EventStatus.warning:
      return TheColors[TheColorsCodes.warning]
    case EventStatus.error:
      return TheColors[TheColorsCodes.error]
    default:
      return TheColors[TheColorsCodes.default]
  }
}

export const getEventStatus = (eventTypeCode) => {
  switch (eventTypeCode) {
    case 'RemoteOpening':
    case 'RemoteClosing':
    case 'RemoteNormalOpening':
    case 'NormalPunchOpen':
    case 'DoorOpenedCorrectly':
    case 'DoorClosedCorrectly':
      return EventStatus.success
    case 'EmergencyPasswordOpen':
    case 'CancelAlarm':
    case 'DeviceStart':
      return EventStatus.ok
    case 'TooShortPunchInterval':
    case 'OpeningTimeout':
      return EventStatus.warning
    case 'UnregisteredCard':
    case 'OpenedAccidentally':
    case 'Error':
      return EventStatus.error
    default:
      return EventStatus.ok
  }
}