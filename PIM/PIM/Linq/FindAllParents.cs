using PIM.Data.Organizations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PIM.API.Linq
{
    public class FindAllParents
    {
        public IEnumerable<Organization> Organizations(List<Organization> all_data, Organization child)
        {
            var parent = all_data.FirstOrDefault(x => x.Id == child.ParentId);

            if (parent == null)
                return Enumerable.Empty<Organization>();

            return new[] { parent }.Concat(Organizations(all_data, parent));
        }

        public IEnumerable<Organization> ChildOrganizations(List<Organization> all_data, Organization parent)
        {
            var child = all_data.FirstOrDefault(x => x.ParentId == parent.Id);

            if (child == null)
                return Enumerable.Empty<Organization>();

            return new[] { child }.Concat(ChildOrganizations(all_data, child));
        }

        public List<Organization> GetChildren(List<Organization> children, int parentId)
        {
            return children
                .Where(c => c.ParentId == parentId)
                .Select(c => new Organization
                {
                    Id = c.Id,
                    ShortName = c.ShortName,
                    LongName = c.LongName,
                    Logo = c.Logo == null ? "assets/images/Saint-gobain_small.png" : c.Logo,
                    ParentId = c.ParentId,
                    Children = GetChildren(children, c.Id)
                }).ToList();
        }

    }
}