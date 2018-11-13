'use strict';

//定义主模块并注入依赖
var app=angular.module("mvw", ["ui.router"]);
//路由配置
app.config(function($stateProvider,$urlRouterProvider) {
	
	
	
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
        templateUrl: 'view/exams.html',
        controller:'examCtrl'
     })
	;
});