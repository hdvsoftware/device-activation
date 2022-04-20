using System;
using System.Collections.Generic;
using System.Text;
using Activation.Shared.Data;

namespace Activation.Shared.Models {
    public class AddCustomerRequest {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Server { get; set; }
        public int? NumberOfDevices { get; set; }
    }

    public class UpdateCustomerRequest {
        //public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Server { get; set; }
        public int? NumberOfDevices { get; set; }
    }

    public class CustomerGridViewModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int RegisteredDevices { get; set; }
        public int? MaxDevices { get; set; }
        public DateTime Created { get; set; }

        public static CustomerGridViewModel ConvertFromDataModel(Customer customer) {
            return new CustomerGridViewModel() {
                Id = customer.Id,
                Name = customer.Name,
                Description = customer.Description,
                Code = customer.Code,
                RegisteredDevices = (customer.Devices == null ? 0 : customer.Devices.Count),
                MaxDevices = customer.NumberOfDevices,
                Created = customer.Created

            };
        }
    }

    public class CustomerDetailViewModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Server { get; set; }
        public List<Device> Devices { get; set; }
        public int RegisteredDevices {
            get {
                if(Devices == null) {
                    return 0;
                }
                return Devices.Count;
            }
        }
        
        public int? MaxDevices { get; set; }
        public bool HasRemainingLicences {
            get {
                if(!MaxDevices.HasValue) {
                    return true;
                }
                return (MaxDevices.Value > RegisteredDevices);
            }
        }
        
        public DateTime Created { get; set; }

        public static CustomerDetailViewModel ConvertFromDataModel(Customer customer) {
            return new CustomerDetailViewModel() {
                Id = customer.Id,
                Name = customer.Name,
                Description = customer.Description,
                Code = customer.Code,
                Devices = customer.Devices,
                MaxDevices = customer.NumberOfDevices,
                Created = customer.Created

            };
        }
    }
}
