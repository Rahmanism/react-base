import getEventColor from 'common/getEventColor'
import L from 'leaflet'

const MapMarker = (eventTypeCode = '') => {
  const eventColor = getEventColor(eventTypeCode)
  let color = ''
  switch (eventColor) {
    case 'success':
      color = '-green'
      break
    case 'warning':
      color = '-orange'
      break
    case 'error':
      color = '-red'
      break
    default:
      color = ''
  }
  return new L.Icon({
    iconUrl: `/css/images/marker-icon${color}.png`,
    iconRetinaUrl: `/css/images/marker-icon-2x${color}.png`,
    // iconAnchor: null,
    // popupAnchor: null,
    shadowUrl: '/css/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [8, 25],
    iconSize: new L.Point(25, 41),
    className: 'leaflet-marker-icon',
  })
}

export default MapMarker
