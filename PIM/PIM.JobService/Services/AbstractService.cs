using System.Net.Http;
using System.Net.Http.Headers;

namespace PIM.JobService.Services
{
    public abstract class AbstractService
    {
        private HttpClient client = new HttpClient();
       

        public HttpClient HttpClient()
        {
            client.BaseAddress = new System.Uri(Properties.Settings.Default.apiUrl.ToString());
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return client;
        }

    }
}
