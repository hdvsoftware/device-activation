using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MoHIS.Activation.Shared.Data
{
    [Table("customer")]
    public class Customer
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("code")]
        public string Code { get; set; }
        [Column("server")]
        public string Server { get; set; }
        //[Column("licence_id")]
        //public int? LicenceId { get; set; }
        [Column("number_of_devices")]
        public int? NumberOfDevices { get; set; }
        [Column("created")]
        public DateTime Created { get; set; }
        [Column("modified")]
        public DateTime Modified { get; set; }
        [Column("deleted")]
        public DateTime? Deleted { get; set; }

        //public List<AppuserCustomer> AppuserLink { get; set; }
        public List<AppuserCustomer> AppuserLink { get; } = new List<AppuserCustomer>();
        public List<Device> Devices { get; set; }
        //public Licence Licence { get; set; }
    }
}
