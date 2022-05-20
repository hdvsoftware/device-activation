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
import {Device} from './Device';

/**
 * The CustomerDetailViewModel model module.
 * @module model/CustomerDetailViewModel
 * @version v1
 */
export class CustomerDetailViewModel {
  /**
   * Constructs a new <code>CustomerDetailViewModel</code>.
   * @alias module:model/CustomerDetailViewModel
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>CustomerDetailViewModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerDetailViewModel} obj Optional instance to populate.
   * @return {module:model/CustomerDetailViewModel} The populated <code>CustomerDetailViewModel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CustomerDetailViewModel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('code'))
        obj.code = ApiClient.convertToType(data['code'], 'String');
      if (data.hasOwnProperty('server'))
        obj.server = ApiClient.convertToType(data['server'], 'String');
      if (data.hasOwnProperty('devices'))
        obj.devices = ApiClient.convertToType(data['devices'], [Device]);
      if (data.hasOwnProperty('registeredDevices'))
        obj.registeredDevices = ApiClient.convertToType(data['registeredDevices'], 'Number');
      if (data.hasOwnProperty('maxDevices'))
        obj.maxDevices = ApiClient.convertToType(data['maxDevices'], 'Number');
      if (data.hasOwnProperty('hasRemainingLicences'))
        obj.hasRemainingLicences = ApiClient.convertToType(data['hasRemainingLicences'], 'Boolean');
      if (data.hasOwnProperty('created'))
        obj.created = ApiClient.convertToType(data['created'], 'Date');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
CustomerDetailViewModel.prototype.id = undefined;

/**
 * @member {String} name
 */
CustomerDetailViewModel.prototype.name = undefined;

/**
 * @member {String} description
 */
CustomerDetailViewModel.prototype.description = undefined;

/**
 * @member {String} code
 */
CustomerDetailViewModel.prototype.code = undefined;

/**
 * @member {String} server
 */
CustomerDetailViewModel.prototype.server = undefined;

/**
 * @member {Array.<module:model/Device>} devices
 */
CustomerDetailViewModel.prototype.devices = undefined;

/**
 * @member {Number} registeredDevices
 */
CustomerDetailViewModel.prototype.registeredDevices = undefined;

/**
 * @member {Number} maxDevices
 */
CustomerDetailViewModel.prototype.maxDevices = undefined;

/**
 * @member {Boolean} hasRemainingLicences
 */
CustomerDetailViewModel.prototype.hasRemainingLicences = undefined;

/**
 * @member {Date} created
 */
CustomerDetailViewModel.prototype.created = undefined;

