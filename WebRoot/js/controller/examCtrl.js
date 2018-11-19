angular.module('mvw').controller('examCtrl',['$scope','$state','$http','$filter','$q','MVWHOST','comService',function($scope,$state,$http,$filter,$q,MVWHOST,comService){
//----------------分页-----------------------------------
	$scope.page={
		total:0,//总记录数
		page:1,//当前页
		pageSize:10,//每页记录数
		pages:0,//总页数
	};
//----------------参数-----------------------------------
	var args={
		tissueId:"4028881a57f9f1ac0157f9fb8eb80005",
		page:$scope.page.page,
		maxNum:$scope.page.pageSize
	};
	var data={
		serviceModule:"MVW-KAOSHI-T",
		serviceNumber:"10303302",
		token:"b95d7fd97891474395c494b7709d2eeb",
		args:args,
		terminalType:"A"
	}
	var param={
		data:data
	};
//----------------表头-----------------------------------
	$scope.theads=[
	     {code:"index",name:"#"}, 
	     {code:"examName",name:"试卷名称"},
	     {code:"totalQuestion",name:"题数"},
	     {code:"totalScore",name:"总分"},
	     {code:"timeLimit",name:"考试用时"},
	     {code:"examDifficulty",name:"试卷难度"},
	     {code:"illustration",name:"试卷说明"},
	     {code:"illustration",name:"操作",action:[{name:"编辑",model:"exam",id:""},{name:"删除"}]}
	];
//----------------列表-----------------------------------	
	$scope.dataList=[];
//----------------查询-----------------------------------
	$scope.query={
			examName:'',
			examTypes:[
			           {code:"",name:"请选择"},
			           {code:"0100",name:"内科"},
			           {code:"0200",name:"儿科"},
			           ],
			createTime:"",
//			examTypeSelected:"1"
	};
	
	$scope.model=param; //用$scope将param绑定之后，修改param中的值，普通刷新即可生效。否则必须强刷
	$scope.getExams=function(){
		param.data=$filter("json")(param.data);//json转为json字符串
		param.data=encodeURIComponent(param.data);//加密
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
		param.data=$filter("json")(param.data);//json转为json字符串
		param.data=encodeURIComponent(param.data);//加密
		var promise=$http({  
            method: 'post',  
            url: 'http://192.168.8.109:4075/services2/',  
//            params: {name: '张三',age: 12},   // get请求时的参数 (和JQuery不同,JQuery都放在data中)  
            data: param.data,  // post请求时的参数  (AngularJS优先支持RESTFUL(不是SOAP接口)接口服务的方式(默认传JSON格式的数据));  
            //data: "name=张三&age=12",   // RESTFUL会在服务端处理JSON对象,AngularJS本身不处理JSON对象。(如果服务端接口不是RESTFUL接口,那么就不能直接传JSON数据)  
            headers: {'Content-Type': 'text/plain;charset=ISO-8859-1'}  
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
		param.data=$filter("json")(param.data);//json转为json字符串
		param.data=encodeURIComponent(param.data);//加密
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
	
	//这个方法可以正确请求考试系统。（但是为什么请求成功之后走的是error???）
	$scope.getExams4=function(){
		param.data.args.page=$scope.page.page;
		param.data.args.maxNum=$scope.page.pageSize;
		
		var tempParam=$filter("json")(param.data);//json转为json字符串
		tempParam=encodeURIComponent(tempParam);
		
        var formFile = new FormData();
        formFile.append("param", "我是中国人"); //加入文件对象
        $.ajax({
            url: "http://192.168.8.109:4075/services2",
            data: tempParam,
            type: "Post",
            dataType: "json",
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: "application/x-www-form-urlencoded", //必须
            success:function (result) {
//                alert("sucess:"+result.msg+"---"+result.method);
            },
            error:function(result){
            	//不知道为什么,不走success这个方法，却走error？？
            	var resultStr=decodeURIComponent(result.responseText);
            	var r1=angular.fromJson(resultStr);
            	if(r1.opFlag == 'true'){
            		var r2=angular.fromJson(r1.serviceResult);
            		$scope.serviceResult=r2;
            		$scope.page.total=r2.totalCount;
            		$scope.page.pages=Math.ceil($scope.page.total/$scope.page.pageSize);
            		
            		var index=($scope.page.page-1)*$scope.page.pageSize+1;
            		angular.forEach($scope.serviceResult.paperList,function(obj){
            			obj.index=index++;
            		});
            		console.log($scope.serviceResult);
            		
            		$scope.$apply();//强制刷新。使用ajax请求的时候，如果没有这一步，那么第一次进入这个页面，列表不会刷新
            	}else{
            		alert(r1.errorMessage);
            	}
            }
        });
	};
	function getExams5(){
		param.data=$filter("json")(param.data);//json转为json字符串
		param.data=encodeURIComponent(param.data);//加密
		
        var formFile = new FormData();
        formFile.append("param", "我是中国人"); //加入文件对象
        var result=$.ajax({
            url: "http://192.168.8.109:4075/services2",
            data: param.data,
            type: "Post",
            dataType: "json",
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: "application/x-www-form-urlencoded" //必须
        });
        console.log(result.responseText);
        var text=decodeURIComponent(result.responseText);
        console.log(text);
	};
	
	
	$scope.getExams6=function(){
		param.data.args.page=$scope.page.page;
		param.data.args.maxNum=$scope.page.pageSize;
		
		var r1=comService.mvwPost(MVWHOST,param.data);
//		var r1=comService.mvwPost3("http://192.168.8.109:4075/services2",param.data,$scope);
//		$scope.$apply();//强制刷新。使用ajax请求的时候，如果没有这一步，那么第一次进入这个页面，列表不会刷新
    	if(r1.opFlag == 'true'){
    		var r2=angular.fromJson(r1.serviceResult);
    		$scope.dataList=r2.paperList;
    		$scope.page.total=r2.totalCount;
    		$scope.page.pages=Math.ceil($scope.page.total/$scope.page.pageSize);
    		
    		var index=($scope.page.page-1)*$scope.page.pageSize+1;
    		angular.forEach($scope.dataList,function(obj){
    			obj.index=index++;
    		});
    		console.log(r2);
    	}else{
    		console.log(r1.errorMessage);
    	}
    }
	$scope.getExams6();

//------------分页部分用分页指令代替--------------------------
/*	$scope.getFirstPage=function(){
		$scope.page.page=1;
		$scope.getExams6();
	};
	$scope.prePage=function(){
		$scope.page.page=$scope.page.page-1;
		if($scope.page.page<1){
			$scope.page.page=1;
		}
		$scope.getExams6();
	};
	$scope.nextPage=function(){
		$scope.page.page=$scope.page.page+1;
		if($scope.page.page>$scope.page.pages){
			$scope.page.page=$scope.page.pages;
		}
		$scope.getExams6();
	};
	$scope.getLastPage=function(){
		$scope.page.page=Math.ceil($scope.page.total/$scope.page.pageSize);
		$scope.getExams6();
	};
	$scope.goPage=function(){
		$scope.page.page=$scope.pageNum;
		$scope.getExams6();
	};
	$scope.formatNum=function(){
		if(isNaN($scope.pageNum)){
			$scope.pageNum="";
			return true;
		}
		if($scope.pageNum>$scope.page.pages){
			$scope.pageNum="";
			return true;
		}
	};*/
	
	$scope.edit=function (exam){
		$scope.exam=angular.copy(exam);
	};
	$scope.saveExam=function (){
		console.log($scope.exam);
		console.log("保存成功");
		$scope.getExams6();//刷新列表
	};
	$scope.close=function (){
		console.log("取消");
	};
	
	//监控$scope.page，如果有变化则执行$scope.getExams6()
	$scope.$watch('page', $scope.getExams6,true);//方式一。true表示深度监控，监控page的每个属性
//	$scope.$watch('page', function(){//方式二
//		$scope.getExams6();
//	},true);
	
	$scope.search=function(){
		console.log($scope.query);
		
	};
	
}]);
