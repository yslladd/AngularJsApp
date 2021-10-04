(function () {
    'use strict';

    angular
        .module('app')
        .factory('productsService', ['$http', '$q', function ($http, $q) {
            var urlBase = 'https://localhost:44355/api/products';
            var service = {};

            //get all products
            service.getProducts = function () {
                var deferred = $q.defer();
                $http.get(urlBase).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.getProductById = function (id) {
                var deferred = $q.defer();
                $http.get(urlBase + '/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addProduct = function (newProduct) {
                var deferred = $q.defer();
                $http.post(urlBase, newProduct).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.updateProduct = function (product) {                
                var deferred = $q.defer();
                $http.put(urlBase, product).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteProduct = function (id) {
                console.log('id_>', id);
                var deferred = $q.defer();
                $http.delete(urlBase + '/' + id).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();