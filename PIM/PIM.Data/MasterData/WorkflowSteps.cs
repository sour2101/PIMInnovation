namespace PIM.Data.MasterData
{
    using Common;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Users;

    public class WorkflowSteps : Created
    {
        [Key]
        public int Id { get; set; }

        public string StepName { get; set; }

        public string Actions { get; set; }

        public string BusinessRule {get;set;}


        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Roles { get; set; }

    }
}
