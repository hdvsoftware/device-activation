/*
 * Device Activation API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.34
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from "../ApiClient";
import {AddDeviceRequest} from '../model/AddDeviceRequest';
import {Device} from '../model/Device';
import {DeviceDetailViewModel} from '../model/DeviceDetailViewModel';
import {UpdateDeviceRequest} from '../model/UpdateDeviceRequest';
import {UpdateDeviceViewModel} from '../model/UpdateDeviceViewModel';

/**
* Device service.
* @module api/DeviceApi
* @version v1
*/
export class DeviceApi {

    /**
    * Constructs a new DeviceApi. 
    * @alias module:api/DeviceApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the deviceAddDevicePost operation.
     * @callback moduleapi/DeviceApi~deviceAddDevicePostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/AddDeviceRequest} opts.body 
     * @param {module:api/DeviceApi~deviceAddDevicePostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deviceAddDevicePost(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json', 'text/json', 'application/_*+json'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/Device/AddDevice', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deviceDetailIdGet operation.
     * @callback moduleapi/DeviceApi~deviceDetailIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeviceDetailViewModel{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/DeviceApi~deviceDetailIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    deviceDetailIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deviceDetailIdGet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = DeviceDetailViewModel;

      return this.apiClient.callApi(
        '/Device/detail/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deviceGetDeviceActivationUuidGet operation.
     * @callback moduleapi/DeviceApi~deviceGetDeviceActivationUuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Device{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} uuid 
     * @param {module:api/DeviceApi~deviceGetDeviceActivationUuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    deviceGetDeviceActivationUuidGet(uuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'uuid' is set
      if (uuid === undefined || uuid === null) {
        throw new Error("Missing the required parameter 'uuid' when calling deviceGetDeviceActivationUuidGet");
      }

      let pathParams = {
        'uuid': uuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = Device;

      return this.apiClient.callApi(
        '/Device/GetDeviceActivation/{uuid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deviceGetDeviceUuidGet operation.
     * @callback moduleapi/DeviceApi~deviceGetDeviceUuidGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Device{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} uuid 
     * @param {module:api/DeviceApi~deviceGetDeviceUuidGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    deviceGetDeviceUuidGet(uuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'uuid' is set
      if (uuid === undefined || uuid === null) {
        throw new Error("Missing the required parameter 'uuid' when calling deviceGetDeviceUuidGet");
      }

      let pathParams = {
        'uuid': uuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = Device;

      return this.apiClient.callApi(
        '/Device/GetDevice/{uuid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deviceGetDevicesByEnvironmentEnvironmentIdGet operation.
     * @callback moduleapi/DeviceApi~deviceGetDevicesByEnvironmentEnvironmentIdGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Device>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} environmentId 
     * @param {module:api/DeviceApi~deviceGetDevicesByEnvironmentEnvironmentIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    deviceGetDevicesByEnvironmentEnvironmentIdGet(environmentId, callback) {
      
      let postBody = null;
      // verify the required parameter 'environmentId' is set
      if (environmentId === undefined || environmentId === null) {
        throw new Error("Missing the required parameter 'environmentId' when calling deviceGetDevicesByEnvironmentEnvironmentIdGet");
      }

      let pathParams = {
        'environmentId': environmentId
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = [Device];

      return this.apiClient.callApi(
        '/Device/GetDevicesByEnvironment/{environmentId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deviceUpdateDeviceIdGet operation.
     * @callback moduleapi/DeviceApi~deviceUpdateDeviceIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UpdateDeviceViewModel{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/DeviceApi~deviceUpdateDeviceIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    deviceUpdateDeviceIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deviceUpdateDeviceIdGet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = UpdateDeviceViewModel;

      return this.apiClient.callApi(
        '/Device/UpdateDevice/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deviceUpdateDeviceIdPut operation.
     * @callback moduleapi/DeviceApi~deviceUpdateDeviceIdPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateDeviceRequest} opts.body 
     * @param {module:api/DeviceApi~deviceUpdateDeviceIdPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deviceUpdateDeviceIdPut(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deviceUpdateDeviceIdPut");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json', 'text/json', 'application/_*+json'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/Device/UpdateDevice/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}