/**
 * User: kfs
 * Date：2016/4/17
 * Desc：系统文件配置
 */

(function(){
    'use strict';
    var app = {};

    requirejs.config({
        baseUrl: '',
        paths: {
            //angular: 'assets/js/libs/angular/angular',
           // 'angular-route': 'assets/js/libs/angular/angular-route',
            swiper: 'assets/js/libs/swiper/swiper',
            app : 'assets/js/app',
            'cmn-directive' : 'directive/cmnDirective',
            homeService: 'service/homeService',
            guestService: 'service/guestService',
            blessService: 'service/blessService',

            homeCtrl: 'controller/homeCtrl',
            guestCtrl: 'controller/guestCtrl',
            blessCtrl: 'controller/blessCtrl',
        },
        shim: {
            //angular: {
            //    exports: 'angular'
            //},
            //'angular-route': {
            //    deps: ['angular'],
            //    exports: 'ngRouteModule'
            //},
            'swiper':{exports:'swiper'}
        },
        urlArgs: "v=" + (new Date()).getTime()
    });


    require([ 'app' , 'swiper'] , function(app){
        app.init({
            '/home' : { ctrl : 'homeCtrl' , path : 'homeCtrl' , view : 'template/home.html'},
            '/guest' : { ctrl : 'guestCtrl' , path : 'guestCtrl' , view : 'template/guestList.html'},
            '/bless' : { ctrl : 'blessCtrl' , path : 'blessCtrl' , view : 'template/blessList.html'},
        });
    });
    //fs.config = {
    //    music : {
    //        autoPlay :true,
    //        pstClass :'music-right-bottom'
    //    },
    //    menu : {
    //        item : [
    //            {text: '请柬' , callback : function(){ }},
    //            {text: '地图' , callback : function(){ }},
    //            {text: '来宾' , callback : function(){ }},
    //            {text: '祝福' , callback : function(){ }},
    //        ]
    //    }
    //
    //}

    //window.fs = fs;
})();