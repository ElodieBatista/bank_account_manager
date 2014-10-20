'use strict';

angular.module('bamApp').factory('settingsService', function ($q) {
    return {
        // TODO: be careful with first month of Year
        getYearOfMonth: function(month) {
            return '2014';
        },

        getCurrentYear: function() {
            return '2013';
        },

        getMonths: function() {
            return [
                {
                    number: 1,
                    name: 'January'
                },
                {
                    number: 2,
                    name: 'February'
                },
                {
                    number: 3,
                    name: 'March'
                },
                {
                    number: 4,
                    name: 'April'
                },
                {
                    number: 5,
                    name: 'May'
                },
                {
                    number: 6,
                    name: 'June'
                },
                {
                    number: 7,
                    name: 'July'
                },
                {
                    number: 8,
                    name: 'August'
                },
                {
                    number: 9,
                    name: 'September'
                },
                {
                    number: 10,
                    name: 'October'
                },
                {
                    number: 11,
                    name: 'November'
                },
                {
                    number: 12,
                    name: 'December'
                }
            ];
        }
    };
});