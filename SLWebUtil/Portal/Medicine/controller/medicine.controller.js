(function () {
    'use strict';

    angular
        .module('app')
        .controller('MedicineController', MedicineController);

    MedicineController.$inject = ['MedicineService', '$location', '$rootScope', 'Constants'];
    function MedicineController(MedicineService, $location, $rootScope, Constants) {
        var vm = this;
        vm.currentMedicine = null;
        vm.patients = [];
        vm.currentPatient = null;
        vm.PatientHistories = [];
        vm.MedicineHistories = [];
        vm.GetPatientById = GetPatientById;
        vm.GetPatientHistoriesByPatientId = GetPatientHistoriesByPatientId;
        vm.GetMedicineHistoriesByPatientId = GetMedicineHistoriesByPatientId;
        vm.CreatePatient = CreatePatient;
        vm.GetAge = GetAge;
        vm.GetTotal = GetTotal;
        vm.EditMedicineHistory = EditMedicineHistory;
        $rootScope.GetPatientsById = GetPatientsById;
        $rootScope.GetPatientsByName = GetPatientsByName;
        $rootScope.GetMedicineHistoriesByPatientId = GetMedicineHistoriesByPatientId;
        $rootScope.CheckUpdateCurrentMedicine = CheckUpdateCurrentMedicine;
        
        
        vm.loading = false;
        vm.age = null;
        function CreatePatient() {
            var a = 10;
        }
        function GetPatientHistoriesByPatientId(patientid)
        {
            MedicineService.GetPatientHistoriesByPatientId(patientid)
                .success(function (res) {
                    vm.PatientHistories = res.Data;
                    vm.loading = false;
                })
                .error(function () {
                    vm.loading = false;
                });
        }
        function GetPatientById(patientid) {
            vm.loading = true;
            MedicineService.GetPatientById(patientid)
                .success(function (res) {
                    vm.currentPatient = res.Data;
                    GetAge();
                    GetPatientHistoriesByPatientId(patientid);
                })
                .error(function () {
                    vm.loading = false;
                });
        }
        function GetPatientsById(patientid) {
            vm.loading = true;
            MedicineService.GetPatientsById(patientid)
                .success(function (res) {
                    vm.patients = res.Data;
                    vm.loading = false;;
                })
                .error(function () {
                    vm.loading = false;
                });
        }
        function GetPatientsByName(patientName) {
            vm.loading = true;
            MedicineService.GetPatientsByName(patientName)
                .success(function (res) {
                    vm.patients = res.Data;
                    vm.loading = false;;
                })
                .error(function () {
                    vm.loading = false;
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
            vm.loading = true;
            var obj = {
                PatientId : patientId,
                Date : date
            };
            var dt = new Date(Date.parse(date));
            var d = dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
            $("#datepicker").val(d);
            MedicineService.GetMedicineHistoriesByPatientId(obj)
                   .success(function (res) {
                       vm.MedicineHistories = res.Data;
                       vm.loading = false;
                   })
                   .error(function () {
                       vm.loading = false;
                   });
        }
        function GetTotal()
        {
            var total = 0;
            angular.forEach(vm.MedicineHistories, function (value, key) {
                total += value.Count * value.Price;
            });
            
            return total;
        }
        function EditMedicineHistory(medicineHistoryId)
        {
            var mhs = $.grep(vm.MedicineHistories, function (e) { return e.Id == medicineHistoryId; });
            if(mhs.length > 0)
            {
                vm.currentMedicine = mhs[0];
                MoveEditMedicineHistoryControl(medicineHistoryId);
                $("#txtMedicineName").focus();
                $("#txtMedicineName").select();
            }
            
            
            
        }
        function MoveEditMedicineHistoryControl(medicineHistoryId)
        {
            var trMedicineHistory = $("#trMedicineHistory_" + medicineHistoryId);
            if (trMedicineHistory != undefined && trMedicineHistory != null)
            {
                var trEdit = $("#trEditMedicineHistory");
                
                trMedicineHistory.after(trEdit);
                trMedicineHistory.remove();
            }
        }
        
        function CheckUpdateCurrentMedicine()
        {
            vm.loading = true;
            var idUpdate = true;
            if (vm.currentPatient == null
                || vm.currentPatient.Id == undefined
                || vm.currentPatient.Id == ""
                || vm.currentPatient.Id == "0") return;
            if (vm.currentMedicine.MedicineName == "") return;
            if (vm.currentMedicine.Unit == "") return;
            if (vm.currentMedicine.Count == "") return;
            if (vm.currentMedicine.Price == "") return;
            if (vm.currentMedicine.Id == undefined
                || vm.currentMedicine.Id == ""
                || vm.currentMedicine.Id == "0")
            {
                vm.currentMedicine.Id = 0;
                vm.currentMedicine.PatientId = vm.currentPatient.Id;
                idUpdate = false;
            }
            var dstr = $("#datepicker").val().split("-");
            var date = dstr[2] + "-" + (parseInt(dstr[1])) + "-" + dstr[0];
            vm.currentMedicine.Date = date;
            var data = {
                Id : vm.currentMedicine.Id,
                PatientId : vm.currentMedicine.PatientId,
                MedicineName : vm.currentMedicine.MedicineName,
                Unit : vm.currentMedicine.Unit,
                Count : vm.currentMedicine.Count,
                Price : vm.currentMedicine.Price,
                Date : vm.currentMedicine.Date
            };
            MedicineService.UpdatePatientHistory(data)
                   .success(function (res) {
                       vm.currentMedicine = res.Data;
                       
                       vm.MedicineHistories = jQuery.grep(vm.MedicineHistories, function (value) {
                           return value.Id != vm.currentMedicine.Id;
                       });
                       vm.MedicineHistories.push(vm.currentMedicine);
                       vm.currentMedicine = null;                       
                       vm.loading = false;
                   })
                   .error(function () {
                       vm.loading = false;
                   });
        }
    }

})();
