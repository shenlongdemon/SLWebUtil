using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicineRepository;
using RepositoryUtility;
using System.Dynamic;

namespace Services
{
    public class MedicineService
    {
        private EFRepository<Patient> _patientRepo = MedicineRepo.Instance().GetRepo< Patient>();
        public MedicineService(){}
        public async Task<dynamic> GetPatientById(object patientId)
        {
            return await Task.Run(() => 
            {
                int id = int.Parse(patientId.ToString());
                Patient pat = _patientRepo.First(p => p.Id == id);
                return pat;
            });
        }
        public async Task<dynamic> GetPatientsById(object patientId)
        {
            return await Task.Run(() =>
            {
                string id = patientId.ToString();
                var pat = _patientRepo.Where(p => p.Id.ToString().Contains(id.ToString()));
                return pat;
            });
        }
        public async Task<dynamic> Create(object patient)
        {
            Patient ins = (Patient)patient;
            Patient pat = await _patientRepo.InsertAsync(ins);            
            return pat;
        }
    }
}
