using System.Collections.Generic;
using System.Threading.Tasks;
using Utilities;
using System.Linq;
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
            object srv = Services.Where(p=> p.GetType().FullName.ToLower().Equals(
                                                                                    (NAMESPACE + "." + service + SERVICE).ToLower()
                                                                                 )
                                       ).FirstOrDefault();
            dynamic res = await srv.InvokeAsync(action, new string[] {  obj } );
            
            return res;
        }
        public static ManagerService Instance()
        {
            if (_ManagerService == null)
            {
                _ManagerService = new ManagerService();
                _ManagerService.Services = new List<object>()
                {
                    new OrionService(),
                    new MedicineService()
                };
            }
            return _ManagerService;
        }
    }
}

