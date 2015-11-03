(function () {
    'use strict';

    angular
        .module('app')
        .controller('FacebookController', FacebookController);

    FacebookController.$inject = ['FacebookService', '$location', '$rootScope', 'Constants'];
    function FacebookController(FacebookService, $location, $rootScope, Constants) {
        var vm = this;
       
        vm.loading = false;
        
    }

})();
