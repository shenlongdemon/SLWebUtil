using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;
namespace ManagerServices
{
    public class ManagerService
    {
        private static ManagerService _ManagerService;
        private static readonly string NAMESPACE = "Services";
        private static readonly string SERVICE = "Service";
        private static readonly string INVOKE_ACTION = "DoAction";
        public static ManagerService Instance()
        {
            if (_ManagerService == null)
            {
                _ManagerService = new ManagerService();
            }
            return _ManagerService;
        }
        public async Task<object> DoAction(string service, string action, string obj)
        {
            object srv = this.CreateInstance(NAMESPACE + "." + service.ToUpperCase(0) + SERVICE);
            object res = await srv.InvokeAsync(INVOKE_ACTION, new string[] { action, obj } );            
            return res;
        }
    }
}

