'use strict';

var todoApp = angular.module('todoApp', ['ui.bootstrap', 'ngLodash', 'ngSanitize']);

todoApp.config([
  '$provide',
  function($provide) {
    $provide.decorator('$templateCache', function($delegate, $sniffer) {
      var originalGet = $delegate.get;

      $delegate.get = function(key) {
        var value;
        value = originalGet(key);
        if (!value) {
          // JST is where my partials and other templates are stored
          // If not already found in the cache, look there...
          value = JST[key]();
          if (value) {
            $delegate.put(key, value);
          }
        }
        return value;
      };

      return $delegate;
    });

    return this;
  }
]);

todoApp.controller('TodoCtrl', function($scope, $timeout, lodash, TodoService) {
  $scope.formData = {};
  $scope.todos = [];

  TodoService.getTodos().then(function(response) {
    $scope.todos = response;
  });

  $scope.addTodo = function() {
    TodoService.addTodo($scope.formData).then(function(response) {
      $scope.formData = {};
    });
  }

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo);
  }

  io.socket.get('/todos/subscribe', function(data) {
    io.socket.on('new_entry', function(entry) {
      $timeout(function() {
        $scope.todos.unshift(entry);
        $scope.$digest();
      }, 0, false);
    });
    io.socket.on('remove_entry', function(entry) {
      $timeout(function() {
        $scope.todos = lodash.reject($scope.todos, { 'id': entry[0].id });
        $scope.$digest();
      }, 0, false);
    });
  });
});