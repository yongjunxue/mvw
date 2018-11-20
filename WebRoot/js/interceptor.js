//拦截器：1.加解密参数，2.token拦截
angular.module('mvw').factory('mvwInterceptor',['$state',"$log",'$cookies',"$q","$filter",'comService','MYTOKEN',function($state,$log,$cookies,$q,$filter,comService,MYTOKEN){
	$log.info("执行mvwInterceptor");
	
	var myTokeInterceptor={
		responseError:function(resE){
			$log.info("mvwInterceptor，响应错误");
			if(resE.status == -1){
				alert("网络异常，请稍后再试");
			}else{
				alert(resE.status+"错误");
			}
			$log.info(resE);
			return $q.reject(resE);
		},
		response:function(response){
			var url=response.config.url;
			if(url.indexOf(".html")<0){
				if(response.data){
					response.data=decodeURIComponent(response.data);
					response.data=angular.fromJson(response.data);
				}
			};
			return response;
		},
		request:function(request){
			if(request.url.indexOf(".html")<0){
				if(request.data){
					request.data=$filter("json")(request.data);
					request.data=encodeURIComponent(request.data);
				}
			}
			
/*
			var state=$state.current.name;
			var token= $cookies.get(MYTOKEN);
			if(state != "login"){
				if(!token){
					$state.go('login');
				}
			}
*/			
			return request;
		},
		requestError:function(reqE){
			$log.info("mvwInterceptor，请求错误");
			$log.info(reqE);
			return $q.reject(reqE);
		}
	};
	
	return myTokeInterceptor;
}]);
