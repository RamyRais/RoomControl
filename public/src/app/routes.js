'use strict';

angular
  .module('RoomControlApp')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/common/views/layout.html'
      })
      .state('app.index', {
        url: '/',
        templateUrl: 'app/index/index.view.html',
        controller: 'indexCtrl',
        resolve:{
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('app/index/index.controller.js');
          }]
        }
      })
      .state('app.lines', {
        url: '/lines',
        templateUrl: 'app/components/lines/lines.view.html',
        controller: 'linesCtrl',
        resolve:{
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('app/components/lines/lines.controller.js');
          }]
        }
      })
      .state('app.suggest', {
        url: '/suggest',
        templateUrl: 'app/components/suggest/suggest.view.html',
        controller: 'suggestCtrl',
        resolve:{
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('app/components/suggest/suggest.controller.js');
          }]
        }
      })
  }]);