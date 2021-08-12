using System;
using System.Collections.Generic;
using System.Text;
using MoHIS.Activation.Shared.Data;

namespace MoHIS.Activation.Shared.Models {

    public class AddDeviceViewModel {
        public object[] Customers { get; set; }

        public AddDeviceViewModel(List<Customer> possibleCustomers) {
            if (possibleCustomers != null) {
                Customers = possibleCustomers.ConvertAll(c => new { id = c.Id, name = c.Name }).ToArray();
            }
        }
    }

    public class AddDeviceRequest {
        public int CustomerId { get; set; }
        public string UUID { get; set; }
        public string Description { get; set; }
    }


    public class UpdateDeviceViewModel {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string UUID { get; set; }
        public string Description { get; set; }
        public object[] Customers { get; set; }

        public UpdateDeviceViewModel(List<Customer> possibleCustomers) {
            if (possibleCustomers != null) {
                Customers = possibleCustomers.ConvertAll(c => new { id = c.Id, name = c.Name }).ToArray();
            }
        }
    }

    public class UpdateDeviceRequest {
        //public int Id { get; set; }
        public int CustomerId { get; set; }
        public string UUID { get; set; }
        public string Description { get; set; }
    }

    public class DeviceDetailViewModel {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string UUID { get; set; }
        public string Description { get; set; }
        public DateTime? LastConnection { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }

        public static DeviceDetailViewModel ConvertFromDataModel(Device device, string customerName) {
            return new DeviceDetailViewModel() {
                Id = device.Id,
                CustomerName = customerName,
                UUID = device.UUID,
                Description = device.Description,
                LastConnection = device.LastConnection,
                Created = device.Created,
                Modified = device.Modified
            };
        }
    }
}
