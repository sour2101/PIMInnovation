using System;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using PIM.API.Models;
using PIM.API.Logging;
using PIM.API.Properties;
using PIM.Data.Users;
using System.Net.Mail;
using PIM.API.Providers;
using PIM.Data.Enums;

namespace PIM.API.Controllers
{
    [AllowAnonymous]
    public class AuthenticationController : AbstractController
    {


        private IPasswordManagerProvider passwordManagerProvider;
        protected IPasswordManagerProvider PasswordManagerProvider => passwordManagerProvider ?? (passwordManagerProvider = new PasswordManagerProvider());
        [HttpGet]
        [Route("api/sso")]
        public IHttpActionResult Sso(string ticket)
        {
            var token = string.Empty;
            if (!string.IsNullOrWhiteSpace(ticket))
            {
                // Retrieve SGId from CAS server
                var sgId = RetrieveSGIdFromTicket(ticket, Request.RequestUri.GetLeftPart(UriPartial.Path));

                if (!string.IsNullOrWhiteSpace(sgId))
                {
                    // Check if user exists in database
                    var user = Repository.FindBy<User>(u => u.Username == sgId)
                        .Include(u => u.Token)
                        .FirstOrDefault();
                    if (user != null && user.Disabled)
                    {
                        UpsertToken(user);
                        token = user.Token.Value;
                    }
                }
            }
            return Redirect(Settings.Default.WebApplicationUrl + "sso?token=" + HttpUtility.UrlEncode(token));
        }

        [HttpPost]
        [Route("api/login")]
        public IHttpActionResult Login([FromBody]LoginModel login)
        {
            var password  = PasswordManagerProvider.Hash(login.Password);

            // Check if user exists in database
            var user = Repository.FindBy<User>(u => u.Username == login.Username && u.Password == password)
                .Include(u => u.Token)
                .FirstOrDefault();

            if (user == null)
            {
                var message = "UserName Or Password is not Valid.Please try again.";
                Log.MonitoringLogger.Warn(message);
                ModelState.AddModelError("invalidUserName", message);
                return BadRequest(ModelState);
            }

            if (user != null && user.Disabled)
            {
                Repository.Update(user);
                Repository.Save();
                UpsertToken(user);
            }

            // We return user's informations
            return Ok(new
            {
                user.Username,
                user.Firstname,
                user.Lastname,
                user.Name,
                user.LanguageId,
                Token = new
                {
                    user.Token.UserId,
                    user.Token.Value,
                    user.Token.ExpirationDate
                }
            });
        }

        [HttpPost]
        [Route("api/authenticate")]
        public IHttpActionResult Authenticate([FromBody]string value)
        {
            // Check if the provided token exists in database
            var token = Repository.FindBy<Token>(t => t.Value == value)
                .Include(t => t.User.UserRights.Select(ugr => ugr.Roles))
                .SingleOrDefault();
            if (token == null || token.ExpirationDate < DateTime.Now)
                // If the token doesn't exist, we return HTTP Response 401 Unauthorized
                return Unauthorized();
            if (!token.User.Disabled)
                // If the user isn't active, we return HTTP Response 403 Forbidden
                return new StatusCodeResult(HttpStatusCode.Forbidden, Request);
            // We return user's informations
            return Ok(new
            {
                token.User.Username,
                token.User.Firstname,
                token.User.Lastname,
                localeId = token.User.LanguageId,
                locale=token.User.Languages.Code,
                OrganizationId = token.User.OrganizationId,
                OrganizationName = token.User.Organization.LongName,
                roleName=token.User.UserRights.Select(ur=>ur.Roles.Name).SingleOrDefault(),
                Token = new
                {
                    token.UserId,
                    token.Value,
                    token.ExpirationDate
                }
            });
        }

        [HttpPost]
        [Route("api/logout")]
        public IHttpActionResult Logout()
        {
            var user = User.Identity as User;
            if (user != null)
            {
                // Remove token
                Repository.Delete(new Token { UserId = user.Id });
                Repository.Save();
            }
            return Ok();
        }

        [HttpPost]
        [Route("api/passwordRecovery")]
        public IHttpActionResult RecoverPassword([FromBody]string username)
        {
            var user = Repository.FindBy<User>(x => x.Username == username)
                .SingleOrDefault();
            if (user == null)
            {
                var warningMessage = "The user \"" + username + "\" does not exist";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("username", warningMessage);
                return BadRequest(ModelState);
            }
            if (user.Sso)
            {
                var warningMessage = "The user \"" + user.Username + "\" is an SSO user";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("username", warningMessage);
                return BadRequest(ModelState);
            }
            if (!user.Disabled)
            {
                var warningMessage = "The user \"" + user.Username + "\" is disabled";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("username", warningMessage);
                return BadRequest(ModelState);
            }

            UpsertToken(user);
            SendChangePasswordEmail(user);
            var message = "A password recovery email has been sent to the user \"" + username + "\"";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        [HttpPost]
        [Route("api/authenticateChangePasswordToken")]
        public IHttpActionResult AuthenticateChangePasswordToken([FromBody] string changePasswordToken)
        {
            var token = Repository.FindBy<Token>(c => c.Value == changePasswordToken)
               .SingleOrDefault();
            if (token == null)
            {
                var warningMessage = "The token \"" + changePasswordToken + "\" is invalid";
                Log.MonitoringLogger.Warn(warningMessage);
                return BadRequest(warningMessage);
            }
            if (token.ExpirationDate < DateTime.Now)
            {
                var warningMessage = "The token \"" + changePasswordToken + "\" has expired";
                Log.MonitoringLogger.Warn(warningMessage);
                return BadRequest(warningMessage);
            }
            return Ok();
        }

        [HttpPut]
        [Route("api/changePassword")]
        public IHttpActionResult ChangePassword([FromBody]ChangePasswordModel model)
        {
            var token = Repository.FindBy<Token>(c => c.Value == model.ChangePasswordToken)
                .Include(t => t.User)
                .SingleOrDefault();
            if (token == null)
            {
                var warningMessage = "The token \"" + model.ChangePasswordToken + "\" is invalid";
                Log.MonitoringLogger.Warn(warningMessage);
                return BadRequest(warningMessage);
            }
            if (token.ExpirationDate < DateTime.Now)
            {
                var warningMessage = "The token \"" + model.ChangePasswordToken + "\" has expired";
                Log.MonitoringLogger.Warn(warningMessage);
                return BadRequest(warningMessage);
            }
            var user = token.User;
            if (user.Sso)
            {
                var warningMessage = "The user \"" + user.Username + "\" is an SSO user";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("username", warningMessage);
                return BadRequest(ModelState);
            }
            if (!user.Disabled)
            {
                var warningMessage = "The user \"" + user.Username + "\" is disabled";
                Log.MonitoringLogger.Warn(warningMessage);
                ModelState.AddModelError("username", warningMessage);
                return BadRequest(ModelState);
            }
            user.Password = PasswordManagerProvider.Hash(model.NewPassword);
            Repository.Delete(token);
            Repository.Update(user);
            Repository.Save();
            var message = "The password for user \"" + user.Username + "\" has been changed";
            Log.MonitoringLogger.Info(message);
            return Ok(message);
        }

        private void SendChangePasswordEmail(User user)
        {
            using (var mailMessage = new MailMessage())
            {
                mailMessage.To.Add(new MailAddress(user.Email, user.Firstname + " " + user.Lastname));
                mailMessage.From = new MailAddress(Settings.Default.MailFromAddress);
                mailMessage.Subject = Resources.PIM.emailSubjectPasswordRecovery;
                mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;
                mailMessage.Body = Resources.PIM.emailPasswordRecovery
                    .Replace("{firstname}", user.Firstname)
                    .Replace("{lastname}", user.Lastname)
                    .Replace("{link}", Settings.Default.WebApplicationUrl + "#/changePassword?token=" + HttpContext.Current.Server.UrlEncode(user.Token.Value));
                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
                mailMessage.IsBodyHtml = true;
                using (var smtpClient = new SmtpClient())
                {
                    smtpClient.Host = Settings.Default.SmtpHost;
                    smtpClient.Send(mailMessage);
                }
            }
        }

        private void UpsertToken(User user)
        {
            if (user.Token == null)
                user.Token = new Token();
            user.Token.Value = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            user.Token.ExpirationDate = DateTime.Now.AddDays(1);
            Repository.Save();
        }

        private string RetrieveSGIdFromTicket(string ticket, string service)
        {
            using (var webClient = new WebClient())
            {
                var validateUrl = Settings.Default.CasValidateUrl + "?ticket=" + ticket + "&service=" + service;
                var stream = webClient.OpenRead(validateUrl);
                if (stream != null)
                {
                    var reader = new StreamReader(stream);
                    var response = reader.ReadToEnd();
                    var ssoResult = response.Split(new[] { '\n' }, StringSplitOptions.None);
                    if (ssoResult[0].Equals("yes", StringComparison.InvariantCultureIgnoreCase))
                    {
                        return ssoResult[1];
                    }
                }
            }
            return null;
        }
    }
}
