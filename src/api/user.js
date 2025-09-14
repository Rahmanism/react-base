import Api from 'api/apiBase'
import ApiUrls from 'api/urls'

class UserApi extends Api {
  constructor() {
    super(ApiUrls.user)
  }
}

export default UserApi
