using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MoHIS.Activation.Shared.Data {
    [Table("approle_apprule")]
    public class ApproleApprule {
        [Column("approleid")]
        public int ApproleId { get; set; }

        [Column("appruleid")]
        public int AppruleId { get; set; }

        public Approle Approle { get; set; }
        public Apprule Apprule { get; set; }
    }
}
