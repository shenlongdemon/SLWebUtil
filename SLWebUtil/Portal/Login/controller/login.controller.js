(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['LoginService', '$location', '$rootScope', '$routeParams', 'Constants'];
    function LoginController(LoginService, $location, $rootScope, $routeParams, Constants) {
        var vm = this;
        vm.loading = false;
        vm.loadingback = false;
        vm.Login = Login;

        vm.username = "";
        vm.password = "";
        function Login()
        {
            vm.loading = true;
            var passhash = CryptoJS.MD5(vm.password).toString();
            var info = {username :  vm.username,password:passhash };
            LoginService.Login(info)
                .success(function (res, status, headers, config, statusText) {
                    window.localStorage.setItem('user', JSON.stringify(res.Data));
                    vm.loading = false;
                    var returnUrl = $routeParams.return;
                    $location.search('return', null);
                    if (returnUrl == null || returnUrl == undefined || returnUrl == "") {
                        $location.path("/Dashboard");
                    }
                    else {
                        $location.path(returnUrl);
                    }
                })
                .error(function () {
                    vm.loading = false;
                });
        }
    }
})();
