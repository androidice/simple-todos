import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
	Tasks
} from '../../imports/api/tasks.js';

(function() {
	angular.module('app.directives', [angularMeteor])
		.directive('todoList', [function() {
			return {
				restrict: 'E',
				replace: true,
				scope:{},
				templateUrl: 'client/tpl/todos.tpl.html',
				controllerAs: "vm",
				controller: function($scope, $reactive) {
					var self = this;
					$reactive(self).attach($scope);
					self.autorun(function() {
						self.subscribe('tasks');
					});

					self.helpers({
						tasks() {
							return Tasks.find({
								completed: false
							});
						}
					});

					self.methods = {
						addTask: function(newTask) {
							// Insert a task into the collection
							Tasks.insert({
								text: newTask,
								createdAt: new Date()
							});

							// Clear form
							self.newTask = '';
						},
						completeTask: function(id, currentState) {
							Meteor.call("updateTask", id, currentState);
						}
					}
				}
			}
		}])
		.directive('completedList', function() {
			return {
				restrict: 'E',
				replace: true,
				scope:{},
				templateUrl: 'client/tpl/completedList.tpl.html',
				controllerAs: "vm",
				controller: function($scope, $reactive) {
					var self = this;
					$reactive(self).attach($scope);
					self.autorun(function() {
						self.subscribe('tasks');
					});

					self.helpers({
						tasks() {
							return Tasks.find({
								completed: true
							});
						}
					});
				}
			}

		});
})();