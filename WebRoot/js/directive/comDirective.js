//封装了一些常用的服务
angular.module('mvw').directive('myStar',function(){
	return{
		template:"<font color='red'>&nbsp;&nbsp;*</font>"
	};
});

//分页指令1，引入方式<my-page conf="page"></my-page>
angular.module('mvw').directive('myPage',function(){
	return{
		restrict: 'EA',
		replace: true,
		scope:{conf:'='},
		template:'<div class="text-center navbar-fixed-bottom col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">'+
					'共{{conf.total}}条记录  {{conf.pages}}页  当前第{{conf.page}}页'+
					'<div class="btn-group">'+
						'<button type="button" class="btn btn-default" ng-click="getFirstPage()">&lt&lt</button>'+
						'<button type="button" class="btn btn-default" ng-click="prePage()">&lt</button>'+
						'<button type="button" class="btn btn-default" ng-click="nextPage()">&gt</button>'+
						'<button type="button" class="btn btn-default" ng-click="getLastPage()">&gt&gt</button>'+
						'<div class="input-group" style="width:100px;">'+
							'<input type="text" class="form-control" ng-model="pageNum" ng-change="formatNum()" >'+
							'<span class="input-group-btn">'+
								'<button class="btn btn-default" type="button" ng-click="goPage()" ng-disabled="!pageNum">Go</button>'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</div>',
		link:function(scope,element,attrs){
//			console.log("打印conf");
//			console.log(scope);
//			console.log(element);
//			console.log(attrs);
			scope.getFirstPage=function(){
				scope.conf.page=1;
			};
			scope.prePage=function(){
				scope.conf.page=scope.conf.page-1;
				if(scope.conf.page<1){
					scope.conf.page=1;
				}
			};
			scope.nextPage=function(){
				scope.conf.page=scope.conf.page+1;
				if(scope.conf.page>scope.conf.pages){
					scope.conf.page=scope.conf.pages;
				}
			};
			scope.getLastPage=function(){
				var page=Math.ceil(scope.conf.total/scope.conf.pageSize);
				scope.conf.page=page;
			};
			scope.goPage=function(){
				scope.conf.page=scope.pageNum;
			};
			
			scope.formatNum=function(){
				if(isNaN(scope.pageNum)){
					scope.pageNum="";
					return true;
				}
				if(scope.pageNum>scope.conf.pages){
					scope.pageNum="";
					return true;
				}
			};
			
		}
	}
});

//分页指令2，引入方式<my-page2></my-page2>
angular.module('mvw').directive('myPage2',function(){
	return{
		restrict: 'EA',
		replace: true,
		template:'<div class="text-center navbar-fixed-bottom">'+
					'共{{page.total}}条记录  {{page.pages}}页  当前第{{page.page}}页'+
					'<div class="btn-group">'+
						'<button type="button" class="btn btn-default" ng-click="getFirstPage()">&lt&lt</button>'+
						'<button type="button" class="btn btn-default" ng-click="prePage()">&lt</button>'+
						'<button type="button" class="btn btn-default" ng-click="nextPage()">&gt</button>'+
						'<button type="button" class="btn btn-default" ng-click="getLastPage()">&gt&gt</button>'+
						'<div class="input-group" style="width:100px;">'+
							'<input type="text" class="form-control" ng-model="pageNum" ng-change="formatNum()" >'+
							'<span class="input-group-btn">'+
								'<button class="btn btn-default" type="button" ng-click="goPage()" ng-disabled="!pageNum">Go</button>'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</div>',
		link:function(scope,element,attrs){
//			console.log("打印无conf");
//			console.log(scope);
//			console.log(element);
//			console.log(attrs);
			scope.getFirstPage=function(){
				scope.page.page=1;
			};
			scope.prePage=function(){
				scope.page.page=scope.page.page-1;
				if(scope.page.page<1){
					scope.page.page=1;
				}
			};
			scope.nextPage=function(){
				scope.page.page=scope.page.page+1;
				if(scope.page.page>scope.page.pages){
					scope.page.page=scope.page.pages;
				}
			};
			scope.getLastPage=function(){
				var page=Math.ceil(scope.page.total/scope.page.pageSize);
				scope.page.page=page;
			};
			scope.goPage=function(){
				scope.page.page=scope.pageNum;
			};
			
			scope.formatNum=function(){
				if(isNaN(scope.pageNum)){
					scope.pageNum="";
					return true;
				}
				if(scope.pageNum>scope.page.pages){
					scope.pageNum="";
					return true;
				}
			};
			
		}
	}
});

//<my-grid></my-grid>
angular.module('mvw').directive('myGrid',function(){
	return{
		restrict: 'EA',
		replace: true,
		template:'<div class="table-responsive">'+
					'<table class="table table-striped table-hover table-bordered">'+
						'<thead>'+
							'<tr">'+
								'<th ng-repeat="head in theads>{{head.name}}</th>'+
							'</tr>'+
						'</thead>'+	
						'<tbody>'+
							'<tr ng-repeat="item in dataList">'+
								'<td>{{item.timeLimit}}</td>'+
							'</tr>'+
						'</tbody>'+
					'</table>'+
				'</div>',
		link:function(scope,element,attrs){
			
		}
	}
});
