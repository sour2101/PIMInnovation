using System.Net.Http.Headers;
using System.Web.Http.Filters;

namespace PIM.API.HttpFilters
{
    public class NoCacheFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Response != null)
                actionExecutedContext.Response.Headers.CacheControl = new CacheControlHeaderValue
                {
                    NoCache = true,
                    MustRevalidate = true,
                    Public = true
                };
        }
    }
}