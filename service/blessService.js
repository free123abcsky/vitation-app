/**
 * User: kfs
 * Date：2016/4/17
 * Desc：
 */

define(['require',  'app'],  function () {
    'use strict'
    serviceModule.service('blessService', ['$rootPath', '$http', function ($rootPath, $http) {
        var service = {
            getBlesslist: function (params ,success) {
                $http.post($rootPath  + "hq-wechat/partyuser/findbypartyinfobycondition",params).success(function (result) {
                    success(result);
                });
            },
            bless: function(params ,success){
                $http.post($rootPath  + "ws-web/unauth/pub/getimageurl",params).success(function (result) {
                    success(result);
                });
            }

        };
        return service;
    }]);
});
