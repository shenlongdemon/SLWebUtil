
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
                string exStr = ex.GetHierarchyString();
                throw new Exception(exStr, ex);
                //return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = exStr };
            }
        }
        [ApiAuth]
        [System.Web.Http.HttpPost]
        public async Task<ActionResult> DoPost(dynamic obj)
        {
            try
            {
                dynamic resDynamic = await ManagerService.Instance().DoAction(obj);
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
                string exStr = ex.GetHierarchyString();
                throw new Exception(exStr, ex);
                //return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = exStr };
            }
        }
    }
}
