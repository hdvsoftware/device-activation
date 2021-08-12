using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MoHIS.Activation.Shared.Data
{
    [Table("appuser")]
    public class Appuser
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("username")]
        public string Username { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("created")]
        public DateTime Created { get; set; }
        [Column("modified")]
        public DateTime Modified { get; set; }
        [Column("deleted")]
        public DateTime? Deleted { get; set; }
               
        public List<AppuserCustomer> CustomerLink { get; set; }
        public List<AppuserApprole> RoleLink { get; set; }
        public List<Appsession> Sessions { get; set; }
    }
}
