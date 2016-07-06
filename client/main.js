import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './main.html';


(function() {
	angular.module('app', [angularMeteor, 'app.directives']).config(function(){
		console.log('config run');
	});
})();