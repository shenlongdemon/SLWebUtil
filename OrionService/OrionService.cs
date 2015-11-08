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
            object res = null;
            
            HttpResponseMessage response = await WebApiUtil.GetAsync(urlOfTxtFile);
            if (response.IsSuccessStatusCode)
            {                
                string str =  await response.Content.ReadAsStringAsync();
                res = (object)AnalyzeText(str);
            }
            return res; 
        }
        private static readonly string SEPARATOR_ANALYZE_TXT_FILE = "---";
        private static readonly string OPEN_PORT = "Open Port";
        private static readonly string RESET_CPU = "Reset CPU";
        private static readonly string FACTORY_RESET = "Factory Reset";
        private static readonly string RUN_APP = "Run App";
        private static readonly string WRITE_SETTING = "Write Setting";
        private static readonly string SETTINGS = "SETTINGS";
        private static readonly string UPDATE_FW = "UpdateFW";
        private static readonly string SEPARATOR_FIRMWARE = "Firmware";
        private object AnalyzeText(string content)
        {

            dynamic res = new ExpandoObject();
            content = content.Replace("\r\n", "");
            string[] cts = content.Split(SEPARATOR_ANALYZE_TXT_FILE);
            if (cts.Length > 0)
            {
                foreach (string str in cts)
                {
                    if (str.IndexOf(OPEN_PORT) >=0)
                    {
                        string[] data = str.Split(";");
                        res.OpenPort = data.Skip(1).Take(data.Length - 1).ToArray();
                    }
                    else if (str.IndexOf(RESET_CPU) >= 0)
                    {
                        string[] data = str.Split(";");
                        res.ResetCPU = data.Skip(1).Take(data.Length - 1).ToArray();
                    }
                    else if (str.IndexOf(FACTORY_RESET) >= 0)
                    {
                        string [] data = str.Split(";");
                        res.FactoryReset = data.Skip(1).Take(data.Length - 1).ToArray();
                    }
                    else if (str.IndexOf(RUN_APP) >= 0)
                    {
                        res.RunApp = str.Split(";")[1];
                    }
                    else if (str.IndexOf(WRITE_SETTING) >= 0)
                    {
                        res.WriteSetting = str.Split(";")[1];
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
                            string name = SEPARATOR_FIRMWARE + " " + strs[0].Trim();
                            string []code = strs.Skip(1).Take(strs.Length - 1).Select(p => p.ToUpper()).ToArray();
                            var item = new { Name = name, Code = code };
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
