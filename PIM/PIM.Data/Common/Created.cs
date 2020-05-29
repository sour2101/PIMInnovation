using System;

namespace PIM.Data.Common
{
    public abstract class Created
    {
        public string CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

    }
}
