﻿(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ui.router', 'ngAnimate'])
        .config(config)        
        .constant('Constants', 
            {
                MEDICINE_API: "http://localhost:1111/api/service/doaction?service=medicine&act={act}&obj={obj}"
                
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
            .otherwise({ redirectTo: '/landingpage' });
    }


    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
    //    $rootScope.version = "1.0.13";

    //    $rootScope.logout = function (){
    //        $rootScope.globals = {};
    //        $cookieStore.remove('globals');
    //    };

    //    $rootScope.globals = $cookieStore.get('globals') || {};
    //    if ($rootScope.globals.currentUser) {
    //        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    //    }

    //    $rootScope.$on('$locationChangeStart', function (event, next, current) {
    //        var restrictedPage = $.inArray($location.path(), ['/login','/landingpage']) === -1;
    //        var loggedIn = $rootScope.globals.currentUser;
    //        if (restrictedPage && !loggedIn) {
    //            console.log("here");
    //            $location.path('/login');
    //        }
    //        if(loggedIn && $cookieStore.get('rememberMe') && $location.path().indexOf("/login") != -1){
    //            console.log("Should go to home page");
    //            $location.path('/');
    //        }
    //    });
    }

})();