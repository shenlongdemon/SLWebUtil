﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserAccountService', UserAccountService);
   
    UserAccountService.$inject = ['$http', 'Constants'];
    function UserAccountService($http, Constants) {
        var service = {};
        var API_BASE = Constants.API_BASE;
        var LOGIN_API = API_BASE + "api/service/doaction?service=authorization&act={act}&obj={obj}";
        service.ChangePassword = ChangePassword
        return service;        
        function ChangePassword(info) {
            var data = JSON.stringify(info);
            var api = LOGIN_API.replace("{act}", "ChangePassword").replace("{obj}", data);
            return $http.get(api);
        }

    }

})();
