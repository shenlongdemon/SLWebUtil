(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ui.router', 'ngAnimate'])
        .config(config)        
        .constant('Constants', 
            {
                //MEDICINE_API: "http://192.168.1.108:1111/api/service/doaction?service=medicine&act={act}&obj={obj}"
                MEDICINE_API: "http://localhost:1111/api/service/doaction?service=medicine&act={act}&obj={obj}"
                //MEDICINE_API: "http://www.slwebutil.somee.com/api/service/doaction?service=medicine&act={act}&obj={obj}"                
            }
        )
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
     
    function config($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $routeProvider            
            .when('/Medicine', {
                controller: 'MedicineController',
                templateUrl: 'Medicine/view/home.view.html',
                controllerAs: 'vm'
            })
            .when('/Facebook', {
                controller: 'FacebookController',
                templateUrl: 'Facebook/view/home.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/landingpage' });
    }


    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$injector'];
    function run($rootScope, $location, $cookieStore, $http,$injector) {    
        
    }

})();