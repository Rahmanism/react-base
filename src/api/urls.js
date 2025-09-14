const ApiUrls = {
  login: '/Login',
  user: '/User',
  configuration: '/Configuration',
}

export const getBaseUrl = (noApi = false) => {
  const apiPostfix = noApi ? '' : '/api'
  const productionUrl = 'https://api.rahmanism.ir'
  // const localUrl = 'http://localhost:5059'
  // const localUrl = 'https://localhost:7059'
  const localUrl = 'https://api.rahmanism.ir'
  return (
    (process.env.NODE_ENV === 'production' ? productionUrl : localUrl) +
    apiPostfix
  )
}

export default ApiUrls
