using System.Security.Cryptography;
using System.Text;

namespace PIM.API.Providers
{
    public class PasswordManagerProvider : IPasswordManagerProvider
    {
        public string Hash(string password)
        {
            using (var hashAlgorithm = new SHA256Managed())
            {
                var bytes = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(password));
                var encodedPassword = new StringBuilder();
                foreach (var b in bytes)
                {
                    encodedPassword.Append(b.ToString("x2"));
                }
                return encodedPassword.ToString();
            }
        }
    }
}