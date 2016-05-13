"use strict";
// 在ionScroll的指令基础上新增了onScrollComplete回调 不影响原有的ionScroll
angular.module('ionic-citypicker.directive', ['ionic']).directive('ionScrollMinh', [
  '$timeout',
  '$controller',
  '$ionicBind',
  '$ionicConfig',
function($timeout, $controller, $ionicBind, $ionicConfig) {
  return {
    restrict: 'E',
    scope: true,
    controller: function() {},
    compile: function(element, attr) {
      var scrollCtrl;
      element.addClass('scroll-view ionic-scroll');
      //We cannot transclude here because it breaks element.data() inheritance on compile
      var innerElement = angular.element('<div class="scroll"></div>');
      innerElement.append(element.contents());
      element.append(innerElement);

      var nativeScrolling = attr.overflowScroll !== "false" && (attr.overflowScroll === "true" || !$ionicConfig.scrolling.jsScrolling());

      return { pre: prelink };
      function prelink($scope, $element, $attr) {
        $ionicBind($scope, $attr, {
          direction: '@',
          paging: '@',
          $onScroll: '&onScroll',
          $onScrollComplete: '&onScrollComplete',
          scroll: '@',
          scrollbarX: '@',
          scrollbarY: '@',
          zooming: '@',
          minZoom: '@',
          maxZoom: '@'
        });
        $scope.direction = $scope.direction || 'y';

        if (angular.isDefined($attr.padding)) {
          $scope.$watch($attr.padding, function(newVal) {
            innerElement.toggleClass('padding', !!newVal);
          });
        }
        if ($scope.$eval($scope.paging) === true) {
          innerElement.addClass('scroll-paging');
        }

        if (!$scope.direction) { $scope.direction = 'y'; }
        var isPaging = $scope.$eval($scope.paging) === true;

        if (nativeScrolling) {
          $element.addClass('overflow-scroll');
        }

        $element.addClass('scroll-' + $scope.direction);

        var scrollViewOptions = {
          el: $element[0],
          delegateHandle: $attr.delegateHandle,
          locking: ($attr.locking || 'true') === 'true',
          bouncing: $scope.$eval($attr.hasBouncing),
          paging: isPaging,
          scrollbarX: $scope.$eval($scope.scrollbarX) !== false,
          scrollbarY: $scope.$eval($scope.scrollbarY) !== false,
          scrollingX: $scope.direction.indexOf('x') >= 0,
          scrollingY: $scope.direction.indexOf('y') >= 0,
          zooming: $scope.$eval($scope.zooming) === true,
          maxZoom: $scope.$eval($scope.maxZoom) || 3,
          minZoom: $scope.$eval($scope.minZoom) || 0.5,
          preventDefault: true,
          nativeScrolling: nativeScrolling,
          scrollingComplete: onScrollComplete
        };

        if (isPaging) {
          scrollViewOptions.speedMultiplier = 0.8;
          scrollViewOptions.bouncing = false;
        }
        scrollCtrl = $controller('$ionicScroll', {
           $scope: $scope,
           scrollViewOptions: scrollViewOptions
         });

        function onScrollComplete() {
          $scope.$onScrollComplete({
            scrollTop: scrollCtrl.scrollView.__scrollTop,
            scrollLeft: scrollCtrl.scrollView.__scrollLeft
          });
        }
        $scope.$on('$destroy', function() {
            if (scrollViewOptions) {
              scrollViewOptions.scrollingComplete = noop;
              delete scrollViewOptions.el;
            }
            innerElement = null;
            $element = null;
            attr.$$element = null;
        });
      }
    }
  };
}]);
