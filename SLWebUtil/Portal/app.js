(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ui.router', 'ngAnimate'])
        .config(config)        
        .constant('Constants', 
            {
                API_BASE : "http://localhost:1111/",
                //MEDICINE_API: "http://192.168.1.108:1111/api/service/doaction?service=medicine&act={act}&obj={obj}"
                MEDICINE_API: "http://localhost:1111/api/service/doaction?service=medicine&act={act}&obj={obj}"
                //MEDICINE_API: "http://www.slwebutil.somee.com/api/service/doaction?service=medicine&act={act}&obj={obj}"                
            }
        )
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];
     
    function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $routeProvider            
            .when('/Medicine', {
                controller: 'MedicineController',
                templateUrl: 'Medicine/view/home.view.html',
                controllerAs: 'vm'
            })
            .when('/Medicine/report', {
                controller: 'MedicineController',
                templateUrl: 'Medicine/view/report.view.html',
                controllerAs: 'vm'
            })
            .when('/Facebook', {
                controller: 'FacebookController',
                templateUrl: 'Facebook/view/home.view.html',
                controllerAs: 'vm'
            })
            .when('/Facebook/remove-member-group', {
                controller: 'RemoveMemberGroupFacebookController',
                templateUrl: 'Facebook/view/remove-member-group.view.html',
                controllerAs: 'vm'
            })
            .when('/Login', {
                controller: 'LoginController',
                templateUrl: 'login/view/login.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/Login' });
    }


    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$injector'];
    function run($rootScope, $location, $cookieStore, $http,$injector) {    
        $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {      

            headersGetter()['Authorization'] = "guest guest123@";
            if (data) { 
                return angular.toJson(data); 
            } 
        };   
    }

})();