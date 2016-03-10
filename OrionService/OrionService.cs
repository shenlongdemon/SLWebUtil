using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Utilities;
using WebApiUtility;
namespace Services
{
    public class OrionService
    {
        public OrionService() { }
        public async Task<object> AnalyzeTxtFile(string urlOfTxtFile)
        {
            
            urlOfTxtFile = System.Configuration.ConfigurationManager.AppSettings["Orion_Txt_file"].ToString();
                           
            string str = await WebApiUtil.GetContentSite(urlOfTxtFile);
            string[] nameAndLinks = str.Replace("\r\n","")
                                        .Split("---")
                                        .Where(p=>string.IsNullOrEmpty(p) == false)
                                        .ToArray();





            List<dynamic> res = new List<dynamic>();
            foreach (var nameAndLink in nameAndLinks)
            {
                object o = await Task.Run(async () =>
                {

                    string[] nameLink = nameAndLink.Split(";");
                    string name = nameLink[0].Trim();
                    string link = nameLink[1].Trim();
                    object obj = await AnalyzeText(link);
                    dynamic resObj = new ExpandoObject();
                    resObj.Name = name;
                    resObj.Object = obj;
                    return resObj;
                });
                res.Add(o);
            }


            //var res = await Task.Run(() =>
            //{
            //    List<dynamic> retList = new List<dynamic>();
            //    Parallel.ForEach(nameAndLinks, nameAndLink =>
            //    {
            //        string[] nameLink = nameAndLink.Split(";");
            //        string name = nameLink[0].Trim();
            //        string link = nameLink[1].Trim();
            //        object obj = AnalyzeText(link);
            //        dynamic resObj = new ExpandoObject();
            //        resObj.Name = name;
            //        resObj.Object = obj;
            //        retList.Add(resObj);
            //    });
            //    return retList.OrderBy(p => p.Name);
            //});



            return res; 
        }
        private static readonly string SEPARATOR_ANALYZE_TXT_FILE = "---";
        private static readonly string DELAY = "Delay";
        private static readonly string OPEN_PORT = "Open Port";
        private static readonly string RESET_CPU = "Reset CPU";
        private static readonly string FACTORY_RESET = "Factory Reset";
        private static readonly string RUN_APP = "Run App";
        private static readonly string WRITE_SETTING = "Write Setting";
        private static readonly string SETTINGS = "SETTINGS";
        private static readonly string UPDATE_FW = "UpdateFW";
        private static readonly string SEPARATOR_FIRMWARE = "Firmware";
        private async Task<object> AnalyzeText(string link)
        {

            string content = await WebApiUtil.GetContentSite(link);
            content = content.Replace("\r\n", "");

            dynamic res = new ExpandoObject();
            
            string[] cts = content.Split(SEPARATOR_ANALYZE_TXT_FILE);
            if (cts.Length > 0)
            {
                foreach (string str in cts)
                {
                    if (str.IndexOf(DELAY) >= 0)
                    {
                        res.Delay = str.Split(";")[1];
                    }
                    else if (str.IndexOf(OPEN_PORT) >=0)
                    {                        
                        string[] data = str.Split(";");
                        res.OpenPortName = data[1];
                        res.OpenPort = data.Skip(2).Take(data.Length - 2).ToArray();
                    }
                    else if (str.IndexOf(RESET_CPU) >= 0)
                    {
                        string[] data = str.Split(";");
                        res.ResetCPUName = data[1];
                        res.ResetCPU = data.Skip(2).Take(data.Length - 2).ToArray();
                    }
                    else if (str.IndexOf(FACTORY_RESET) >= 0)
                    {
                        string [] data = str.Split(";");
                        res.FactoryResetName = data[1];
                        res.FactoryReset = data.Skip(2).Take(data.Length - 2).ToArray();
                    }
                    else if (str.IndexOf(RUN_APP) >= 0)
                    {
                        string[] data = str.Split(";");
                        res.RunAppName = data[1];
                        res.RunApp = data[2];
                    }
                    else if (str.IndexOf(WRITE_SETTING) >= 0)
                    {
                        string[] data = str.Split(";");
                        res.WriteSettingName = data[1];
                        res.WriteSetting = data[2];
                    }
                    else if (str.IndexOf(SETTINGS) >= 0)
                    {
                        string[] data = str.Split(";");
                        string[] settings = data.Skip(1).Take(data.Length - 1).ToArray();
                        List<object> items = new List<object>();
                        for(int i = 0 ; i < settings.Length / 2;i++)
                        {
                            var item = new {Name = settings[i*2], Code=settings[i*2 + 1].ToUpper()};
                            items.Add(item);
                        }
                        res.Settings = items;
                    }
                    else if (str.IndexOf(UPDATE_FW) >= 0)
                    {
                        string ufw = str.Substring(UPDATE_FW.Length + 1, str.Length - UPDATE_FW.Length - 1);
                        string[] datas = ufw.Split(SEPARATOR_FIRMWARE).Where(p=>!string.IsNullOrEmpty(p)).ToArray();
                        List<object> items = new List<object>();
                        foreach (string fw in datas)
                        {
                            string [] strs = fw.Split(";");

                            string name = //SEPARATOR_FIRMWARE + " " + 
                                            strs[0].Trim();
                            int display = int.Parse(strs[1].Trim());
                            string []code = strs.Skip(2).Take(strs.Length - 2).Select(p => p.Trim().ToUpper()).Where(p=>!string.IsNullOrEmpty(p) && !string.IsNullOrWhiteSpace(p)).ToArray();

                            

                            var item = new { Name = name, Display = display, Code = code };
                            items.Add(item);
                        }
                        res.UpdateFW = items;
                    }

                }
            }
            return res;            
        }
    }
}
