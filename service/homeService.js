/**
 * User: kfs
 * Date：2016/4/17
 * Desc：
 */

define([ 'require',  'app'],  function () {
    'use strict'
    serviceModule.service('homeService', ['$rootPath', '$http', function ($rootPath, $http) {
        var service = {

            //获取分页照片信息
            getPhotolist: function (params ,success) {
                $http.post($rootPath  + "hq-web/picture/getpicturelist",params).success(function (result) {
                    success(result);
                });
            },

            //接受邀请
            accepVitation: function(params ,success){
                $http.post($rootPath  + "hq-web/partyuser/savepartyuserinfo",params).success(function (result) {
                    success(result);
                });
            },

            //宴会基本信息
            getPartyInfo: function(params ,success){
                $http.post($rootPath  + "hq-web/party/findpartyinfobypartyid",params).success(function (result) {
                    success(result);
                });
            }
        };
        return service;
    }]);
});
