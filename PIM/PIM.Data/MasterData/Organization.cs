﻿using PIM.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PIM.Data.MasterData
{
    public class Organization : Created
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ShortName { get; set; }
        [Required]
        public string LongName { get; set; }

        public string Logo { get; set; }

        public int ParentId { get; set; }

        public bool IsEnvironment { get; set; }

        public bool IsCatalog { get; set; }

        public bool IsContainor { get; set; }

        public List<OrganizationMappings> OrganizationMapping { get; set; }

    }
}
