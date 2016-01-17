using SL.Repository;

namespace MedicineRepository
{
    public interface IPatientHistoryRepository : IGenericRepository<PatientHistory>
    {
        PatientHistory GetById(int id);
    }
}
