import { useEffect, useMemo, useState } from 'react'
import { Login } from 'api'
import Loading from 'components/Loading'
import ReactPlayer from 'react-player'

function DeviceCamera(options) {
  const { streamUrl, isOpen } = options

  const token = useMemo(() => Login.getToken(), [])
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Recheck for stream file, because it takes a while to create for the first time.
  const [isCam404, setIsCam404] = useState(true)
  // We will try 20 times in every 2 seconds.
  const CHECK_INTERVAL_TIME = 2000
  const CHECK_MAX_COUNT = 20
  let checkStreamCount = 0
  const checkStreamInterval = setInterval(() => {
    if (
      checkStreamCount >= CHECK_MAX_COUNT ||
      !streamUrl ||
      Object.keys(streamUrl).length === 0 ||
      !isCam404 ||
      !isOpen
    ) {
      clearInterval(checkStreamInterval)
      return
    }
    checkStreamCount += 1
    fetch(streamUrl, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response.status !== 404) {
        clearInterval(checkStreamInterval)
        setIsCam404(false)
      }
    })
  }, CHECK_INTERVAL_TIME)

  useEffect(() => {
    setIsCam404(true)

    // This is to clear the interval when the component is unmounted.
    // So it will not keep checking the stream file.
    return () => {
      clearInterval(checkStreamInterval)
    }
  }, [streamUrl])
  // end of Recheck

  return (
    <>
      {(isLoading || isCam404) && <Loading />}
      {streamUrl && !isCam404 && (
        <ReactPlayer
          url={streamUrl}
          playing
          stopOnUnmount
          width="100%"
          height="auto"
          config={{
            file: {
              hlsOptions: {
                xhrSetup: (xhr) => {
                  xhr.setRequestHeader('Authorization', `Bearer ${token}`)
                },
              },
            },
          }}
          onError={() => {
            setShowError(true)
            setIsLoading(false)
          }}
          onReady={() => {
            setIsLoading(false)
            setShowError(false)
          }}
        />
      )}
      {showError && 'خطا در دریافت تصویر. لطفا اتصال شبکه خود را بررسی کنید.'}
      {isCam404 &&
        !showError &&
        checkStreamCount < CHECK_MAX_COUNT &&
        ' در حال تلاش مجدد برای دریافت تصویر. لطفا کمی صبر کنید.'}
    </>
  )
}

export default DeviceCamera
