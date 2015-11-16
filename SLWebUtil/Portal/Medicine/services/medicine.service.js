(function () {
    'use strict';

    angular
        .module('app')
        .factory('MedicineService', CompanyService);
   
    CompanyService.$inject = ['$http','Constants'];
    function CompanyService($http, Constants) {
        var service = {};
        var API_BASE = Constants.API_BASE;
        var MEDICINE_API = API_BASE + "api/service/doaction?service=medicine&act={act}&obj={obj}";
        service.GetPatientById = GetPatientById;
        service.GetPatientsById = GetPatientsById;
        service.CreatePatient = CreatePatient;
        service.GetMedicineHistoriesByPatientId = GetMedicineHistoriesByPatientId;
        service.GetPatientHistoriesByPatientId = GetPatientHistoriesByPatientId;
        service.GetPatientsByName = GetPatientsByName;
        service.UpdatePatientHistory = UpdatePatientHistory;
        service.DeleteMedicineHistory = DeleteMedicineHistory;
        service.DeletePatient = DeletePatient;
        service.GetPatientsByPhone = GetPatientsByPhone;
        service.GetMedicineNames = GetMedicineNames;
        service.GetReportByTime = GetReportByTime;
        return service;

        
        function GetMedicineNames() {
            var api = MEDICINE_API.replace("{act}", "GetMedicineNames").replace("{obj}", 0);
            return $http.get(api);
        }

        function GetPatientById(patientid) {
            var api = MEDICINE_API.replace("{act}", "GetPatientById").replace("{obj}", patientid);
            return $http.get(api);
        }
        function GetPatientsById(patientid) {
            var api = MEDICINE_API.replace("{act}", "GetPatientsById").replace("{obj}", patientid);
            return $http.get(api);
        }
        function CreatePatient(patient) {
            var data = JSON.stringify(patient);
            var api = MEDICINE_API.replace("{act}", "CreatePatient").replace("{obj}", data);
            return $http.get(api);
        }
        function GetMedicineHistoriesByPatientId(patient_date) {
            var data = JSON.stringify(patient_date);
            var api = MEDICINE_API.replace("{act}", "GetMedicineHistoriesByPatientId").replace("{obj}", data);
            return $http.get(api);
        }
        function GetPatientHistoriesByPatientId(patientid)
        {            
            var api = MEDICINE_API.replace("{act}", "GetPatientHistoriesByPatientId").replace("{obj}", patientid);
            return $http.get(api);
        }
        function GetPatientsByName(patientName)
        {
            var api = MEDICINE_API.replace("{act}", "GetPatientsByName").replace("{obj}", patientName);
            return $http.get(api);
        }
        function UpdatePatientHistory(patienthistory)
        {
            var data = JSON.stringify(patienthistory);
            var api = MEDICINE_API.replace("{act}", "UpdatePatientHistory").replace("{obj}", data);
            return $http.get(api);
        }
        function DeleteMedicineHistory(id)
        {
            var api = MEDICINE_API.replace("{act}", "DeleteMedicineHistory").replace("{obj}", id);
            return $http.get(api);
        }
        function DeletePatient(id)
        {
            var api = MEDICINE_API.replace("{act}", "DeletePatient").replace("{obj}", id);
            return $http.get(api);
        }
        function GetPatientsByPhone(phone)
        {
            var api = MEDICINE_API.replace("{act}", "GetPatientsByPhone").replace("{obj}", phone);
            return $http.get(api);
        }
        function GetReportByTime(obj)
        {
            var data = JSON.stringify(obj);
            var api = MEDICINE_API.replace("{act}", "GetReportByTime").replace("{obj}", data);
            return $http.get(api);
        }
        
    }

})();
