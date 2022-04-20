export * from './customer.service';
import { CustomerService } from './customer.service';
export * from './device.service';
import { DeviceService } from './device.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [CustomerService, DeviceService, UserService];
