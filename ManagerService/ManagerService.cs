using System.Collections.Generic;
using System.Threading.Tasks;
using Utilities;
using System.Linq;
using System.Reflection;
using System;
using System.Net.Http;

namespace Services
{
    public class ManagerService
    {
        private static ManagerService _ManagerService;        
        private static readonly string NAMESPACE = "Services";
        private static readonly string SERVICE = "Service";
        public List<object> Services { get; set; }
        
        public async Task< dynamic> DoAction(string service, string action, string obj)
        {
            var srv = GetService(service);
            dynamic res = await srv.InvokeAsync(action, new string[] {  obj } );            
            return res;
        }
        public HttpResponseMessage IsAuthorized(string service, string action, object tokenAuth)
        {
            HttpResponseMessage resMsg = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            var srv = GetService(service);
            MethodInfo method = srv.GetMethodByName(action);
            List<Attribute> attrs = method.GetCustomAttributes().Where( p=>p.GetType().Namespace == NAMESPACE).ToList();
            attrs.ForEach(m => {
                try
                {
                    resMsg = (HttpResponseMessage)m.Invoke("IsAuthorized", new object[] { tokenAuth });
                    if (resMsg == null || resMsg.StatusCode != System.Net.HttpStatusCode.OK)
                    {
                        return;
                    }
                }
                catch (Exception ex)
                { }
            });
            return resMsg;
        }
        private object GetService(string service)
        {
            object srv = Services.Where(p => p.GetType().FullName.ToLower().Equals(
                                                                                    (NAMESPACE + "." + service + SERVICE).ToLower()
                                                                                 )
                                       ).FirstOrDefault();
            return srv;
        }
        public static ManagerService Instance()
        {
            if (_ManagerService == null)
            {
                _ManagerService = new ManagerService();
                _ManagerService.Services = new List<object>()
                {
                    new OrionService(),
                    new MedicineService(),
                    new AuthorizationService(),
                    new GCMNotificationService()


                };
            }
            return _ManagerService;
        }
    }
}

