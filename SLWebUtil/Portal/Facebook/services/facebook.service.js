(function () {
    'use strict';

    angular
        .module('app')
        .factory('FacebookService', FacebookService);
   
    FacebookService.$inject = ['$http','Constants'];
    function FacebookService($http, Constants) {
        var service = {};
        
        return service;

        

    }

})();
