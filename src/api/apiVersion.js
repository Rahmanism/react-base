import { getBaseUrl } from './urls'

/**
 * Retrieves the API version by fetching the version endpoint.
 *
 * @return {Promise<string>} The API version text.
 */
export default async function getApiVersion() {
  const apiVersionUrl = `${getBaseUrl()}/app-version`
  const apiVersion = await fetch(apiVersionUrl)
  const apiVersionText = await apiVersion.text()
  return apiVersionText
}
