using MedicineRepository;
using Ninject.Modules;
using SL.Infrastructure.Repository.EF.Medicine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SL.Infrastructure.Inject.Resolver.Medicine
{
    public class MedicineModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IMedicineUnitOfWork>().To<EFMedicineUnitOfWork>();
        }
    }
}
