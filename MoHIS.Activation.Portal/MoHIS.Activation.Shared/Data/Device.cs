using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MoHIS.Activation.Shared.Data
{
    [Table("device")]
    public class Device
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("customerid")]
        public int CustomerId { get; set; }
        [Column("uuid")]
        public string UUID{get;set;}
        [Column("description")]
        public string Description { get; set; }
        [Column("last_connection")]
        public DateTime? LastConnection { get; set; }
        [Column("created")]
        public DateTime Created { get; set; }
        [Column("modified")]
        public DateTime Modified { get; set; }
        [Column("deleted")]
        public DateTime? Deleted { get; set; }


        //public Customer Customer { get; set; }

    }
}
