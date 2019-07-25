using System;
using System.Data.Entity;
using System.Linq;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Filters;
using PIM.API.Linq;
using PIM.Data;
using PIM.Data.Users;

namespace PIM.API.HttpFilters
{
    public class AuthenticationFilter : IAuthenticationFilter
    {
        public IRepository Repository
        {
            get
            {
                if (HttpContext.Current.Items["Repository"] == null)
                    HttpContext.Current.Items["Repository"] = new Repository(new PIMContext());
                return (IRepository)HttpContext.Current.Items["Repository"];
            }
        }

        public bool AllowMultiple => false;

        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if (authorization?.Scheme == "Bearer" && !string.IsNullOrWhiteSpace(authorization.Parameter))
            {
                var user = Repository.FindBy<User>(u => u.Token.Value == authorization.Parameter && u.Token.ExpirationDate > DateTime.Now)
                    .Include(u => u.UserRights.Select(r => r.Roles))
                       .AsNoTracking()
                       .SingleOrDefault();
                if (user != null)
                {
                    var roles = user.UserRights.Select(r=>r.Roles.Name).ToArray();
                    context.Principal = new GenericPrincipal(user, roles);
                }
            }
            return Task.FromResult(0);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}
