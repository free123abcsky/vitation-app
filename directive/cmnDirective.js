/**
 * User: kfs
 * Date：2016/4/17
 * Desc：公共指令
 */
define([ 'require',  'app'],  function () {

    directiveModule
        .directive('music', function () {
            return {
                restrict: 'EA',
                templateUrl: 'template/common/music.html',
                replace: true,
                link: function (scope, element, attr) {

                    element.bind('click', function () {
                        if ($(".icon-music").attr("num") == "1") {
                            $(".icon-music").removeClass("open");
                            $(".icon-music").attr("num", "2")
                            $(".music-span").css("display", "none");
                            document.getElementById("aud").pause();
                            $(".music_text").html("关闭");
                            $(".music_text").addClass("show_hide");
                            setTimeout(musicHide, 2000);
                        } else {
                            $(".icon-music").attr("num", "1");
                            $(".icon-music").addClass("open");
                            $(".music-span").css("display", "block");
                            document.getElementById("aud").play();
                            $(".music_text").html("开启");
                            $(".music_text").addClass("show_hide");
                            setTimeout(musicHide, 2000);
                        }
                        function musicHide() {
                            $(".music_text").removeClass("show_hide");
                        }
                    });
                }
            }
        })
        .directive('menu', function () {
            return {
                restrict: 'EA',
                templateUrl: 'template/common/menu.html',
                replace: true,
                link: function (scope, element, attr) {

                    var line = $("#line");

                    function closeMenu() {
                        line.addClass("playing").removeClass("on");
                        line.removeClass("longtoshot").addClass("shorttoshot");
                        $(".cardbtn_wrap").removeClass("menuItemToShow").addClass("menuItemToHide");
                        setTimeout(function () {
                            $(".menu-card .mainswitchtext").html("");
                            $(".menu-card .mainswitchtext").append("<img src='assets/images/menu-logo1.png'>").css("padding-top", "14px");
                            $(".menu-bottom-left .mainswitchtext").css("bottom", "0");
                            $(".menu-card .btn").hide();
                        }, 1000);
                    }
                    ;
                    function openMenu() {
                        $(".menu-card .btn").show();
                        line.addClass("playing").addClass("on");
                        line.removeClass("shorttoshot").addClass("longtoshot");
                        $(".cardbtn_wrap").removeClass("menuItemToHide").addClass("menuItemToShow");
                        $(".menu-card .mainswitchtext").html("关闭");
                        $(".menu-card .mainswitchtext").css("padding-top", "42px").find("img").remove();
                        $(".menu-bottom-left .mainswitchtext").css("bottom", "-32px");
                        line.removeClass("longtoshot");
                    }
                    ;
                    $("#switchs").click(function () {
                        if (line.is(".on")) {
                            closeMenu();
                        } else {
                            openMenu();
                        }
                    });
                    openMenu();
                    setTimeout(function () {
                        closeMenu();
                    }, 3000);
                    $(".menu-card .cardbtn_wrap").bind("click", function () {
                        var id = $(this).attr("id");
                        if (id == "menu-tmp") {
                            window.parent.location.href = './index.html#/home';
                        } else if (id == "menu-map") {
                            var mapAddress = $("#map-address").attr("href");
                            window.parent.location.href = mapAddress;
                        } else if (id == "menu-guest") {
                            window.parent.location.href = './index.html#/guest';
                        } else if (id == "menu-bless") {
                            window.parent.location.href = './index.html#/bless';
                        }
                    });

                }
            }
        })
        .directive('onFinishRenderFilters', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            scope.$emit('ngRepeatFinished');
                        });
                    }
                }
            }
        });

});

