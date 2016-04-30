/**
 * User: kfs
 * Date：2016/4/17
 * Desc：
 */

define([ 'require',  'app'],  function () {
    'use strict'
    serviceModule.service('guestService', ['$rootPath', '$http', function ($rootPath, $http) {
        var service = {
            getGuestlist: function (params ,success) {
                $http.post($rootPath  + "hq-wechat/partyuser/findbypartyinfobycondition",params).success(function (result) {
                    success(result);
                });
            }
        };
        return service;
    }]);
});
