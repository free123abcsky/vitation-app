/**
 * User: kfs
 * Date：2016/4/17
 * Desc：
 */

define(['angular', 'require',  'app'],  function () {
    'use strict'
    serviceModule.service('homeService', ['$rootPath', '$http', function ($rootPath, $http) {
        var service = {
            getPhotolist: function (params ,success) {
                $http.post($rootPath  + "ws-web/unauth/pub/getimageurl",params).success(function (result) {
                    success(result);
                });
            },
            accepVitation: function(params ,success){
                $http.post($rootPath  + "ws-web/unauth/pub/getimageurl",params).success(function (result) {
                    success(result);
                });
            }
        };
        return service;
    }]);
});
