angular.module('mvw').controller('mainCtrl',['$scope','$state','$http',function($scope,$state,$http){
	$scope.logout=function(){
		console.log("退出登录");
		$state.go('login');
	};

//------menu.json---start-----------------------------------
	//存在的问题是：子菜单父菜单无法区分
	$scope.memuList={};
	
	$scope.getMenuList=function(){
		$http.get("data/menu.json").success(function(data) {
//			$scope.memuList = data;
//			console.log($scope.memuList);
		});
		console.log("获取菜单");
	};
	
	$scope.getMenuList();
	
	$scope.toMenu=function(menu){
		//1.其他菜单取消active
		angular.forEach($scope.memuList,function(item){
//			console.log(item);
			$("#"+item.id).removeClass("active");
	    });
		//2.对应的菜单添加active
		$("#"+menu.id).attr("class","active");
		//3.跳转
		if(menu.state == ''){
			console.log(menu.name+"没有配置路由");
		}else{
			$state.go(menu.state);
		}
		
	};
//------menu.json---end-----------------------------------
	
//------menu2.json---start-----------------------------------
	//存在的问题是：子菜单的样式变化了
//	$scope.memu2List={};
//	
//	$scope.getMenu2List=function(){
//		$http.get("data/menu2.json").success(function(data) {
//			$scope.memu2List = data;
//		});
//		console.log("获取菜单");
//		console.log($scope.memu2List);
//	};
//	
//	$scope.getMenu2List();
//	
//	$scope.toMenu2=function(menu){
//		//1.其他菜单取消active
//		angular.forEach($scope.memu2List,function(item){
//			console.log(item);
//			$("#"+item.id).removeClass("active");
//	    });
//		//2.对应的菜单添加active
//		$("#"+menu.id).attr("class","active");
//		//3.跳转
//		$state.go(menu.state);
//	};
//------menu2.json---end-----------------------------------
}]);