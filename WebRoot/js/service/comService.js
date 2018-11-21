//封装了一些常用的服务
angular.module('mvw').service('comService',function($filter){
	
	/**
	 * 这个请求是没有mvwInterceptor的时候用的。有两个缺点：
	 * 1.使用的是ajax请求，无法被前端拦截器拦截
	 * 2.即时请求成功，却不走success方法。将dataType由json更改为text
	 */
	this.mvwPost=function(url,data){
		var r={};
		var tempParam=$filter("json")(data);//json转为json字符串
		tempParam=encodeURIComponent(tempParam);//加密
        $.ajax({
            url: "http://192.168.8.109:4075/services2",
            data: tempParam,
            type: "Post",
            async: false,//注意**************
            dataType: "text",
//            cache: false,//上传文件无需缓存
//            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: "application/x-www-form-urlencoded", //必须
            success:function (result) {
            	var resultStr=decodeURIComponent(result);
            	r=angular.fromJson(resultStr);
            },
            error:function(result){
            	
            	
            }
        });
        return r;
	};
	
	//没有加async: false。使用$scope.$apply()的时候报错
	this.mvwPost2=function(url,data){
		var r={};
		var tempParam=$filter("json")(data);//json转为json字符串
		tempParam=encodeURIComponent(tempParam);//加密
        $.ajax({
            url: "http://192.168.8.109:4075/services2",
            data: tempParam,
            type: "Post",
            dataType: "json",
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: "application/x-www-form-urlencoded", //必须
            success:function (result) {
            },
            error:function(result){
            	//不知道为什么,不走success这个方法，却走error？？
            	var resultStr=decodeURIComponent(result.responseText);
            	r=angular.fromJson(resultStr);
            }
        });
        return r;
	};
	
	this.mvwPost3=function(url,data,$scope){
		var r={};
		var tempParam=$filter("json")(data);//json转为json字符串
		tempParam=encodeURIComponent(tempParam);//加密
        $.ajax({
            url: "http://192.168.8.109:4075/services2",
            data: tempParam,
            type: "Post",
            dataType: "json",
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: "application/x-www-form-urlencoded", //必须
            success:function (result) {
            },
            error:function(result){
            	//不知道为什么,不走success这个方法，却走error？？
            	var resultStr=decodeURIComponent(result.responseText);
            	r=angular.fromJson(resultStr);
            }
        });
        $scope.$apply();
        return r;
	};
	
//	this.post=function(url,data){
//		console.log("post");
//		$http.post(url, data)
//        .success(function (data, header, config, status) {
//            console.log(data);
//            return data;
//        })
//        .error(function (data, header, config, status) {
//            console.log(data);
//            return data;
//        });
//	};
	
});
