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



        return service;



        function GetPatientById(patientid) {
            var api = Constants.MEDICINE_API.replace("{act}", "GetPatientById").replace("{obj}", patientid)
            return $http.get(api);
        }
        function GetPatientsById(patientid) {
            var api = Constants.MEDICINE_API.replace("{act}", "GetPatientsById").replace("{obj}", patientid)
            return $http.get(api);
        }

    }

})();
