using SL.Repository;

namespace MedicineRepository
{
    public interface IMedicineUnitOfWork : IUnitOfWork
    {
        IPatientRepository PatientRepository { get; }
        IPatientHistoryRepository PatientHistoryRepository { get; }
    }
}
