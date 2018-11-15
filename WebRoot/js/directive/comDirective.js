//封装了一些常用的服务
angular.module('mvw').directive('star',function(){
	return{
		template:"<font color='red'>&nbsp;&nbsp;*</font>"
	}
});
