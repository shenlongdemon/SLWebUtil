using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicineRepository;

namespace SL.Infrastructure.Repository.EF.Medicine
{
    public class EFMedicineUnitOfWork : IMedicineUnitOfWork
    {
        private SLWebUtilContext _dbContext = new SLWebUtilContext();
        
        public EFMedicineUnitOfWork() {
            _patientRepository = new EFPatientRepository(_dbContext);
            _patientHistoryRepository = new EFPatientHistoryRepository(_dbContext);
        }

        #region Patient Repo
        private readonly IPatientRepository _patientRepository;
        public IPatientRepository PatientRepository
        {
            get
            {
                return _patientRepository;
            }
        }

        #endregion
        private readonly IPatientHistoryRepository _patientHistoryRepository;
        public IPatientHistoryRepository PatientHistoryRepository
        {
            get
            {
                return _patientHistoryRepository;
            }
        }


        public void Commit()
        {
            _dbContext.SaveChanges();
        }

        private bool disposed = false;
        

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
