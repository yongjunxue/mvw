angular.module('mvw').controller('loginCtrl',['$scope','$state',function($scope,$state){
//	$state.go('home.advList');
	$scope.user={
		name:"",
		pwd:""	
	};
	$scope.login=function(){
		console.log($scope.user);
		console.log("登录成功");
		$state.go('main.table');
	};
}]);