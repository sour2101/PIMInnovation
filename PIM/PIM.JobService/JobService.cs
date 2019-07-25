using PIM.JobService.Enum;
using PIM.JobService.Models;
using PIM.JobService.Services;
using System;
using System.IO;
using System.Net.Http;
using System.ServiceProcess;
using System.Timers;

namespace PIM.JobService
{
    partial class JobService : ServiceBase
    {
        Timer timer = new Timer();
        private LookupServices ls;
        public JobService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            timer.Elapsed += new ElapsedEventHandler(OnElapsedTime);
            timer.Interval = 60000; //number in milisecinds  
            timer.Enabled = true;
        }

        protected override void OnStop()
        {
            // TODO: Add code here to perform any tear-down necessary to stop your service.
        }

        private void OnElapsedTime(object source, ElapsedEventArgs e)
        {
            LoadExcel();
        }

        private void LoadExcel()
        {
            try
            {
                string path = Properties.Settings.Default.loadPath;
                string directoryName = string.Empty;
                var dirDetails = Directory.GetDirectories(path);
                string[] dirNames = System.Enum.GetNames(typeof(DirectoryNames));

                foreach (string dir in dirDetails)
                {
                    if (dir.Contains(DirectoryNames.LookupModelExcel.ToString()))
                    {
                        directoryName = DirectoryNames.LookupModelExcel.ToString();
                        string[] files = Directory.GetFiles(dir);
                        foreach (string file in files)
                        {
                            string fileName = Path.GetFileName(file);
                            File.Move(dir + "\\" + fileName, Properties.Settings.Default.progressPath + directoryName + "\\" + fileName);
                            ls = new LookupServices();
                            FileDetails fd = new FileDetails();
                            fd.FileName = fileName;
                            fd.DirectoryName = directoryName;
                            HttpResponseMessage res = ls.InsertLookupData(fd);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                WriteToFile(ex.Message);
            }

        }
        public void WriteToFile(string Message)
        {
            string path = Properties.Settings.Default.logPath;
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string filepath = Properties.Settings.Default.logPath+@"\ServiceLog_" + DateTime.Now.Date.ToShortDateString().Replace('/', '_') + ".txt";
            if (!File.Exists(filepath))
            {
                // Create a file to write to.   
                using (StreamWriter sw = File.CreateText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
        }

    }
}
