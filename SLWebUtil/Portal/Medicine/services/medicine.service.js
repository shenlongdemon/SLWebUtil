(function () {
    'use strict';

    angular
        .module('app')
        .factory('MedicineService', CompanyService);

    CompanyService.$inject = ['$http','Constants'];
    function CompanyService($http, Constants) {
        var service = {};

        var API_BASE = Constants.API_BASE;
        var API_COMPANY = API_BASE + "/companies/";
        service.GetAll = GetAll;
        service.Create = Create;
        service.Update = Update;
        service.GetById = GetById;

        return service;

        
        function GetAll() {
            
        }
        function GetById(id) {
            
        }

        function Create(company) {
           
        }
        function Update(company) {
            
        }


    }

})();
