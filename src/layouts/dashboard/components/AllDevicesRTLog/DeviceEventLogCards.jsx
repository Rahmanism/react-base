import { Grid2 } from '@mui/material'
import { DeviceApi } from 'api'
import { TheColors, TheColorsCodes } from 'common'
import MDBox from 'components/MDBox'
import DeviceCard from '../DeviceCard'

function DeviceEventLogCards(data) {
  const { events, auxiliaryAction } = data
  const deviceApiObj = new DeviceApi()

  const cards = events.map((item, i) => {
    // we don't want TheColors[0] becuase it's white
    // and the color is white too.
    const color = TheColors[TheColorsCodes.info] // TheColors[(i % 7) + 1]
    const device = { ...item.device }

    return (
      <Grid2 item xs={12} md={6} lg={4} xl={3} key={device.ip}>
        <MDBox mb={1.5}>
          <DeviceCard
            api={deviceApiObj}
            key={device.ip}
            color={color}
            device={device}
            event={item}
            auxiliaryAction={auxiliaryAction}
          />
        </MDBox>
      </Grid2>
    )
  })
  return cards
}

export default DeviceEventLogCards
