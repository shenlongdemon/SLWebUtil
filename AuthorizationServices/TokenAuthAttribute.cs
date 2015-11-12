using RepositoryUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicineRepository;
using System.Net.Http;
using Utilities;
namespace Services
{
    public class TokenAuthAttribute:Attribute
    {
        private EFRepository<TokenHistory> _tokenHistoryRepo = MedicineRepo.Instance().GetRepo<TokenHistory>();
        private EFRepository<UserAccount> _userAccountRepo = MedicineRepo.Instance().GetRepo<UserAccount>();
        public HttpResponseMessage IsAuthorized(object data) // UserName and Token
        {
            dynamic inData = (dynamic)data;
            string username = inData.username;
            Guid token = Guid.Parse(inData.token);
            long now = DateTime.Now.Ticks;
            var th = _tokenHistoryRepo.First(p => p.UserName.Equals(username) && p.Token == token && p.ExpireDate > now);
            if (th == null)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
            }
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        }
    }
}
