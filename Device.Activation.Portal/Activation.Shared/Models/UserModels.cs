using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;
using Activation.Shared.Data;

namespace Activation.Shared.Models {

    public class AddUserViewModel {
        public object[] Customers { get; }

        public AddUserViewModel(List<Customer> possibleCustomers) {
            Customers = possibleCustomers.ConvertAll(c => new { id = c.Id, name = c.Name }).ToArray();
        }
    }

    public class AddUserRequest {
        public string Username { get; set; }
        public string Password { get; set; }
        public List<int> CustomerIds { get; set; }
    }

    public class UserDetailViewModel {
        public int Id { get; set; }
        public string Username { get; set; }
        public object[] CurrentLinkedCustomers { get; }

        public UserDetailViewModel(List<Customer> currentLinkedCustomers) {
            CurrentLinkedCustomers = currentLinkedCustomers.ConvertAll(c => new { id = c.Id, name = c.Name }).ToArray();
        }
    }

    public class UpdateUserRequest {
        public string Password { get; set; }
        public List<int> CustomerIds { get; set; }
    }

    public class UpdateUserViewModel {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<int> CurrentLinkedCustomerIds { get; set; }
        public object[] Customers { get; }

        public UpdateUserViewModel(List<Customer> possibleCustomers) {
            Customers = possibleCustomers.ConvertAll(c => new { id = c.Id, name = c.Name }).ToArray();
        }
    }

}
