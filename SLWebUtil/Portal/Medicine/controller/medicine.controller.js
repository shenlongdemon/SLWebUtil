(function () {
    'use strict';

    angular
        .module('app')
        .controller('MedicineController', MedicineController);

    MedicineController.$inject = ['MedicineService', '$location', '$rootScope', 'Constants'];
    function MedicineController(MedicineService, $location, $rootScope, Constants) {
        var vm = this;
        vm.patients = [];
        vm.currentPatient = null;
        vm.histories = [];
        vm.details = [];
        vm.GetPatientById = GetPatientById;
        vm.CreatePatient = CreatePatient;
        $rootScope.GetPatientsById = GetPatientsById;
        function CreatePatient() {
            var a = 10;
        }
        function GetPatientById(patientid) {
            MedicineService.GetPatientById(patientid)
                .success(function (res) {
                    vm.currentPatient = res.Data;
                })
                .error(function () {

                });
        }
        function GetPatientsById(patientid) {
            MedicineService.GetPatientsById(patientid)
                .success(function (res) {
                    vm.patients = res.Data;
                })
                .error(function () {
                    
                });
        }

    }

})();
