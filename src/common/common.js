import { getApiVersion } from 'api'

export function goto(url, target = '_self', rel = 'noreferrer') {
  const signInAnchor = document.createElement('a')
  signInAnchor.href = url
  signInAnchor.target = target
  signInAnchor.rel = rel
  signInAnchor.click()
}

export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`
}

/**
 * Gets an integer number between the given min and max.
 * The min and max are included.
 */
export function random(min, max) {
  // We use max + 1 to involve the max too.
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

/**
 * Delay for a given number of milliseconds
 */
export function delay(ms) {
  return new Promise((res) => {
    setTimeout(res, ms)
  })
}

/**
 * Replaces English numbers in the input text with Persian numbers.
 *
 * @param {string} text - The input text containing English numbers
 * @return {string} The input text with Persian numbers instead of English numbers
 */
export function getPersianNumbers(text) {
  return text.replace(/[0123456789]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])
}

/**
 *  Gets version from the manifest.json file
 */
export async function getVersion() {
  const manifestUrl = `${window.location.origin}/manifest.json`
  const randomNumber = Math.floor(Math.random() * 100)
  // add random number at the end of the url to avoid caching
  const versionFile = await (
    await fetch(`${manifestUrl}?dummy=${randomNumber}`)
  ).json()
  const remoteVersion = versionFile.version
  return remoteVersion
}

/**
 * Retrieves the full version by getting the frontend version and API version,
 * then converting it to Persian numbers.
 *
 * @return {string} the full version with Persian numbers
 */
export async function getFullVersion() {
  const frontVer = await getVersion()
  const apiVer = await getApiVersion()
  const ver = getPersianNumbers(`${frontVer} (${apiVer})`)
  return ver
}

/**
 * Gets the user's role from localStorage
 * 1: is admin
 * 2: is non-admin
 * 0: other (probably not logged in)
 */
// it's moved to context (useMaterialUIController())
// export const userRole = +(JSON.parse(localStorage.getItem('user'))?.role ?? 0)

export const ding = () => {
  const audio = new Audio('/ding.mp3')
  audio.play()
}
