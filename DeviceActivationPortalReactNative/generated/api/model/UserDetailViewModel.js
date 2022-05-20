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
 * The UserDetailViewModel model module.
 * @module model/UserDetailViewModel
 * @version v1
 */
export class UserDetailViewModel {
  /**
   * Constructs a new <code>UserDetailViewModel</code>.
   * @alias module:model/UserDetailViewModel
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>UserDetailViewModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserDetailViewModel} obj Optional instance to populate.
   * @return {module:model/UserDetailViewModel} The populated <code>UserDetailViewModel</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserDetailViewModel();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('username'))
        obj.username = ApiClient.convertToType(data['username'], 'String');
      if (data.hasOwnProperty('currentLinkedCustomers'))
        obj.currentLinkedCustomers = ApiClient.convertToType(data['currentLinkedCustomers'], [Object]);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
UserDetailViewModel.prototype.id = undefined;

/**
 * @member {String} username
 */
UserDetailViewModel.prototype.username = undefined;

/**
 * @member {Array.<Object>} currentLinkedCustomers
 */
UserDetailViewModel.prototype.currentLinkedCustomers = undefined;
