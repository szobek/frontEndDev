/**
 * Created by Szobek on 2016.10.18..
 */


angular.module(config.appName)
    .config(function ($provide) {
        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                console.log('angular exceptionHandler',exception,cause);
            };
        });
    })
.controller('IndexController',homeController)
.controller('CreateViewController',createView)
.controller('AppController',startApp)
.controller('SetupController',setupView)
.controller('LogController',logView)
.controller('TestController',testView)
;

var storageHandler = new function () {
    var db = localStorage,series;
    getSeries();
    // TODO-Szobek: a sorozat tárolás felépítése a storageben; ctrl: angular_controller; fn storageHandler:
    /**
     * localStorage->
     *  series => array();
     *      {
     *          id: 11,
     *          title: 'Ez egy sorozat neve'
     *          e: 1,
     *          s: 4,
     *          place: 'torrent'
     *      },
     *      {
     *          id: 149,
     *          title: 'Ez egy másik sorozat neve'
     *          e: 14,
     *          s: 9,
     *          place: 'torrent'
     *      },
     *
     *
     */

    this.getKey = function(objKey) {
        return JSON.parse(db[objKey]);
    };

    this.setKey = function(key,val) {
        db[key] = JSON.stringify(val);
    };

    function getSeries() {
        if(db.series)
            series = JSON.parse(db.series);
        else
            series = [];
    }

    function getSerieById(id) {
        var index;
        for(var i in series) {
            if(series[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    function setSeries() {
        db.series = JSON.stringify(series);
    }

    this.seriesList = function() {
        return series;
    };

    /**
     *
     * @param id -> the serie id
     * @param key -> episode or series
     * @param command -> inc or desc the key
     */
    this.modify = function (id,key,command) {
        switch(command) {
            case "-":
                series[getSerieById(id)][key]--;
                break;
            case "+":
                series[getSerieById(id)][key]++;
                break;
            default:
                break;
        }

        setSeries();
    };

    this.reset = function (id) {
        series[getSerieById(id)].s = 1;
        series[getSerieById(id)].e = 1;
        setSeries();
    };

    this.addSerie = function (obj) {
        obj.id = series.length; // ez meg egy autoincrement érték
        series.push(obj);
        setSeries();
    };

    this.deleteSerie = function(id) {
        series.splice(getSerieById(id),1);
        setSeries();
    };

    this.clearData = function () {
        localStorage.clear();
        series = [];
        setSeries();
        location.href="#/";
    };

};

function logView($scope) {
    console.log("start log page");
}

function testView($scope) {
    console.log('run testview');

}


