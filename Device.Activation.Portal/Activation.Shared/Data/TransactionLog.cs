using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Activation.Shared.Data {
    [Table("transactionlog")]
    public class TransactionLog {
        [Column("id")]
        public int Id { get; set; }
        [Column("affectedtable")]
        public string AffectedTable { get; set; }
        [Column("type")]
        public string Type { get; set; }
        [Column("details")]
        public string Details { get; set; }
        [Column("created")]
        public DateTime Created { get; set; }
        [Column("modified")]
        public DateTime Modified { get; set; }
        [Column("deleted")]
        public DateTime? Deleted { get; set; }
    }
}
