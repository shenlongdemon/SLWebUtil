using SL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicineRepository
{
    public interface IMedicineUnitOfWork : IUnitOfWork
    {
        IPatientRepository PatientRepository { get; }
    }
}
