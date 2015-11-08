
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using Services;
using System.Dynamic;
using SLWebUtil.Controllers.ApiAuth;
using Utilities;
namespace SLWebUtil.Controllers
{
    public class ServiceController : ApiController
    {
        [ApiAuth]
        [System.Web.Http.HttpGet]
        public async Task<ActionResult> DoAction(string service, string act, string obj)
        {
            try
            {
                dynamic resDynamic = await ManagerService.Instance().DoAction(service, act, obj);
                string jsonObject = JsonConvert.SerializeObject(resDynamic,
                                        Formatting.None,
                                        new JsonSerializerSettings()
                                        {
                                            ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                                        }
                                    );
                object resObject = JsonConvert.DeserializeObject(jsonObject);
                return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = resObject };
            }
            catch (Exception ex)
            {
                dynamic resDynamic = new ExpandoObject();
                string exStr = ex.GetHierarchyString();
                return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = ex.Message };
            }
        }
    }
}
