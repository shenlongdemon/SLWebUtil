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
        vm.PatientHistories = [];
        vm.MedicineHistories = [];
        vm.GetPatientById = GetPatientById;
        vm.GetPatientHistoriesByPatientId = GetPatientHistoriesByPatientId;
        vm.CreatePatient = CreatePatient;
        vm.GetAge = GetAge;
        $rootScope.GetPatientsById = GetPatientsById;
        vm.isPatientsLoading = false;
        vm.age = null;
        function CreatePatient() {
            var a = 10;
        }
        function GetPatientHistoriesByPatientId(patientid)
        {
            MedicineService.GetPatientHistoriesByPatientId(patientid)
                .success(function (res) {
                    vm.PatientHistories = res.Data;
                })
                .error(function () {

                });
        }
        function GetPatientById(patientid) {
            MedicineService.GetPatientById(patientid)
                .success(function (res) {
                    vm.currentPatient = res.Data;
                    GetAge();
                    GetPatientHistoriesByPatientId(patientid);
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
        function CreatePatient()
        {
            if (vm.currentPatient.Id == 0 || vm.currentPatient.Id == undefined || vm.currentPatient.Id == "") {
                vm.currentPatient.Id = 0;
                var now = new Date();
                var y = now.getFullYear() - vm.age;
                vm.currentPatient.Birth = new Date(y, 6, 15);
                
                MedicineService.CreatePatient(vm.currentPatient)
                    .success(function (res) {
                        vm.currentPatient = res.Data;
                    })
                    .error(function () {

                    });
            }
            else{
                alert("Bạn phái xoá dữ liệu trước khi tạo mới !!!")
                vm.currentPatient = null;
                alert("Mời bạn nhập lại !!!")
            }

        }
        function GetAge() {
            if (vm.currentPatient != null && vm.currentPatient.Birth != undefined) {
                var date = new Date(vm.currentPatient.Birth);
                var ageDifMs = Date.now() - date.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                vm.age = Math.abs(ageDate.getUTCFullYear() - 1970);
                return vm.age;
            }
            else return "";

        }
        function GetMedicineHistoriesByPatientId(patientId, date)
        {
            var obj ={
                PatientId : patientId,
                Date : date
            };
            MedicineService.GetMedicineHistoriesByPatientId(vm.currentPatient)
                   .success(function (res) {
                       vm.MedicineHistories = res.Data;
                   })
                   .error(function () {

                   });
        }
    }

})();
