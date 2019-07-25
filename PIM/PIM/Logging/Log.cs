using log4net;
using log4net.Config;

[assembly: XmlConfigurator(Watch = true)]
namespace PIM.API.Logging
{
    public static class Log
    {
        public static ILog MonitoringLogger => LogManager.GetLogger("MonitoringLogger");

        public static ILog ExceptionLogger => LogManager.GetLogger("ExceptionLogger");
    }
}