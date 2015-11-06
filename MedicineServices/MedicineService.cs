using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicineRepository;
using RepositoryUtility;
using System.Dynamic;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using Utilities;
using System.Data.Entity;
using System.Globalization;

namespace Services
{
    public class MedicineService
    {
        private EFRepository<Patient> _patientRepo = MedicineRepo.Instance().GetRepo< Patient>();
        private EFRepository<PatientHistory> _patientHistoryRepo = MedicineRepo.Instance().GetRepo<PatientHistory>();
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
        [TokenAuth]
        public async Task<dynamic> GetPatientsById(object patientId)
        {
            return await Task.Run(() =>
            {
                string id = patientId.ToString();
                var pat = _patientRepo.Where(p => p.Id.ToString().Contains(id.ToString()));
                return pat;
            });
        }
        public async Task<dynamic> CreatePatient(object patient)
        {            
            Patient ins = patient.ToObject<Patient>();            
            ins.Guid = Guid.NewGuid();
            Patient pat = await _patientRepo.InsertAsync(ins);            
            return pat;
        }
        public async Task<dynamic> GetMedicineHistoriesByPatientId(object data) // PatientId && Date
        {

            dynamic inData = data.ToDynamicObject();
            int PatientId = inData.PatientId;
            DateTime Date = inData.Date;
            List<PatientHistory> list = await _patientHistoryRepo.Where(p => p.PatientId == PatientId
                                                                        && p.Date == Date).ToListAsync< PatientHistory>();
            
            return list;
        }
        public async Task<dynamic> GetPatientHistoriesByPatientId(object data) // int
        {
            
                int patientid = int.Parse(data.ToString());
                var list = await _patientHistoryRepo.Where(p => p.PatientId == patientid)
                                            .OrderByDescending(p => p.Date).ToListAsync();

                var group = list.GroupBy(p => new { p.Date.Year, p.Date.Month, p.Date.Day })
                                .Select(g => new
                                {
                                    PatientId = patientid,
                                    Date = new DateTime(g.Key.Year, g.Key.Month, g.Key.Day),
                                    Count = g.Count()
                                }).ToList();
                return group;
           
        }
        public async Task<dynamic> GetPatientsByName(object data)
        {
            
            string[] names = data.ToString().ToLower().ConvertUniCodeToASCII().Split(" ");
            IQueryable<Patient> list = _patientRepo.GetAll();
            foreach (string name in names)
            {
                list = list.Where(p => p.Name.ToLower().Contains(name.ToLower()));                  
            }
            return await list.ToListAsync();
            
        }
        public async Task<dynamic> GetPatientsByPhone(object data)
        {            
            string fone = data.ToString();
            List<Patient> list = await _patientRepo.Where(p => p.Phone.Contains(fone)).ToListAsync();                   
            return list;            
        }
        public async Task<dynamic> GetMedicineNames(object data)
        {
            List<string> list = await _patientHistoryRepo.GetAll().Select(p=>p.MedicineName).ToListAsync();
            return list;
        }
        
        public async Task<dynamic> DeleteMedicineHistory(object data)
        {
            int id = int.Parse(data.ToString());
            PatientHistory ph = _patientHistoryRepo.First(p=>p.Id == id);
            _patientHistoryRepo.Delete(ph);
            int res = await _patientHistoryRepo.SaveChangesAsync();
            
            return res == 0 ? res : id;
            
        }
        
        public async Task<dynamic> DeletePatient(object data)
        {            
            int id = int.Parse(data.ToString());
            IQueryable<PatientHistory> phs = _patientHistoryRepo.Where(p => p.PatientId == id);
            _patientHistoryRepo.DeleteAll(phs);             
            int re = await _patientHistoryRepo.SaveChangesAsync();
            Patient pt = _patientRepo.First(p=>p.Id == id);
            _patientRepo.Delete(pt);
            int res = await _patientRepo.SaveChangesAsync();
            return (res == 0 && re == 0) ? 0 : id;           
        }
        public async Task<dynamic> UpdatePatientHistory(object data)
        {
            PatientHistory ph = data.ToObject<PatientHistory>();
            if (ph.Id == 0)
            {
                PatientHistory newph = new PatientHistory();
                newph.MedicineName = ph.MedicineName;
                newph.Unit = ph.Unit;
                newph.Count = ph.Count;
                newph.Price = ph.Price;
                newph.Date = ph.Date;
                newph.PatientId = ph.PatientId;
                ph = await _patientHistoryRepo.InsertAsync(newph);

            }
            else
            {
                int id = ph.Id;
                PatientHistory src = _patientHistoryRepo.First(p => p.Id == id);
                src.MedicineName = ph.MedicineName;
                src.Unit = ph.Unit;
                src.Count = ph.Count;
                src.Price = ph.Price;
                ph = _patientHistoryRepo.Update(src);
                await _patientHistoryRepo.SaveChangesAsync();
            }
            return ph;
        }

    }
}
