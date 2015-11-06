using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Services;
namespace SLWebUtil.Controllers.ApiAuth
{
    public class ApiAuthAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            try
            {
                HttpResponseMessage isAuthorized = IsAuthorized(actionContext);
                if (isAuthorized.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    actionContext.Response = isAuthorized;
                    actionContext.Response.Content = new StringContent("Unauthorized User");
                    return;
                }       
            }
            catch (Exception)
            {
                
            }
            base.OnActionExecuting(actionContext);
            
        }
        private HttpResponseMessage IsAuthorized(HttpActionContext actionContext)
        {
            HttpResponseMessage resMsg = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            string token = string.Empty;
            string username = string.Empty;
            var controller = (actionContext.ControllerContext.Controller as ApiController);
            string service = actionContext.ActionArguments["service"].ToString();
            string act = actionContext.ActionArguments["act"].ToString();
            try
            {
                if (actionContext.Request.Headers.Authorization != null)
                {
                    username = actionContext.Request.Headers.Authorization.Scheme;
                    token = actionContext.Request.Headers.Authorization.Parameter;
                }                
            }
            catch (Exception ex) { }
            var tokenAuth = new { UserName = username, Token = token };
            resMsg = ManagerService.Instance().IsAuthorized(service, act, tokenAuth);
            return resMsg;
        }
    }
}