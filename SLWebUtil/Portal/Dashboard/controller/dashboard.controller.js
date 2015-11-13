(function () {
    'use strict';
    angular
        .module('app')
        .controller('DashboardController', DashboardController);
    DashboardController.$inject = ['DashboardService', '$location', '$rootScope', 'Constants'];
    function DashboardController(DashboardService, $location, $rootScope, Constants) {
        var vm = this;
        vm.loading = false;
        vm.loadingback = false;        
    }
})();
