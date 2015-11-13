(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserAccountController', UserAccountController);
    UserAccountController.$inject = ['UserAccountService', '$location', '$rootScope', 'Constants'];
    function UserAccountController(UserAccountService, $location, $rootScope, Constants) {
        var vm = this;
        vm.loading = false;
        vm.loadingback = false;        
    }
})();
