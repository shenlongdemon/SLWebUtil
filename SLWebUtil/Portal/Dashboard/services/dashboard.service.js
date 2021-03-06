﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('DashboardService', DashboardService);
   
    DashboardService.$inject = ['$http', 'Constants'];
    function DashboardService($http, Constants) {
        var service = {};
        var API_BASE = Constants.API_BASE;
        var LOGIN_API = API_BASE + "api/service/doaction?service=authorization&act={act}&obj={obj}";
        service.Login = Login
        return service;        
        function Login(logininfo) {
            var data = JSON.stringify(logininfo);
            var api = LOGIN_API.replace("{act}", "Login").replace("{obj}", data);
            return $http.get(api);
        }

    }

})();
