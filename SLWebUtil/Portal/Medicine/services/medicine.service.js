(function () {
    'use strict';

    angular
        .module('app')
        .factory('MedicineService', CompanyService);
   
    CompanyService.$inject = ['$http','Constants'];
    function CompanyService($http, Constants) {
        var service = {};
        service.GetPatientById = GetPatientById;
        service.GetPatientsById = GetPatientsById;
        service.CreatePatient = CreatePatient;
        service.GetMedicineHistoriesByPatientId = GetMedicineHistoriesByPatientId;
        service.GetPatientHistoriesByPatientId = GetPatientHistoriesByPatientId;
        service.GetPatientsByName = GetPatientsByName;
        service.UpdatePatientHistory = UpdatePatientHistory;
        return service;



        function GetPatientById(patientid) {
            var api = Constants.MEDICINE_API.replace("{act}", "GetPatientById").replace("{obj}", patientid);
            return $http.get(api);
        }
        function GetPatientsById(patientid) {
            var api = Constants.MEDICINE_API.replace("{act}", "GetPatientsById").replace("{obj}", patientid);
            return $http.get(api);
        }
        function CreatePatient(patient) {
            var data = JSON.stringify(patient);
            var api = Constants.MEDICINE_API.replace("{act}", "CreatePatient").replace("{obj}", data);
            return $http.get(api);
        }
        function GetMedicineHistoriesByPatientId(patient_date) {
            var data = JSON.stringify(patient_date);
            var api = Constants.MEDICINE_API.replace("{act}", "GetMedicineHistoriesByPatientId").replace("{obj}", data);
            return $http.get(api);
        }
        function GetPatientHistoriesByPatientId(patientid)
        {            
            var api = Constants.MEDICINE_API.replace("{act}", "GetPatientHistoriesByPatientId").replace("{obj}", patientid);
            return $http.get(api);
        }
        function GetPatientsByName(patientName)
        {
            var api = Constants.MEDICINE_API.replace("{act}", "GetPatientsByName").replace("{obj}", patientName);
            return $http.get(api);
        }
        function UpdatePatientHistory(patienthistory)
        {
        var data = JSON.stringify(patienthistory);
            var api = Constants.MEDICINE_API.replace("{act}", "UpdatePatientHistory").replace("{obj}", data);
            return $http.get(api);
        }
    }

})();
