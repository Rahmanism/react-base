import { tError } from 'common/toast'
import { Consts } from 'common'
import { goto } from 'common/common'
import { getBaseUrl } from 'api/urls'

class Api {
  constructor(apiUrl) {
    this.currentToken = localStorage.getItem('token')
    this.apiUrl = getBaseUrl() + apiUrl
    this.controller = new AbortController()
  }

  then() {
    return this.controller
  }

  // Base methods
  async request(params) {
    const {
      url = this.apiUrl,
      resolve = null,
      reject = null,
      showError = true,
    } = params
    let { options } = params

    // const controller = new AbortController()
    options = {
      ...options,
      signal: this.controller.signal,
      // The next 2 lines are here for the fetch to not verify
      // the certificate like --insecure in curl
      // rejectUnauthorized: false,
      // In order for the Web API to not treat each request as a separate session,
      // the following line is essential.
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json', // ; charset=UTF-8',
      },
    }

    if (this.currentToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${this.currentToken}`,
      }
    }

    const response = await fetch(url, options)

    if (response.ok) {
      let retValue
      const contentType = response.headers.get('Content-Type')
      if (contentType?.includes('application/json')) {
        retValue = await response.json()
      } else if (contentType?.includes('text/plain')) {
        retValue = await response.text()
      } else if (contentType?.includes('multipart/form-data')) {
        retValue = await response.formData()
      } // there should be more mime types here
      else if (
        contentType?.includes('image/jpg') ||
        contentType?.includes('image/png')
      ) {
        retValue = await response.blob()
      }

      if (resolve) {
        resolve(retValue)
      }

      return retValue
    }

    // else: response not ok
    let error = await response.text()
    if (response.status === 401) {
      localStorage.clear()
      goto('/login')
      return null
    }
    if (response.status === 401 || response.status === 403) {
      error = 'شما مجوز دسترسی به این قسمت را ندارید.'
    }
    const errorMsgLen = error.length
    if (showError) {
      tError(
        errorMsgLen > Consts.Numbers.max_toast_length
          ? error.substring(0, Consts.Numbers.max_toast_length)
          : error
      )
    }

    if (reject) {
      reject(error)
    } else {
      throw new Error(error)
    }

    return error
  }

  // params: { url, resolve = null, reject = null, showError = true }
  async get(params) {
    const options = {
      method: 'GET',
      redirect: 'follow',
    }

    const response = await this.request({ ...params, options })
    return response
  }

  // params: { url, resolve = null, reject = null, showError = true }
  async delete(params) {
    const options = {
      method: 'DELETE',
      redirect: 'follow',
    }

    const response = await this.request({ ...params, options })
    return response
  }

  // params: { url, data, resolve = null, reject = null, showError = true }
  async post(params) {
    const options = {
      method: 'POST',
      // redirect: 'follow',
      body: JSON.stringify(params.data),
    }

    const response = await this.request({ ...params, options })
    return response
  }

  // parmas: { url, data, resolve = null, reject = null, showError = true }
  async put(params) {
    const options = {
      method: 'PUT',
      redirect: 'follow',
      body: JSON.stringify(params.data),
    }

    const response = await this.request({ ...params, options })
    return response
  }
  // -----------------------

  // >>> api methods
  // params: { first = 0, count = 0, resolve = null, reject = null, showError = true }
  async getAll(params) {
    const {
      first = 0,
      count = 0,
      resolve = null,
      reject = null,
      showError = true,
    } = params
    const result = await this.get({
      url: `${this.apiUrl}?first=${first}&count=${count}`,
      resolve,
      reject,
      showError,
    })
    return result
  }

  // params: { id, resolve = null, reject = null, showError = true }
  async getOne(params) {
    const result = await this.get({
      ...params,
      url: `${this.apiUrl}/${params.id}`,
    })
    return result
  }

  // params: { id, resolve = null, reject = null, showError = true }
  async remove(params) {
    const result = await this.delete({
      ...params,
      url: `${this.apiUrl}/${params.id}`,
    })
    return result
  }

  // params: { data, resolve = null, reject = null, showError = true }
  async add(params) {
    const result = await this.post({ ...params, url: this.apiUrl })
    return result
  }

  // params: { data, resolve = null, reject = null, showError = true }
  async edit(params) {
    const result = await this.put({ ...params, url: this.apiUrl })
    return result
  }
  // ---------------------
}

export default Api
