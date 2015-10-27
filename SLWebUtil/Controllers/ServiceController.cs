
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using ManagerServices;
namespace SLWebUtil.Controllers
{
    public class ServiceController : ApiController
    {
        
        [System.Web.Http.HttpGet]
        public async Task<ActionResult> DoAction(string service,string act, string obj)
        {
            try
            {
                object resDynamic = await ManagerService.Instance().DoAction(service, act, obj);
                string jsonObject = JsonConvert.SerializeObject(resDynamic);
                object resObject = JsonConvert.DeserializeObject(jsonObject);
                return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = resObject };
            }
            catch (Exception ex)
            {
                return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = ex.Message };
            }
        }
    }
}
