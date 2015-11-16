(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReportMedicineController', ReportMedicineController);

    ReportMedicineController.$inject = ['MedicineService', '$location', '$rootScope', 'Constants'];
    function ReportMedicineController(MedicineService, $location, $rootScope, Constants) {
        var vm = this;
        vm.datetypes= [
                                  {id: '1', name: 'Theo ngày'},
                                  {id: '2', name: 'Theo tháng'}
                                ];
        vm.selecteddatetype = vm.datetypes[0];
        vm.reportbytimes = [];
        vm.GetTotalReportByTimes = GetTotalReportByTimes;
        vm.GetReportByTime = GetReportByTime;
        function GetReportByTime()
        {
            vm.loading = true;
            vm.reportbytimes = [];
            var dstr = $("#dpReport").val().split("-");
            var date = dstr[2] + "/" + (parseInt(dstr[1])) + "/" + dstr[0];
            var obj = { datetype: vm.selecteddatetype.id, datetime: date };

            MedicineService.GetReportByTime(obj)
                .success(function (res, status, headers, config, statusText) {
                    vm.reportbytimes = res.Data;
                    vm.loading = false;
                })
                .error(function (response) {
                    vm.loading = false;
                });
        }
        function GetTotalReportByTimes() {
            var total = 0;
            angular.forEach(vm.reportbytimes, function (value, key) {
                total += value.Total;
            });

            return total;
        }
        // end for report
    }

})();
