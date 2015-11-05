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
        vm.MedicineNames = [];
        vm.GetPatientById = GetPatientById;
        vm.GetPatientHistoriesByPatientId = GetPatientHistoriesByPatientId;
        vm.GetMedicineHistoriesByPatientId = GetMedicineHistoriesByPatientId;
        vm.CreatePatient = CreatePatient;
        vm.GetAge = GetAge;
        vm.GetTotal = GetTotal;
        vm.EditMedicineHistory = EditMedicineHistory;
        vm.DeleteMedicineHistory = DeleteMedicineHistory
        vm.DeletePatient = DeletePatient;
        vm.GetMedicineNames = GetMedicineNames;
        vm.ClearForSearch = ClearForSearch;
        vm.loading = false;
        vm.loadingback = false;
        vm.age = null;

        $rootScope.GetPatientsById = GetPatientsById;
        $rootScope.GetPatientsByName = GetPatientsByName;
        $rootScope.GetPatientsByPhone = GetPatientsByPhone;
        $rootScope.GetMedicineHistoriesByPatientId = GetMedicineHistoriesByPatientId;
        $rootScope.CheckUpdateCurrentMedicine = CheckUpdateCurrentMedicine;
        $rootScope.SetCurrentMedicineName = SetCurrentMedicineName;
        initController();
        function initController()
        {            
            GetMedicineNames();            
        }
        
        function GetMedicineNames()
        {
            vm.loadingback = true;
            MedicineService.GetMedicineNames()
                .success(function (res) {
                    vm.MedicineNames = res.Data;
                    $("#txtMedicineName").autocomplete({
                        source: vm.MedicineNames
                    });
                    vm.loadingback = false;
                })
                .error(function () {
                    vm.loadingback = false;
                });
        }
        
        function SetCurrentMedicineName(name)
        {
            vm.currentMedicine.MedicineName = name;
        }
        function ClearList()
        {
            vm.PatientHistories = [];
            vm.MedicineHistories = [];
            vm.patients = [];
        }
        function ClearForSearch(name, value)
        {
            vm.currentPatient = {};
            vm.PatientHistories = [];
            vm.MedicineHistories = [];
            if (name == "Id") {
                vm.currentPatient.Id = value;
            }
            else if (name == "Name") {
                vm.currentPatient.Name = value;
            }
            else if (name == "Phone") {
                vm.currentPatient.Phone = value;
            }
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
                    GetMedicineNames();
                })
                .error(function () {
                    vm.loading = false;
                });
        }
        function GetPatientsById(patientid) {
            vm.loading = true;
            ClearForSearch("Id", patientid);
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
            ClearForSearch("Name", patientName);
            MedicineService.GetPatientsByName(patientName)
                .success(function (res) {
                    vm.patients = res.Data;
                    vm.loading = false;;
                })
                .error(function () {
                    vm.loading = false;
                });
        }
        function GetPatientsByPhone(phone) {
            vm.loading = true;
            ClearForSearch("Phone", phone);
            MedicineService.GetPatientsByPhone(phone)
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
            ClearList();
            if (vm.currentPatient.Id == 0 || vm.currentPatient.Id == undefined || vm.currentPatient.Id == "") {
                vm.loading = true;
                vm.currentPatient.Id = 0;
                var now = new Date();
                var y = now.getFullYear() - vm.age;
                vm.currentPatient.Birth = new Date(y, 6, 15);
                
                MedicineService.CreatePatient(vm.currentPatient)
                    .success(function (res) {
                        vm.currentPatient = res.Data;
                        
                        GetMedicineNames();
                        vm.loading = false;
                        
                    })
                    .error(function () {
                        vm.loading = true;
                    });
            }
            else {
               
                $("body").mobiDialog({
                    type: "alert",
                    text: "Bạn phải xoá dữ liệu trước khi tạo mới !!!",
                    position: "middle",
                    cancel: function () { console.log("You clicked Cancel"); }
                });                
                vm.currentPatient = null;
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
                       GetMedicineNames();
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
        function DeletePatient(id)
        {          
            var pt = vm.patients.filter(function (a) { return a.Id == id })[0];
            if (pt != null && pt != undefined) {
                $("body").mobiDialog({
                    type: "confirm",
                    text: "Bạn có muốn xoá " + pt.Name + " không ???",
                    position: "middle",
                    okText: "Có",
                    cancelText: "Không",
                    ok: function () {
                        vm.loading = true;
                        MedicineService.DeletePatient(id)
                        .success(function (res) {
                            if (res.Data == id) {
                                vm.patients = jQuery.grep(vm.patients, function (value) {
                                    return value.Id != id;
                                });
                                vm.MedicineHistories = jQuery.grep(vm.MedicineHistories, function (value) {
                                    return value.PatientId != id;
                                });
                                vm.PatientHistories = jQuery.grep(vm.PatientHistories, function (value) {
                                    return value.PatientId != id;
                                });
                                if (vm.currentPatient.Id == id) {
                                    vm.currentPatient = {};
                                }
                            }
                            vm.loading = false;
                        })
                        .error(function () {
                            vm.loading = false;
                        });
                    },
                    cancel: function () {  }
                });              

            }
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
        function DeleteMedicineHistory(id)
        {
            var mh = vm.MedicineHistories.filter(function (a) { return a.Id == id })[0];
            if (mh != null && mh != undefined) {

                $("body").mobiDialog({
                    type: "confirm",
                    text: "Bạn có muốn xoá " + mh.MedicineName + " không ???",
                    position: "middle",
                    okText: "Có",
                    cancelText: "Không",
                    ok: function () {
                        vm.loading = true;
                        MedicineService.DeleteMedicineHistory(id)
                        .success(function (res) {
                            if (res.Data == id) {
                                vm.MedicineHistories = jQuery.grep(vm.MedicineHistories, function (value) {
                                    return value.Id != id;
                                });
                            }
                            vm.loading = false;
                        })
                        .error(function () {
                            vm.loading = false;
                        });
                    },
                    cancel: function () { }
                });                
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
                       GetMedicineNames();
                   })
                   .error(function () {
                       vm.loading = false;
                   });
        }
    }

})();
