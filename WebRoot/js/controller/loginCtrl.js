angular.module('mvw').controller('loginCtrl',['$scope','$state','$cookies','$http','POIHOST','MVWHOST','MYTOKEN',function($scope,$state,$cookies,$http,POIHOST,MVWHOST,MYTOKEN){
//	$state.go('home.advList');
	$scope.user={
		name:"",
		pwd:""	
	};
	$scope.login=function(){
		$http.post(POIHOST+"/login", $scope.user)
        .success(function (data, header, config, status) {
            var r1=data;
            if(r1.result && r1.result=="true"){
            	console.log("登录成功");
            	if(r1.token){
//            		$cookies.put(MYTOKEN,r1.token);//在拦截器中处理token
            		$state.go('main.table');
            	}
            }else{
            	alert(r1.msg);
            	$state.go('login');
            }
        })
        .error(function (data, header, config, status) {
            console.log(data);
        });
	};
}]);