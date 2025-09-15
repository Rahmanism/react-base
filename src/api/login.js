import Api from 'api/apiBase'
import ApiUrls from 'api/urls'
import { Buffer } from 'buffer'

class Login extends Api {
  constructor() {
    super(ApiUrls.login)
  }

  // JWT claims
  claims = {
    givenName:
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
    username:
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
    role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  }

  static parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  // params: { data, resolve = null, reject = null }
  async tryLogin(params) {
    const result = await this.post(params)
    return result
  }

  async tokenData(token) {
    const parsedToken = Login.parseJwt(token)
    // Get JWT claims and save them to local storage
    const user = {
      id: parsedToken.Id,
      givenName: parsedToken[this.claims.givenName],
      username: parsedToken[this.claims.username],
      role: parsedToken[this.claims.role],
      email: parsedToken[this.claims.email],
    }
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }
}

export default Login
