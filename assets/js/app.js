/**
 * User: kfs
 * Date：2016/4/17
 * Desc：系统文件配置
 */

define([ 'require'], function (require) {

    'use strict';
    var initApp = function(routeMap){

        var app =  angular.module('webapp', [
                'ngRoute',
                'myApp.controller',
                'myApp.service',
                'myApp.directive',
                'myApp.filter'
        ])

        app.config(function($routeProvider, $locationProvider , $controllerProvider , $httpProvider) {
                var syncLoad = function(path , ctrl){
                    return function($route, $q, $timeout){
                        try{
                            var deferred = $q.defer();
                            require([path] , function(retCtrl){
                                $controllerProvider.register(ctrl , retCtrl);
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }catch(error){
                            alert(error);
                        };
                    };
                }

                for(var key in routeMap){
                    $routeProvider.when(key , {
                        templateUrl: routeMap[key].view + '?v=' + (new Date()).getTime(),
                        controller: routeMap[key].ctrl,
                        resolve : { keyName: syncLoad(routeMap[key].path , routeMap[key].ctrl)}
                    })
                }

                $routeProvider.otherwise({redirectTo: '/home'});

                $httpProvider.defaults.transformRequest=function(data){
                    if(data ===undefined) {
                        return data;
                    }
                    return $.param(data);
                }
                $httpProvider.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded;charset=utf-8';
                $httpProvider.defaults.headers.post['Accept'] ='application/json, text/javascript, */*; q=0.01';

                // configure html5
                // $locationProvider.html5Mode(true);
            })

        app.run(['$rootScope', '$window', '$location', '$log', function ($rootScope, $window, $location, $log) {
            //var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
            //var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

            var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
            var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

            //function locationChangeStart(event) {
            //    $log.log('locationChangeStart');
            //    $log.log(arguments);
            //}
            //
            //function locationChangeSuccess(event) {
            //    $log.log('locationChangeSuccess');
            //    $log.log(arguments);
            //}

            function routeChangeStart(event) {
                $log.log('routeChangeStart');
                $log.log(arguments);
            }

            function routeChangeSuccess(event) {
                $log.log('routeChangeSuccess');
                $log.log(arguments);
                var loader = document.getElementById('app-loading');
                if(loader){document.body.removeChild(loader);};
            }
        }]);
        var controllerModule = angular.module('myApp.controller', []);

        var serviceModule = angular.module('myApp.service', []);
        serviceModule.constant('basePath', 'http://192.168.1.129:8080/dcim-server/api/admin');
        serviceModule.constant('$rootPath', 'http://daiqisoft.tunnel.phpor.me/');
        var directiveModule = angular.module('myApp.directive', []);
        var filterModule = angular.module('myApp.filter', []);

        window.controllerModule = controllerModule;
        window.serviceModule = serviceModule;
        window.directiveModule = directiveModule;
        window.filterModule = filterModule;

        require(['cmn-directive' , 'homeService' , 'guestService' , 'blessService'], function () {
            angular.bootstrap(document, ['webapp']);
        });


    };

    return {
        init : initApp
    }
});
