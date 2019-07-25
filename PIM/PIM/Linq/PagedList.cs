using System.Collections.Generic;

namespace PIM.API.Linq
{
    public class PagedList<T>
    {
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public IEnumerable<T> Entries { get; set; }
    }
}
