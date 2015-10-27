using OrionServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagerServices
{
    public class ManagerService
    {
        private static ManagerService _ManagerService;
        private readonly string ORION_SERVICE = "orion";
        private readonly OrionService _OrionService = new OrionService();
        public static ManagerService Instance()
        {
            if (_ManagerService == null)
            {
                _ManagerService = new ManagerService();
            }
            return _ManagerService;
        }
        public async Task<object> DoAction(string service, string action, object obj)
        {
            object res = null;
            if (service.ToLower().Equals(ORION_SERVICE))
            {
                res = await _OrionService.DoAction(action, (string)obj);
            }
            else
            {
                res = null;
            }
            return res;
        }
    }
}
