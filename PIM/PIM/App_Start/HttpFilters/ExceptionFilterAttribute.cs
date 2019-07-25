using System.Web.Http.Filters;
using PIM.API.Logging;

namespace PIM.API.HttpFilters
{
    public class ExceptionFilterAttribute : System.Web.Http.Filters.ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            //Log.ExceptionLogger.Error(context.Exception.Message, context.Exception);
            base.OnException(context);
        }
    }
}