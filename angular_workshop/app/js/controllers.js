'use strict';

myApp.controller('View1Ctrl', ['$scope',
    function ($scope) {
    	$scope.tasks = [
    		{text: 'laundry', date: new Date('12/23/2013') },
    		{text: 'pick up title', date: new Date('12/23/2011') },
    		{text: 'dentist', date: new Date('12/23/2018') }
    	];

    	$scope.addTask = function (newTask) {
    		$scope.tasks.push(
    			{ text: newTask.text,
    			date: newTask.date }
    			);
    	}

    	$scope.deleteTask = function (index) {
    		$scope.tasks.splice(index, 1);
    	}

  }]);

myApp.controller('View2Ctrl', ['$scope', 'GithubService',
    function ($scope, GithubService) {
    	$scope.fetchData = function (user) {
        GithubService.getUser(user).success(function (data) {
          console.log(data);
          $scope.name = data.name;
          $scope.avatar_url = data.avatar_url;
        });

        GithubService.getUserRepos(user).success(function (reposData) {
        	console.log(reposData)
        	$scope.repos = reposData.map(function(repo) {
        		return {
        			name: repo.name,
        			url: repo.html_url
        		}
        	});
        });
    	}
  }]);


