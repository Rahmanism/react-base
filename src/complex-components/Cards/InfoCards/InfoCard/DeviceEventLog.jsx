import MDTypography from 'components/MDTypography'
import React from 'react'

function DeviceEventLog(options) {
  const { event, eventColor } = options

  return (
    <MDTypography
      component="span"
      variant="body2"
      color="text"
      fontWeight="regular"
      style={{ height: '13rem', display: 'inline-block' }}
    >
      آخرین رویداد:{' '}
      <MDTypography component="span" color={eventColor} fontWeight="bold">
        {event.comment}
      </MDTypography>
      <br />
      دستگاه: {event.deviceName}
      <br />
      استان: {event.provinceTitle}
      <br />
      زمان: {event.time}
      <br />
      شماره کارت: {event.cardId}
      <br />
      کاربر: {event.userName}
      <br />
      درب: {event.door}
      <br />
      {/* وضعیت ورود/خروج: {event.direction}
      <br /> */}
      {/* نوع تایید: {event.verifyMode}
      <br /> */}
      {/* {event.comment && <> توضیح: {event.comment}</>} */}
    </MDTypography>
  )
}

export default DeviceEventLog
