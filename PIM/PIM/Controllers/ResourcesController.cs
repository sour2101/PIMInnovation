using PIM.Data.Enums;
using PIM.Data.Users;
using System.Collections;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web.Http;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class ResourcesController : AbstractController
    {
        [HttpGet]
        public IHttpActionResult Get(string userId)
        {
            int langId=1;
            if (userId!="0")
            {
                var uid = Repository.FindBy<Token>(x => x.Value == userId).Select(x => x.UserId).FirstOrDefault();
                //langId = Repository.FindBy<UserPreferences>(x => x.UserId == uid).Select(x => x.UILocal).FirstOrDefault();
            }

            EnumLanguage language = (EnumLanguage)langId;
            Thread.CurrentThread.CurrentUICulture = new CultureInfo(language.ToString().Replace("_","-"));
            var resourceSet = Resources.PIM.ResourceManager.GetResourceSet(CultureInfo.CurrentUICulture, true, true);

            var globalResource = resourceSet.Cast<DictionaryEntry>()
                .ToDictionary(r => r.Key.ToString(),
                r => r.Value.ToString());
            return Ok(globalResource);
        }
    }
}