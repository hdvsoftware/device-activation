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
 * The Device model module.
 * @module model/Device
 * @version v1
 */
export class Device {
  /**
   * Constructs a new <code>Device</code>.
   * @alias module:model/Device
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Device</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Device} obj Optional instance to populate.
   * @return {module:model/Device} The populated <code>Device</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Device();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('customerId'))
        obj.customerId = ApiClient.convertToType(data['customerId'], 'Number');
      if (data.hasOwnProperty('uuid'))
        obj.uuid = ApiClient.convertToType(data['uuid'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('lastConnection'))
        obj.lastConnection = ApiClient.convertToType(data['lastConnection'], 'Date');
      if (data.hasOwnProperty('created'))
        obj.created = ApiClient.convertToType(data['created'], 'Date');
      if (data.hasOwnProperty('modified'))
        obj.modified = ApiClient.convertToType(data['modified'], 'Date');
      if (data.hasOwnProperty('deleted'))
        obj.deleted = ApiClient.convertToType(data['deleted'], 'Date');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
Device.prototype.id = undefined;

/**
 * @member {Number} customerId
 */
Device.prototype.customerId = undefined;

/**
 * @member {String} uuid
 */
Device.prototype.uuid = undefined;

/**
 * @member {String} description
 */
Device.prototype.description = undefined;

/**
 * @member {Date} lastConnection
 */
Device.prototype.lastConnection = undefined;

/**
 * @member {Date} created
 */
Device.prototype.created = undefined;

/**
 * @member {Date} modified
 */
Device.prototype.modified = undefined;

/**
 * @member {Date} deleted
 */
Device.prototype.deleted = undefined;
