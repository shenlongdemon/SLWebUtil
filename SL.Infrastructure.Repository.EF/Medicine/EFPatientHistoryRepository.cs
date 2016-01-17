using MedicineRepository;
using SL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SL.Infrastructure.Repository.EF.Medicine
{
    public class EFPatientHistoryRepository : DbContextRepository<PatientHistory>, IPatientHistoryRepository
    {
        public EFPatientHistoryRepository(DbContext DbContext)
        {
            this.DbContext = DbContext;
        }

        public PatientHistory GetById(int id)
        {
            return this.All().FirstOrDefault(p => p.Id == id);
        }
    }
}
