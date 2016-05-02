/**
 * User: kfs
 * Date：2016/4/22
 * Desc：
 */

define(function () {

    return function($rootScope , $scope ,$http , $routeParams , homeService){

        //获取宴会信息
        $scope.getPartyInfo = function(){
            var params = {
                "partyId":"20160411212022022001",   //宴会编号
            }
            homeService.getPartyInfo(params , function(data){
                $scope.partyInfo = data.partyInfo;
                $rootScope.config = {
                    musicUrl : data.partyInfo.fullMusicUrl
                };;
            });

            //假数据需要删除
            $scope.partyInfo = {
                "id" : "20160411212022022001",
                "holdAddress" : "湖南虎门",
                "partyDescribe" : "婚宴",
                "holdDate" : 1462454533000,
                "holdHotel" : "京珠大酒店",
                "paryTypeStr" : "婚宴",
                "holdDateStr" : "2016-05-05 21:22:13",
                "fullMusicUrl" : null,
                "createNameList" : [ "张舒", "戴齐" ],
                "new" : false
            };
            //保留一份给全局
            $rootScope.config ={
                musicUrl : $scope.partyInfo.fullMusicUrl
            };

        }
        //查询图片列表
        $scope.getPhotolist = function(){
            var params = {

                "partyId":"20160411212022022001",   //宴会编号
                "type":"1",
                "locationNumber":"1",
                "specialType":"0",
                "pageInfo":{
                    "pageNumber":1,
                    "pageSize":10
                }
            }

            //homeService.getPhotolist(params , function(data){
            //    if(data.content){
            //        $scope.photoUrllist = data.content[0].urlList;
            //    }
            //});

            //假数据需要删除
            $scope.photoUrllist = [
                'assets/images/081517061659.jpg',
                'assets/images/081517061433.jpg',
                'assets/images/081517062432.jpg'
            ];

        }

        $scope.getPartyInfo();
        $scope.getPhotolist();

        $('#acceptVitation').bind('click' , function(){
            $.get( 'template/common/vitation.html' , function(html){
                var pagei = layer.open({
                    type: 1,
                    content: html,
                    anim: 0,
                    style: 'position:fixed; left:0; top:0; width:100%; height:50%; border:none;background-color:#e74f54;'
                });

                $('.submit-btn').bind('click' , function(){
                    var  name = $('#name').val();
                    var  count = $('#count').val();
                    var  palyerHolderRelation = $('#palyerHolderRelation').val();
                    if(!name){
                        layer.open({
                            content: '姓名不能为空!',
                            style: 'background-color:#09C1FF; color:#fff; border:none;',
                            time: 1
                        });
                        return;
                    }else if(!count){
                        layer.open({
                            content: '参加人数不能为空!',
                            style: 'background-color:#09C1FF; color:#fff; border:none;',
                            time: 1
                        });
                    }else if(!palyerHolderRelation){
                        layer.open({
                            content: '亲友类别不能为空!',
                            style: 'background-color:#09C1FF; color:#fff; border:none;',
                            time: 1
                        });
                        return;
                    };

                    var params = {
                        "playerName":name,
                        "playerNumber":count,
                        "playerType":"0",
                        "playerHolderRelation":palyerHolderRelation
                    };

                    //homeService.accepVitation(params , function(result){
                    //    layer.open({
                    //        content: result.msg,
                    //        style: 'background-color:#09C1FF; color:#fff; border:none;',
                    //        time: 1
                    //    });
                    //    layer.close(pagei);
                    //});
                    layer.close(pagei)
                })

                $('.cancle-btn').bind('click' , function(){
                    layer.close(pagei); //pagei为你调用layer时返回的索引
                })
            });
        });

        var swiper = new Swiper('.swiper-container-h', {
            loop : false,
            initialSlide :$routeParams.index || 0,
            direction : 'vertical',
            setWrapperSize :true,
            nextButton:'.swiper-button-next',
            autoHeight: true, //高度随内容变化
            onInit: function(swiper){
                //swiperAnimateCache(swiper);
                //swiperAnimate(swiper);
            },
            onSlideChangeEnd: function(swiper){
                // console.log('onSlideChangeEnd');
                //swiperAnimate(swiper);
            },
            onTouchEnd: function(swiper){
                if(swiper.touches.startY > swiper.touches.currentY && swiper.isEnd){
                    window.parent.location.href = './index.html#/guest';
                }
            },
        });

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {

            var swiperV = new Swiper('.swiper-container-v', {
                loop : true,
                pagination: '.swiper-pagination-v',
                //paginationClickable: true,
                setWrapperSize :true,
                direction: 'horizontal',
                lazyLoading : true,
                lazyLoadingOnTransitionStart : true,
                //effect: 'cube',
                //cube: {
                //    slideShadows: false,
                //    shadow: false,
                //    shadowOffset: 0,
                //    shadowScale: 0
                //},
                spaceBetween: 50
            });
        });
    }
});
