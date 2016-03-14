using LocSLRepository;
using SL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SL.Infrastructure.Repository.EF.LocSL
{
    public class EFMyPlaceRepository: DbContextRepository<MyPlace>, IMyPlacesRepository
    {
        public EFMyPlaceRepository(DbContext DbContext)
        {
            this.DbContext = DbContext;
        }
    }
}
