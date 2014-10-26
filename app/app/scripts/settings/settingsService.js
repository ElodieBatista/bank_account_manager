'use strict';

angular.module('bamApp').factory('settingsService', function ($rootScope) {
    return {
        change: {
            EuroDollar: 1.33,
            DollarEuro: 0.77
        },

        languages: [
            {
                name: 'English',
                abbr: 'en'
            },
            {
                name: 'Français',
                abbr: 'fr'
            }
        ],

        getCurrentYear: function() {
            return $rootScope.currentYear;
        },

        setCurrentYear: function(year) {
            $rootScope.currentYear = year;
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