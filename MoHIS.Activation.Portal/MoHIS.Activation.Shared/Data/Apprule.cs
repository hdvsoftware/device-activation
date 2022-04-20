using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Activation.Shared.Data {
    [Table("apprule")]
    public class Apprule {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("created")]
        public DateTime Created { get; set; }
        [Column("modified")]
        public DateTime Modified { get; set; }
        [Column("deleted")]
        public DateTime? Deleted { get; set; }

        public List<ApproleApprule> ApproleApprule { get; set; }
    }
}
