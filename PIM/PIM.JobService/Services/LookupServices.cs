using Newtonsoft.Json;
using PIM.JobService.Models;
using System.Net.Http;
using System.Text;

namespace PIM.JobService.Services
{
    public class LookupServices:AbstractService
    {

        public HttpResponseMessage InsertLookupData(FileDetails file)
        {
            string json = JsonConvert.SerializeObject(file);
            StringContent data = new StringContent(json, Encoding.UTF8, "application/json");
            return HttpClient().PostAsync("JobService", data).Result;
        }
    }
}
