(function () {
    'use strict';

    angular
        .module('app')
        .controller('MedicineController', MedicineController);

    MedicineController.$inject = ['MedicineService', '$location', '$rootScope', 'Constants'];
    function MedicineController(MedicineService, $location, $rootScope, Constants) {
       var vm = this;

        
        initController();

        function initController() {
            loadAllCountry();
        }

        function loadAllCountry() {
           
        }
       
    }

})();
