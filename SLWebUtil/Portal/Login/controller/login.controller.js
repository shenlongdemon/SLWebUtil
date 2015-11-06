(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['LoginService', '$location', '$rootScope', 'Constants'];
    function LoginController(LoginService, $location, $rootScope, Constants) {
        var vm = this;
        vm.loading = false;
        vm.loadingback = false;
        vm.login = login;

        vm.username = "";
        vm.password = "";
        function login()
        {
            var info = {username :  vm.username,password:password };
            LoginService.Login(info)
                .success(function (res, status, headers, config, statusText) {
                    vm.loading = false;
                    if (status == 200)
                    {

                    }
                    
                })
                .error(function () {
                    vm.loading = false;
                });
        }
    }
})();
