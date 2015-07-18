myApp.service('GithubService', ['$http',
    function ($http) {
        var github_api = 'https://api.github.com';
        return {
            getUser: function (username) {
                return $http.get(github_api + '/users/' + username);
            },
            getUserRepos: function (username) {
                return $http.get(github_api + '/users/' + username + '/repos?sort=pushed');
            }
        }
    }]);