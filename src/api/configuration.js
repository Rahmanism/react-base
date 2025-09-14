import Api from 'api/apiBase'
import ApiUrls from 'api/urls'

class ConfigurationApi extends Api {
  constructor() {
    super(ApiUrls.configuration)
  }
}

export default ConfigurationApi
