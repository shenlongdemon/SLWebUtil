using LocSLRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SL.Infrastructure.Repository.EF.LocSL
{
    public class EFLocSLUnitOfWork : ILocSLUnitOfWork
    {
        private LocSLDBContext _dbContext = new LocSLDBContext();
        private readonly IMyPlacesRepository _myPlaceRepository;

        public EFLocSLUnitOfWork()
        {
            _myPlaceRepository = new EFMyPlaceRepository(_dbContext);
        }
        public IMyPlacesRepository MyPlacesRepository
        {
            get
            {
                return _myPlaceRepository;
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
