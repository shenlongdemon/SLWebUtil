using SL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MedicineRepository.EF
{
    public class EFPatientRepository : DbContextRepository<Patient>, IPatientRepository
    {        
        public EFPatientRepository(DbContext DbContext)
        {
            this.DbContext = DbContext;            
        }
       
        public Patient GetById(int id)
        {
            return this.All().FirstOrDefault(p => p.Id == id);
        }
    }
}
