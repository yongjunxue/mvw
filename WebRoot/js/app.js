'use strict';

//定义主模块并注入依赖
var app=angular.module("mvw", ["ui.router","ngCookies"]);
//路由配置
app.config(function($stateProvider,$urlRouterProvider,$httpProvider) {
//	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
//    $httpProvider.defaults.headers.put['Content-Type'] = 'text/plain';
	
	
	//这里打算会对响应值进行解密处理。但是普通的html页面也会被解密。所以这么做没用
	$httpProvider.defaults.transformResponse = function(data){
		return data;
//		return decodeURIComponent(data.responseText);
	};
	
    $httpProvider.interceptors.push('mvwInterceptor');
    
	$urlRouterProvider.otherwise('login');
	$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'view/login.html',
      controller:'loginCtrl'
    })
    .state('main.logout', {  //这里怎么把main前缀去掉？？？
      url: '/logout',
      templateUrl: 'view/login.html',
      controller:'loginCtrl'
    })
    .state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        controller:'mainCtrl'
     })
     .state('main.users', {
        url: '/users',
        templateUrl: 'view/user/users.html',
        controller:'userCtrl'
     })
     .state('main.tissues', {
        url: '/tissues',
        templateUrl: 'view/sys/tissues.html',
        controller:'tissueCtrl'
     })
     .state('main.table', {
        url: '/table',
        templateUrl: 'view/table.html',
        controller:'tableCtrl'
     })
     .state('main.exams', {
        url: '/exams',
        templateUrl: 'view/exam/exams.html',
        controller:'examCtrl'
     })
	;
})
.constant("MVWHOST","http://192.168.8.109:4075/services2")
.constant("MYTOKEN","MYTOKEN")
;