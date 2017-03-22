
/*
var app = angular.module(config.appName,config.modules,['$interpolateProvider',function($interpolateProvider) {
    $interpolateProvider.startSymbol(config.startSymbol);
    $interpolateProvider.endSymbol(config.endSymbol);
}])
.factory('myInterceptor', ['$q',  function($q) {

    var responseInterceptor = {
        request: function(config) {
            return config;
        },
        response: function(response) {
            var deferred = $q.defer();
            deferred.resolve(response);
            return deferred.promise;
        },
        requestError: function(response) {

        },
        responseError: function(response) {
            alert('responseError' + "\r\n" + ", please try later, and check the console");
            console.log('a szerver válasza: ',response);
        }
    };

    return responseInterceptor;

}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');

}])
.config(['$routeProvider',function($routeProvider) {

    
	//generate url's with controllers, and some other data
    for(j in config.pages) {
        $routeProvider.when(config.pages[j].url,config.pages[j].data);

    }

}]);
*/
