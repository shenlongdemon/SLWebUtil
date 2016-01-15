using RepositoryUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicineRepository
{
    public class MedicineRepo 
    {
        private static MedicineRepo _MedicineRepo;
        private SLWebUtilContext dbContext = null;
        public static MedicineRepo Instance()
        {
            if (_MedicineRepo == null)
            {
                _MedicineRepo = new MedicineRepo();
                _MedicineRepo.dbContext = new SLWebUtilContext();
            }
            return _MedicineRepo;
        }
        public EFRepository<T> GetRepo<T>() where T : class
        {            
            return new EFRepository<T>(dbContext);
        }
    }
}
