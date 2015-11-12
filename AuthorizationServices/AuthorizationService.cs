using MedicineRepository;
using RepositoryUtility;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;
namespace Services
{
    public class AuthorizationService
    {
        private static readonly int EXPIRE_DAY = 1;
        private EFRepository<UserAccount> _userAccountRepo = MedicineRepo.Instance().GetRepo<UserAccount>();
        private EFRepository<TokenHistory> _tokenHistory = MedicineRepo.Instance().GetRepo<TokenHistory>();
        public AuthorizationService() { }
        public async Task<dynamic> Login(object data) // username and password(MD5-ed)
        {
            return await Task.Run(() =>
            {
                dynamic inData = data.ToDynamicObject();
                string username = inData.username;
                string password = inData.password;
                var user = _userAccountRepo.First(p => p.UserName.Equals(username) && p.Password.Equals(password));
                if (user != null)
                {
                    long now = DateTime.Now.Ticks;
                    var token = _tokenHistory.Where(p => p.UserName.Equals(username) && p.ExpireDate > now).OrderByDescending(p => p.ExpireDate).FirstOrDefault();
                    if (token != null)
                    {
                        dynamic res = new ExpandoObject();
                        res.username = username;
                        res.token = token.Token;
                        return res;
                    }
                    else
                    {
                        TokenHistory th = new TokenHistory();
                        th.Id = Guid.NewGuid();
                        th.Token = Guid.NewGuid();
                        th.ExpireDate = DateTime.Now.AddDays(EXPIRE_DAY).Ticks;
                        th.CreatedDate = DateTime.Now.Ticks;
                        th.UserName = username;
                        _tokenHistory.Insert(th);
                        dynamic res = new ExpandoObject();
                        res.username = username;
                        res.token = th.Token;
                        return res;
                    }
                }

                return null;
            });
        }
    }
}
