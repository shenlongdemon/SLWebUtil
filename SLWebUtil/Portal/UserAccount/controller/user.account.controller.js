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
        vm.password = "";
        vm.newpassword = "";
        vm.confirmpassword = "";
        vm.ChangePassword = ChangePassword;
        function ChangePassword()
        {
            
            if (vm.newpassword == vm.confirmpassword) {
                vm.loading = true;
                var user = $rootScope.getUser();
                var obj = { username: user.username, password: CryptoJS.MD5(vm.password).toString(), newpassword: CryptoJS.MD5(vm.newpassword).toString() };
                UserAccountService.ChangePassword(obj)
                    .success(function (res, status, headers, config, statusText) {       
                        vm.loading = false;
                        if (res.Data == 1) {
                            $("body").mobiDialog({
                                type: "alert",
                                text: "Changed password successfully !!!",
                                position: "middle",
                                cancel: function () { console.log("You clicked Cancel"); }
                            });
                        }
                        else if (res.Data == 2) {
                            $("body").mobiDialog({
                                type: "alert",
                                text: "Old password is incorrect !!!",
                                position: "middle",
                                cancel: function () { console.log("You clicked Cancel"); }
                            });
                        }
                        vm.password = "";
                        vm.newpassword = "";
                        vm.confirmpassword = "";
                    })
                    .error(function () {
                        vm.loading = false;
                        $("body").mobiDialog({
                            type: "alert",
                            text: "Server is error !!!",
                            position: "middle",
                            cancel: function () { console.log("You clicked Cancel"); }
                        });
                    });
            }
            else {
                $("body").mobiDialog({
                    type: "alert",
                    text: "2 new passwords are same !!!",
                    position: "middle",
                    cancel: function () { console.log("You clicked Cancel"); }
                });
            }
        }
    }
})();
