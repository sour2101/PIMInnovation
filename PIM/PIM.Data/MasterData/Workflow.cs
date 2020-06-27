using PIM.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PIM.Data.MasterData
{
    public class Workflow : Created
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }

        public virtual ICollection<WorkflowSteps> WorkflowSteps { get; set; }

    }
}
