using SL.Repository;
namespace MedicineRepository
{
    public interface IPatientRepository : IGenericRepository<Patient>
    {
        Patient GetById(int id);
    }
}
