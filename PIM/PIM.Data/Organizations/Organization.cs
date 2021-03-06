﻿using PIM.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIM.Data.Organizations
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

        public bool IsEnvironment { get; set; }

        public bool IsCatalog { get; set; }

        public bool IsContainor { get; set; }

        [ForeignKey("ParentOrganization")]
        public int? ParentId { get; set; }

        public virtual Organization ParentOrganization { get; set; }

        public virtual ICollection<Organization> Children { get; set; }

        public virtual ICollection<UserOrgMappings> UserOrgMappings { get; set; }

        public virtual ICollection<RoleOrgMapping> RoleOrgMappings { get; set; }

        public virtual ICollection<AttributeOrgMapping> AttributeOrgMappings { get; set; }

        public virtual ICollection<TaxonomyOrgMapping> TaxonomyOrgMappings { get; set; }

    }
}
