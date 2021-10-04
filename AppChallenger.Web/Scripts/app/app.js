(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute'
        ]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/', {
                    controller: 'productsController',
                    templateUrl: '/Scripts/app/templates/products.html'
                })
                .when('/addProduct', {
                    controller: 'productsControllerAdd',
                    templateUrl: '/Scripts/app/templates/addProduct.html'
                })
                .when('/editProduct/:id', {
                    controller: 'productsControllerEdit',
                    templateUrl: '/Scripts/app/templates/editProduct.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();