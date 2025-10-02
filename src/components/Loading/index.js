import loading from 'assets/images/loading.gif'

function Loading() {
  return (
    <img
      src={loading}
      alt="loading..."
      style={{
        position: 'fixed',
        top: 'calc(50vh - 100px)',
        left: 'calc(50vw - 100px)',
        zIndex: '1000',
      }}
    />
  )
}

export default Loading
