using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json.Serialization;
using PIM.API.HttpFilters;

namespace PIM.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Filters.Add(new AuthenticationFilter());
            config.Filters.Add(new AuthorizationFilter());
            config.Filters.Add(new ValidationActionFilterAttribute());
            config.Filters.Add(new NoCacheFilterAttribute());
            config.Filters.Add(new ExceptionFilterAttribute());
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new { id = RouteParameter.Optional });

            // Cors
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
        }
    }
}
