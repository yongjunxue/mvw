angular.module('mvw').controller('tableCtrl',['$scope','$state',function($scope,$state){
	
	$scope.getTable=function(){
		console.log("tableCtrl");
	};
	$scope.getTable();
}]);