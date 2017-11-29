var app = angular.module('admin', []);
app.controller("account", function ($scope, $http, $rootScope, $window) {
    $scope.SignUp = function () {
        var data = {
            username: $scope.username,
            password: $scope.password,
            phone: $scope.phone
        }
        console.log(data)
        $http({
            method: "POST",
            url: "/admin/sign_up",
            data: data
        }).success(function (data) {

            console.log("signup successful");
            console.log(data);
            $window.location.href = '/login';
        }).error(function (err) {
            alert("Unable to connect to the server.");
        });
    }
    $scope.Login = function () {
        var data = {
            username: $scope.username,
            password: $scope.password,
        }
        console.log('asad: ', data);
        console.log(data);
        $http({
            method: "POST",
            url: "/admin/login",
            data: data
        }).success(function (data) {

            console.log('response: ', data);
            // $window.location.href = '/';
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr.");
        });
    }

})

app.controller("home", function ($scope, $http, $rootScope, $window) {
    $scope.nghia = function () {
        alert('nghia')
    }
})

app.controller("manage_categories", function ($scope, $http, $rootScope, $window) {

    init();

    function init() {
        $http({
            method: "GET",
            url: "/admin/getAllCategories"
        }).success(function (data) {
            $scope.listCate = data
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---/admin/getAllCategories");
        });

    }

    $scope.createCategory = function () {
        if ($scope.nameCategory !== '') {
            var data = {
                name: $scope.nameCategory
            }
            $http({
                method: "POST",
                url: "/admin/createCategory",
                data: data
            }).success(function (data) {
                $scope.listCate = data
            }).error(function (err) {
                alert("Unable to connect to the serverrrrr---/admin/createCategory");
            });

            init();
        }
    }

    $scope.delete = function (id) {
        alert(id + "dangerous, you don 't access")
        // $http({
        //     method: "DELETE",
        //     url: "/admin/deleteCategory/" + id
        // }).success(function (data) {
        //     $scope.listCate = data
        //     console.log('response: ', data);
        // }).error(function (err) {
        //     alert("Unable to connect to the serverrrrr---deleteCategories");
        // });
    }

    $scope.edit = function (id, nameCategory) {

        // $window.location.href = '/admin/categories/' + nameCategory+'/' + id;
    }
})

app.controller("manage_SubCategories", function ($scope, $http, $rootScope, $window) {

    init();

    function init() {
        $http({
            method: "GET",
            url: "/admin/getAllSubCategories"
        }).success(function (data) {
            $scope.listCate = data
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---/admin/getAllSubCategories");
        });

    }

    $scope.createSubCategory = function () {
        alert($scope.nameSubCategory)
        if ($scope.nameSubCategory !== '') {
            var data = {
                category_idCategory: $scope.idCate,
                name: $scope.nameSubCategory
            }
            $http({
                method: "POST",
                url: "/admin/createSubCategory",
                data: data
            }).success(function (data) {
                $scope.listCate = data
            }).error(function (err) {
                alert("Unable to connect to the serverrrrr---/admin/createSubCategory");
            });

            init();
        }
    }

    $scope.delete = function (id) {
        alert(id + "dangerous, you don 't access")
        $http({
            method: "DELETE",
            url: "/admin/deleteSubCategory/" + id
        }).success(function (data) {
            $scope.listCate = data
            console.log('response: ', data);
            init();
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---deleteSubCategory");
        });
    }

    $scope.edit = function (id) {

        // $window.location.href = '/admin/categories/' + id;
    }
})

app.controller("manage_Product", function ($scope, $http, $rootScope, $window) {

    init();

    function init() {
        $http({
            method: "GET",
            url: "/admin/getAllProduct"
        }).success(function (data) {
            $scope.listProduct = data
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---/admin/getAllSubCategories");
        });

    }

    $scope.createProduct = function () {
        // alert($scope.nameSubCategory)
        if ($scope.name !== '') {
            var data = {
                name: $scope.name,
                code: $scope.code,
                description: $scope.description,
                accessories: $scope.accessories,
                sub_Category_idSub_Category: $scope.sub_Category_idSub_Category,
                product_assuarance_policy: $scope.product_assuarance_policy,
                month_assuarance: $scope.month_assuarance,
                brand_idbrand: $scope.brand_idbrand
            }
            $http({
                method: "POST",
                url: "/admin/createProduct",
                data: data
            }).success(function (data) {
                $scope.listCate = data
            }).error(function (err) {
                alert("Unable to connect to the serverrrrr---/admin/createSubCategory");
            });

            init();
        }
    }

    $scope.delete = function (id) {
        alert(id + "dangerous, you don 't access")
        $http({
            method: "DELETE",
            url: "/admin/deleteProduct/" + id
        }).success(function (data) {
            $scope.listCate = data
            console.log('response: ', data);
            init();
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---deleteSubCategory");
        });
    }

    $scope.Direction = function (id) {

        $window.location.href = '/admin/product_create';
    }
})


// app.controller("manage_subcategories", function ($scope, $http, $window) {
//     console.log($window.location.href)
//     var x = $window.location.href;
//     var y = $window.location.href.split('/')
//     id = y[y.length - 1]
//     $http({
//         method: "GET",
//         url: "/admin/getSubCategoryByIdCate/" + id
//     }).success(function (data) {
//         $scope.listSubCate = data
//         console.log('response: ', data);

//     }).error(function (err) {
//         alert("Unable to connect to the serverrrrr---getSubCategoryByIdCate");
//     });


// })