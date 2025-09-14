import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
import DeviceCard from '../DeviceCard'
import { DeviceApi } from 'api'
import { TheColors, TheColorsCodes } from 'common'
import MapMarker from './MapMarker'

const deviceApiObj = new DeviceApi()

function ZkmMap({
  auxiliaryAction,
  events = [{ lng: '51.265', lat: '35.7', locationTitle: 'Tehran' }],
}) {
  // The bounds are set for /tiles/map.jpg image.
  const bounds = [
    [40, 44],
    [23.4, 63.6],
  ]
  return (
    <MapContainer
      center={[31.95, 53.2]} // center of Iran
      zoom={6}
      style={{
        height: '90vh',
        maxHeight: '100vh',
        width: '90vw',
        maxWidth: '90vw',
      }}
      minZoom={6}
      maxZoom={8}
    >
      <ImageOverlay
        url="/tiles/map.jpg"
        bounds={bounds}
        zIndex={2}
        // opacity={.7}
      />
      {/* <TileLayer
        url="/tiles/{z}/{x}/{y}.png"
        attribution="ZKM Map"
        minZoom={6}
        maxZoom={8}
        zIndex={1}
      /> */}
      {events?.map((event, index) => (
        <Marker
          key={index}
          position={[event.lat, event.lng]}
          icon={MapMarker(event.eventTypeCode)}
        >
          <Popup>
            <DeviceCard
              api={deviceApiObj}
              key={event.device?.ip}
              color={TheColors[TheColorsCodes.info]}
              device={event.device ?? undefined}
              event={event}
              auxiliaryAction={auxiliaryAction}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default ZkmMap
