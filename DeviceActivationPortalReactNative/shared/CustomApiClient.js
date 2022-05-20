import { ApiClient } from '../generated/api'
import { AuthenticationService } from './AuthenticationService'


export class CustomApiClient extends ApiClient {
  callApi(path, httpMethod, pathParams,queryParams,collectionQueryParams, headerParams, formParams, bodyParam,authNames, contentTypes, accepts,returnType, callback) {
    let fullpath = this.buildUrl(path, pathParams);   
    let customheaders;

    if(AuthenticationService.instance.isLoggedIn()) {
      customheaders= {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': ('CUSTOMAUTH '+AuthenticationService.instance.getLoginToken())
      }
    } else {
      customheaders= {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }

    let request = fetch(fullpath, {
        method: httpMethod,            
        headers: customheaders,
        body: (formParams ? JSON.stringify(formParams) : null),
        
      }
    );
    request.then(response => {
      if(!response.ok) {
        if(response.status === 401) {
          AuthenticationService.instance.logout();
        }
      }
    });
    return request;
  }
}
