import Api from 'api/apiBase'
import ApiUrls from 'api/urls'

class UserApi extends Api {
  constructor() {
    super(ApiUrls.user)
  }

  // params: { data: {givenName, userName, password, role, cardId, enabled },
  //   deviceId, resolve = null, reject = null }
  async add(params) {
    const result = await this.post({
      ...params,
      url: `${this.apiUrl}?deviceId=${params.deviceId}`,
    })
    return result
  }

  async addDevice(params) {
    const result = await this.get({
      ...params,
      url: `${this.apiUrl}/AddDevice/${params.userId}/${params.deviceId}`,
    })
    return result
  }

  async addProvinceDevices(params) {
    const result = await this.get({
      ...params,
      url: `${this.apiUrl}/AddProvinceDevices/${params.userId}/${params.provinceId}`,
    })
    return result
  }

  async removeDevice(params) {
    const result = await this.delete({
      ...params,
      url: `${this.apiUrl}/RemoveDevice/${params.userId}/${params.deviceId}`,
    })
    return result
  }

  async getDevices(params) {
    const result = await this.get({
      ...params,
      url: `${this.apiUrl}/GetDevices/${params.userId}`,
    })
    return result
  }
}

export default UserApi
