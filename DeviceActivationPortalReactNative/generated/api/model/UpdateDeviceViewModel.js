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
import {ApiClient} from '../ApiClient';

/**
 * The UpdateDeviceViewModel model module.
 * @module model/UpdateDeviceViewModel
 * @version v1
 */
export class UpdateDeviceViewModel {
  /**
   * Constructs a new <code>UpdateDeviceViewModel</code>.
   * @alias module:model/UpdateDeviceViewModel
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>UpdateDeviceViewModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UpdateDeviceViewModel} obj Optional instance to populate.
   * @return {module:model/UpdateDeviceViewModel} The populated <code>UpdateDeviceViewModel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UpdateDeviceViewModel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('customerId'))
        obj.customerId = ApiClient.convertToType(data['customerId'], 'Number');
      if (data.hasOwnProperty('uuid'))
        obj.uuid = ApiClient.convertToType(data['uuid'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('customers'))
        obj.customers = ApiClient.convertToType(data['customers'], [Object]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
UpdateDeviceViewModel.prototype.id = undefined;

/**
 * @member {Number} customerId
 */
UpdateDeviceViewModel.prototype.customerId = undefined;

/**
 * @member {String} uuid
 */
UpdateDeviceViewModel.prototype.uuid = undefined;

/**
 * @member {String} description
 */
UpdateDeviceViewModel.prototype.description = undefined;

/**
 * @member {Array.<Object>} customers
 */
UpdateDeviceViewModel.prototype.customers = undefined;

