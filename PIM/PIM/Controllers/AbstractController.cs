using System.Web;
using System.Web.Http;
using PIM.API.Linq;
using PIM.Data.Users;
using PIM.Data;

namespace PIM.API.Controllers
{
    public abstract class AbstractController : ApiController
    {
        protected IRepository Repository
        {
            get
            {
                if (HttpContext.Current.Items["Repository"] == null)
                    HttpContext.Current.Items["Repository"] = new Repository(new PIMContext());
                return (IRepository)HttpContext.Current.Items["Repository"];
            }
        }

        protected string CurrentLanguage()
        {
            if (User.Identity.Name != "")
            {
                var principal = (User)User.Identity;
                return principal.Languages.Name;
            }
            else
                return PIM.API.Properties.Settings.Default.DefaultLanguage;

        }
    }
}