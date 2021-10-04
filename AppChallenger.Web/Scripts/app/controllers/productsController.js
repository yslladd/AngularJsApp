(function () {
    'use strict';

    angular
        .module('app')
        .controller('productsController', ['$scope', 'productsService', function ($scope, productsService) {
            $scope.products = [];

            getData();

            function getData() {
                productsService.getProducts().then(function (result) {
                    $scope.products = result;                    
                });
            };

            $scope.removeProduct = function (id) {
                console.log('pre-delete', id);
                productsService.deleteProduct(id).then(function () {
                    toastr.success('Product has been deleted!');
                    getData();
                }, function () {
                    toastr.error('Error deleting product');
                });
            };

        }])
        .controller('productsControllerAdd', ['$scope', '$location', 'productsService', function ($scope, $location, productsService) {
            $scope.createProduct = function (product) {
                productsService.addProduct(product).then(function () {
                    toastr.success('Product created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error creating product');
                });
            };
        }])
        .controller('productsControllerEdit', ['$scope', '$routeParams', '$location', 'productsService', function ($scope, $routeParams, $location, productsService) {
            $scope.user = {};
            $scope.states = {
                showUpdateButton: false
            };

            productsService.getProductById($routeParams.id).then(function (result) {                
                $scope.product = result;
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Product not found with Id: ' + $routeParams.id);
            });

            $scope.editProduct = function (product) {
                productsService.updateProduct(product).then(function () {
                    toastr.success('Product updated successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error updating product');
                });
            };
        }]);


})();
