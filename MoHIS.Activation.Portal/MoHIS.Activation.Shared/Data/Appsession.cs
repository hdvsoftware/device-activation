using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MoHIS.Activation.Shared.Data {
    [Table("appsession")]
    public class Appsession {
        [Column("id")]
        public int Id { get; set; }
        [Column("appuserid")]
        public int AppuserId { get; set; }
        [Column("token")]
        public string Token { get; set; }
        [Column("validuntil")]
        public DateTime ValidUntil { get; set; }
        //[Column("status")]
        //public string Status { get; set; }

        //[Column("last_activity")]
        //public DateTime LastActivity { get; set; }

        [Column("created")]
        public DateTime Created { get; set; }
        [Column("modified")]
        public DateTime Modified { get; set; }
        [Column("deleted")]
        public DateTime? Deleted { get; set; }


        public Appuser Appuser { get; set; }

    }
}
