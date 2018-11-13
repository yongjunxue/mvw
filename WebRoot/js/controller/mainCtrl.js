angular.module('mvw').controller('mainCtrl',['$scope','$state',function($scope,$state){
	$scope.logout=function(){
		console.log("退出登录");
		$state.go('login');
	};
}]);