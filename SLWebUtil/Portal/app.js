(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ui.router', 'ngAnimate'])
        .config(config)        
        .constant('Constants', 
            {
                API_BASE : "http://localhost:1111/",
                //API_BASE : "http://www.slwebutil.somee.com/"             
            }
        )
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$provide', '$compileProvider'];
     
    function config($routeProvider, $locationProvider, $httpProvider, $provide, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $routeProvider
            .when('/', {
                controller: 'DashboardController',
                templateUrl: 'Dashboard/view/home.view.html',
                controllerAs: 'vm'
            })
            .when('/Medicine', {
                controller: 'MedicineController',
                templateUrl: 'Medicine/view/home.view.html',
                controllerAs: 'vm'
            })
            .when('/Medicine/report', {
                controller: 'ReportMedicineController',
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
            .when('/Dashboard', {
                controller: 'DashboardController',
                templateUrl: 'Dashboard/view/home.view.html',
                controllerAs: 'vm'
            })
            .when('/UserAccount', {
                controller: 'UserAccountController',
                templateUrl: 'UserAccount/view/my-profile.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/Login' });


        $provide.factory('httpInterceptor', function ($q, $rootScope) {
            return {
                'request': function (config) {
                    // intercept and change config: e.g. change the URL
                    // config.url += '?nocache=' + (new Date()).getTime();
                    // broadcasting 'httpRequest' event
                    $rootScope.$broadcast('httpRequest', config);


                    if (config.url.indexOf('api/service/doaction')) {
                        var autho = "guest 00000000-0000-0000-0000-000000000000";
                        try {
                            var userstr = window.localStorage.getItem('user');
                            if (userstr != null && userstr != undefined) {
                                var user = jQuery.parseJSON(userstr);
                                if (user != null && user != undefined) {
                                    autho = user.username + " " + user.token;
                                }
                            }
                        }
                        catch (ex) { }
                        config.headers.Authorization = autho;
                    }
                    return config || $q.when(config);
                },
                'response': function (response) {
                    // we can intercept and change response here...
                    // broadcasting 'httpResponse' event
                    $rootScope.$broadcast('httpResponse', response);
                    if (response.status == 401)
                    {
                        window.location.replace('/Login');
                    }
                    return response || $q.when(response);
                },
                'requestError': function (rejection) {
                    // broadcasting 'httpRequestError' event
                    $rootScope.$broadcast('httpRequestError', rejection);
                    return $q.reject(rejection);
                },
                'responseError': function (rejection) {
                    // broadcasting 'httpResponseError' event
                    $rootScope.$broadcast('httpResponseError', rejection);
                    if (rejection.status == 401) {
                        window.location.replace('#/Login');
                    }
                    return $q.reject(rejection);
                }
            };
        });
        $httpProvider.interceptors.push('httpInterceptor');
    }


    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$injector'];
    var unrestrictedPages = ['/Login', '/'
                                , '/Facebook', '/Facebook/remove-member-group'
                                ];
    function run($rootScope, $location, $cookieStore, $http, $injector) {
        $rootScope.version = "1.0.0";
        $rootScope.isLogin = function () {
            var user = $rootScope.getUser();
            if (user != null && user != undefined) {
                return true;
            }
            else {
                return false;
            }
        };
        $rootScope.getUser = function () {
            var userstr = window.localStorage.getItem('user');
            var user = jQuery.parseJSON(userstr);
            return user;            
        }
        $rootScope.logout = function () {
            window.localStorage.removeItem('user');
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var user = $rootScope.getUser();
            var curentLoc = $location.path();
            var restrictedPage = $.inArray(curentLoc, unrestrictedPages) === -1;
            if (restrictedPage && user == null) {                
                $location.path('/Login').search('return=' + curentLoc);
            }
        });
    }

})();