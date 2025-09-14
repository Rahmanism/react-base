import React from 'react'
import { toast } from 'react-toastify'
// It's been imported in App.js
// import 'react-toastify/dist/ReactToastify.css'
import 'assets/style/toast.css'
import { Consts } from 'common'

export const vibrate = (pattern) => {
  const supportsVibrate = 'vibrate' in window.navigator
  if (supportsVibrate) {
    window.navigator.vibrate(pattern)
  }
}

export const ToastTypes = ['info', 'success', 'warning', 'error', 'default']

export const ToastDurationEnum = {
  Short: 2000,
  Medium: 5000,
  Long: 12000,
  VeryLong: 20000,
}

export const ToastVibratePattern = {
  INFO: [300],
  SIMPLE: [200, 200, 200],
  SUCCESS: [500],
  WARN: [300, 250, 500],
  ERROR: [350, 200, 350, 200, 350],
}

export const TOAST_MESSAGE_MAX_LENGTH = 60

const getAutoClose = (message) =>
  message.length > TOAST_MESSAGE_MAX_LENGTH
    ? ToastDurationEnum.Long
    : ToastDurationEnum.Medium

export const toastIt = (message = '', options) => {
  const { id = 0, ...otherOptions } = options
  let { type = 'default' } = options
  type = ToastTypes.includes(type) ? type : 'default'
  const spanMessage = (
    <>
      {/* meterial icon */}
      <span className="toast-message">{message}</span>
    </>
  )
  if (id === 0) {
    return toast(spanMessage, {
      type,
      closeOnClick: true,
      closeButton: true,
      autoClose: getAutoClose(message),
      ...otherOptions,
    })
  }
  // else id != 0
  return toast.update(id, {
    type,
    closeOnClick: true,
    closeButton: true,
    autoClose: getAutoClose(message),
    render: spanMessage,
    isLoading: false,
    ...otherOptions,
  })
}

export const tSimple = (message = '', id = 0, options) => {
  vibrate(ToastVibratePattern.SIMPLE)
  return toastIt(message, { id, type: 'default', ...options })
}

export const tInfo = (message = '', id = 0, options) => {
  vibrate(ToastVibratePattern.INFO)
  return toastIt(message, { id, type: 'info', ...options })
}

export const tSuccess = (message = '', id = 0, options) => {
  vibrate(ToastVibratePattern.SUCCESS)
  return toastIt(message, { id, type: 'success', ...options })
}

export const tWarn = (message = '', id = 0, options) => {
  vibrate(ToastVibratePattern.WARN)
  return toastIt(message, { id, type: 'warning', ...options })
}

export const tError = (message = '', id = 0, options) => {
  vibrate(ToastVibratePattern.ERROR)
  return toastIt(message, { id, type: 'error', ...options })
}

export const tLoading = (message = Consts.wait, options) => {
  vibrate(ToastVibratePattern.INFO)
  return toast.loading(
    <>
      {/* meterial icon */}
      <span className="toast-message">{message}</span>
    </>,
    {
      autoClose: getAutoClose(message),
      ...options,
    }
  )
}
