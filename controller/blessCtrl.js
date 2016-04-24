/**
 * User: kfs
 * Date：2016/4/22
 * Desc：
 */

define(['angular' , 'swiper'], function (angular , swiper) {

    return function($scope ,$http , $routeParams , blessService){

        $scope.getBlesslist = function(){
            var params = {
                "pageInfo": {
                    "pageNumber": 1,
                    "pageSize": 2
                }
            };

            //blessService.getBlesslist(params , function(data){
            //    $scope.blesslist = data.content;
            //});

            $scope.blesslist = [
                {createName : '戴齐' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3' , content : '祝你幸福'},
                {createName : '张三' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '李四' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3' , content : '祝你幸福'},
                {createName : '王五' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '陶喆' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '林肯' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '邓胖' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '小李' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3' , content : '祝你幸福'},
                {createName : '陶喆' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '林肯' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '邓胖' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '小李' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3' , content : '祝你幸福'},
                {createName : '陶喆' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '林肯' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '邓胖' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4' , content : '祝你幸福'},
                {createName : '小李' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3' , content : '祝你幸福'}
            ];
        };
        $scope.getBlesslist();

        $('#blessAdd').bind('click' , function(){
            $.get( 'template/common/bless.html' , function(html){
                var pagei = layer.open({
                    type: 1,
                    content: html,
                    anim: 0,
                    style: 'position:fixed; left:0; top:0; width:100%; height:50%; border:none;background-color:#e74f54;'
                });

                $('.submit-btn').bind('click' , function(){
                    var  content = $('#content').val();

                    if(!content){
                        layer.open({
                            content: '留言内容不能为空!',
                            style: 'background-color:#09C1FF; color:#fff; border:none;',
                            time: 1
                        });
                        return;
                    }

                    //blessService.bless({} , function(result){
                    //    layer.close(pagei); //pagei为你调用layer时返回的索引
                    //});
                    layer.close(pagei)
                })

                $('.cancle-btn').bind('click' , function(){
                    layer.close(pagei); //pagei为你调用layer时返回的索引
                })
            });
        });

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {

            var loadingShow = false;
            var blessSwiper = new Swiper('.swiper-container-bless', {
                scrollbar: '.swiper-scrollbar',
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                onTouchEnd: function(swiper){

                    if(swiper.translate>60){//判断上拉刷新
                        if(swiper.isBeginning) {
                            if(!loadingShow) {
                                //加载loading提示
                                swiper.prependSlide('<div class="swiper-slide center" id="loadData">正在加载上一页...</div>');
                                //swiper.slideNext();
                                loadingShow = true;
                                setTimeout(function(){
                                    $scope.blesslist = $scope.blesslist;
                                    $('#loadData').remove();
                                    loadingShow = false;
                                    $scope.$apply();
                                } , 1000)

                            }
                        }
                    }else if(swiper.translate<-40){ //判断下拉刷新
                        //完成一次loading才能开始下一次loading，防止重复多次
                        if(swiper.isEnd){
                            if(!loadingShow) {
                                //加载loading提示
                                swiper.appendSlide('<div class="swiper-slide center" id="loadData">正在加载下一页...</div>');
                                //swiper.slideNext();
                                loadingShow = true;
                                setTimeout(function(){
                                    $scope.blesslist = $scope.blesslist;
                                    $('#loadData').remove();
                                    loadingShow = false;
                                    $scope.$apply();
                                    swiper.slideTo(0, 0, false);
                                } , 1000)
                            }
                        }

                    }
                },
            });
        });
    }
});
