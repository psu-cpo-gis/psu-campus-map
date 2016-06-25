'use strict';
angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'ngMap', 'app.controllers', 'app.helpers', 'app.map', 'app.links', 'app.configuration']).config([
    '$routeProvider', '$compileProvider',
    function($routeProvider, $compileProvider) {
        $routeProvider.when('/', {
            redirectTo: '/map'
        }).when('/map', {
            templateUrl: 'views/map.html',
            reloadOnSearch: false
        }).when('/print', {
            templateUrl: 'views/print.html',
            reloadOnSearch: false
        }).otherwise({
            redirectTo: '/404'
        });
        return $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|pdfmap|tel):/);
    }
]).run([
    '$rootScope', 'config', '$location', '$window',
    function($rootScope, config, $location, $window) {
        $rootScope.config = config;
        angular.extend($rootScope.config, {
            isIOS: navigator.userAgent.match(/(iPad|iPhone|iPod)/g),
            isAndroid: navigator.userAgent.match(/(Android)/g),
            isMobile: navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/ig),
            title: 'Portland State University'
        });
        return $rootScope.$on('$routeChangeSuccess', function(event) {
            if (!$window.ga) {
                return;
            }
            return $window.ga('send', 'pageview', {
                page: $location.path()
            });
        });
    }
]);
