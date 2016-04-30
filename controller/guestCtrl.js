/**
 * User: kfs
 * Date：2016/4/22
 * Desc：
 */

define(function () {

    return function($scope ,$http , $routeParams){

        $scope.getGuestlist = function(){
            var params = {
                "pageInfo": {
                    "pageNumber": 1,
                    "pageSize": 2
                }
            };

            //guestService.getGuestlist(params , function(data){
            //    $scope.guestlist = data.content;
            //});

            $scope.guestlist = [
                {createName : '戴齐' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3'},
                {createName : '张三' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '李四' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3'},
                {createName : '王五' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '陶喆' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '林肯' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '邓胖' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '小李' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3'},
                {createName : '陶喆' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '林肯' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '邓胖' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '小李' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3'},
                {createName : '陶喆' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '林肯' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '邓胖' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '4'},
                {createName : '小李' ,createDate : '1460384113000' ,url : 'assets/images/0.jpg' ,palyerHolderRelation : '3'}
            ];
        };
        $scope.getGuestlist();

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            var loadingShow = false;
            var guestSwiper = new Swiper('.swiper-container-guest', {
                scrollbar: '.swiper-scrollbar',
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                onTouchEnd: function(swiper){
                    //if(swiper.translate>0){
                    //    //$location.path('/home');
                    //    location.href = './index.html#/home/3';
                    //}
                    if(swiper.translate>60){//判断上拉刷新
                        if(swiper.isBeginning) {
                            if(!loadingShow) {
                                //加载loading提示
                                swiper.prependSlide('<div class="swiper-slide center" id="loadData">正在加载上一页...</div>');
                                //swiper.slideNext();
                                loadingShow = true;
                                setTimeout(function(){
                                    $scope.guestlist = $scope.guestlist;
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
                                    $scope.guestlist = $scope.guestlist;
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
