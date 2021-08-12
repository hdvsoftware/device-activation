using System.ComponentModel.DataAnnotations.Schema;

namespace MoHIS.Activation.Shared.Data {
    [Table("appuser_approle")]
    public class AppuserApprole {
        [Column("approleid")]
        public int ApproleId { get; set; }

        [Column("appuserid")]
        public int AppuserId { get; set; }

        public Approle Approle { get; set; }
        public Appuser Appuser { get; set; }
    }
}
