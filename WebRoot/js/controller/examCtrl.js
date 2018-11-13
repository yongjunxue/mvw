angular.module('mvw').controller('examCtrl',['$scope','$state','$http','$filter','$q',function($scope,$state,$http,$filter,$q){
	console.log("examCtrl");
	var param={
		data:{
			"serviceModule":"MVW-KAOSHI-T",
			"serviceNumber":"10303302",
			"token":"b95d7fd97891474395c494b7709d2eeb",
			"args":{"typeCode":null,
				"tissueId":"",
				"bankId":null,
				"keywordId1":null,
				"keywordId2":null,
				"keywordId3":null,
				"auditingStatus":null,
				"mode":null,
				"useStatus":null,
				"startDate":null,
				"endDate":null,
				"name":null,
				"creater":null,
				"pages":1,
				"maxNum":20
			},
			"terminalType":"A"
		}
	};
	param.data=$filter("json")(param.data);//json转为json字符串
	param.data=encodeURIComponent(param.data);//加密
	$scope.getExams=function(){
		$http({  
            method: 'post',  
            url: 'http://192.168.8.109:4075/services2/',  
//            params: {name: '张三',age: 12},   // get请求时的参数 (和JQuery不同,JQuery都放在data中)  
            data: param.data,  // post请求时的参数  (AngularJS优先支持RESTFUL(不是SOAP接口)接口服务的方式(默认传JSON格式的数据));  
            //data: "name=张三&age=12",   // RESTFUL会在服务端处理JSON对象,AngularJS本身不处理JSON对象。(如果服务端接口不是RESTFUL接口,那么就不能直接传JSON数据)  
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
//            headers: {'Content-Type': 'application/json'}  
        }).success(function(data,status,headers,config) {  
        	console.log("获取试卷成功");
        	console.log(decodeURIComponent(data));
        	console.log(status);
        }).error(function(data,status,headers,config) { 
        	console.log("请求失败");
        	console.log(data);
        	console.log(status); 
        }); 
	};
	$scope.getExams2=function(){
		var promise=$http({  
            method: 'post',  
            url: 'http://192.168.8.109:4075/services2/',  
//            params: {name: '张三',age: 12},   // get请求时的参数 (和JQuery不同,JQuery都放在data中)  
            data: param.data,  // post请求时的参数  (AngularJS优先支持RESTFUL(不是SOAP接口)接口服务的方式(默认传JSON格式的数据));  
            //data: "name=张三&age=12",   // RESTFUL会在服务端处理JSON对象,AngularJS本身不处理JSON对象。(如果服务端接口不是RESTFUL接口,那么就不能直接传JSON数据)  
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
//            headers: {'Content-Type': 'application/json'}  
        });
		promise.then(function(data){
			console.log("成功");
			console.log(data);
		},function(data){
			console.log("失败");
			console.log(data);
		});
	};
	$scope.getExams3=function(){
		
		var defered = $q.defer();

        $http.post("http://192.168.8.109:4075/services2/",param.data)
            .success(function (data) {
                defered.resolve(data.results[0]);
            })
            .error(function (err) {
                defered.reject(err);
            });
        var promise=defered.promise;
		
		promise.then(function(data){
			console.log("成功");
			console.log(data);
		},function(data){
			console.log("失败");
			console.log(data);
		});
	};
	$scope.getExams3();
}]);
/**
{"serviceModule":"MVW-KAOSHI-T",
"serviceNumber":"10301300",
"token":"b95d7fd97891474395c494b7709d2eeb",
"args":{"typeCode":null,
		"tissueId":"",
		"bankId":null,
		"keywordId1":null,
		"keywordId2":null,
		"keywordId3":null,
		"auditingStatus":null,
		"mode":null,
		"useStatus":null,
		"startDate":null,
		"endDate":null,
		"name":null,
		"creater":null,
		"pages":1,
		"maxNum":20},
"terminalType":"A"}
 */
