using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Activation.Shared.Data
{
    [Table("appusercustomer")]
    public class AppuserCustomer
    {
        //public int Id { get; set; }
        [Column("appuserid")]
        public int AppuserId { get; set; }
        [Column("customerid")]
        public int CustomerId { get; set; }
        //public DateTime Created { get; set; }
        //public DateTime Modified { get; set; }
        //public DateTime? Deleted { get; set; }

        public Appuser Appuser { get; set; }
        public Customer Customer { get; set; }
    }
}
