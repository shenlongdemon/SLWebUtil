using RepositoryUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicineRepository;
using System.Net.Http;

namespace Services
{
    public class TokenAuthAttribute:Attribute
    {
        private EFRepository<TokenHistory> _tokenHistoryRepo = MedicineRepo.Instance().GetRepo<TokenHistory>();
        private EFRepository<UserAccount> _userAccountRepo = MedicineRepo.Instance().GetRepo<UserAccount>();
        public HttpResponseMessage IsAuthorized(object data) // UserName and Token
        {
                        
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        }
    }
}
