$(function(){
	
	
//	获取轮播图的item
	var $adItems = $("#ad_wrap >div");
	
//	初始化,判断窗口宽度并配置好轮播图
	slidesConf();
	
//	改变窗口宽度,调整轮播图配置
	window.onresize = function(e){
		slidesConf();
		setNavbarWidth();
	}
	
//	轮播图调整函数
	function slidesConf(){
		var winWidth = window.innerWidth;
		$adItems.each(function(index,item){
			if(winWidth > 640){
				//当窗口宽度大于768px时，轮播图item以背景图片形式展示
				$(item).html('');
				$(item).css("background-image","url('" + $(item).data("bg") + "')")
			}else{
				$(item).css("background-image","none")
				var itemImg = '<img src="' + $(item).data("imgsrc") + '"/>';
				$(item).html(itemImg);
			}
		})
	}
	
//	手指控制轮播图
	var $adCarousel = $("#main_ad > .carousel");
	
	$adCarousel.one("touchstart",function(){
		FingersSlidingdirection();
	})
	
	function FingersSlidingdirection(){
		var startPos = 0;
		var endPos = 0;
		$adCarousel.on("touchstart",function(e){
			startPos = e.originalEvent.changedTouches[0].clientX;
		})
		$adCarousel.on("touchmove",function(e){
			endPos = e.originalEvent.changedTouches[0].clientX;
		})
		$adCarousel.on("touchend",function(e){
			if(endPos - startPos >= 50){
				//prev
				$adCarousel.carousel('prev');
			}else if(endPos - startPos <= 50){
				//next
				$adCarousel.carousel('next');
			}
		})
	}
	
	/*
	 * 产品推荐nav_bar滑动条制作
	 */
//	获取navbar的Ul
	var $navTab = $("#js_pro_nav");
//	获取nav ul中的li
	var $navItems = $("#js_pro_nav >li")
	
	
	function getNavbarWidth(){
		var navWidth = 0;
		//	遍历items,获取每个li的宽度
		$navItems.each(function(index,item){
			navWidth += $(item).innerWidth();
		})
		return navWidth;
	}
	function setNavbarWidth(){
		var winWidth = window.innerWidth;
		if(winWidth <= 650){
			$navTab.css('width',getNavbarWidth()+ 40 +"px");
			$(".ul-warp").css("overflow-x","scroll");
		}else{
			$navTab.css('width',"auto");
			$(".ul-warp").css("overflow","inherit");
		}
	}
	setNavbarWidth();
	//初始化tooltips组件
	$('[data-toggle="tooltip"]').tooltip()
	
	var $newsTitle = $("#js_news_title");
	var $newsCons = $("#js_news_con > li");
	
	$newsCons.each(function(index,item){
		$(item).click(function(){
			$newsTitle.html($(this).data("title"));
		})
	})
})
