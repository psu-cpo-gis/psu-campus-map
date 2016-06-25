(function () {
    'use strict';
    angular.module('app.configuration', [])
        .factory('config', function () {
            var config =
            {
                initialPoint: { lat: 45.5112589, lng: -122.6838359 },
                initialZoom: 17,
                staticCampusMapURL: 'https://www.pdx.edu/sites/default/files/201507_PSUMap_PrintBW.pdf',
                layers: [
                    {
                        id: 'Buildings',
                        visible: true,
                        inMenu: false,
                        data: [
                            {
                                geojsonFilename: 'Buildings_PSU.geojson',
                                infoWindowTemplate: 'building.html',
                                geojson: null,
                                features: null,
                                isSearchTarget: true,
                            }
                        ],

                    },
                    {
                        id: 'Transit',
                        label: 'Transit',
                        visible: false,
                        inMenu: true,
                        buttonClass: 'btn-primary main-menu',
                        isExpander: true,
                        parent: null,
                        icon: 'rosette.svg',
                        data: [],
                        children: ['Bus', 'Streetcar', 'MAX']
                    },
                    {
                        id: 'Parking',
                        label: 'Parking',
                        visible: false,
                        inMenu: true,
                        buttonClass: 'btn-primary main-menu',
                        isExpander: true,
                        parent: null,
                        icon: 'parking.png',
                        data: [],
                        children: ['CarParking', 'CarPermitParking']
                    },


                {
                    id: 'Food',
                    label: 'Food',
                    visible: false,
                    inMenu: true,
                    parent: null,
                    isExpander: true,
                    buttonClass: 'btn-primary main-menu',
                    icon: 'food.png',
                    data: [],
                    children: ['RestaurantBar', 'CoffeeShops', 'Foodcarts']

                },

                {
                    id: 'Computer',
                    label: 'Computers',
                    visible: false,
                    inMenu: true,
                    parent: null,
                    isExpander: false,
                    buttonClass: 'btn-primary main-menu',
                    icon: 'computer.svg',
                    data: [
                        {
                            geojsonFilename: 'Computers.geojson',
                            infoWindowTemplate: 'computerLab.html',
                            icon: 'print-map.png',
                            geojson: null,
                            features: null,
                            mergePopupKey: 'BLDID_AIM',
                            style: {
                                zIndex: 2
                            }

                        }
                    ],

                },

                {
                    id: 'Tours',
                    label: 'Tours',
                    visible: false,
                    inMenu: true,
                    parent: null,
                    isExpander: true,
                    buttonClass: 'btn-primary main-menu',
                    icon: 'tours.png',
                    data: [],
                    children: ['CampusTours', 'CultureTours', 'SustainabilityTours']

                },

                //{
                //    id: 'EmergencyPhones',
                //    label: 'Emergency',
                //    visible: true,
                //    inMenu: true,
                //    isExpander: false,
                //    buttonClass: 'btn-primary main-menu',
                //    icon: 'emergency_phones.svg',
                //    data: [
                //        {
                //            geojsonFilename: 'EmergencyPhones.geojson',
                //            infoWindowTemplate: 'emergencyPhone.html',
                //            icon: 'emergency_phones-map.svg',
                //            geojson: null,
                //            features: null
                //        }
                //    ]
                //},


                    {
                        id: 'CarParking',
                        label: 'Hourly/Daily',
                        visible: false,
                        inMenu: true,
                        parent: 'Parking',
                        isExpander: false,
                        buttonClass: 'btn-primary main-menu-sub',
                        icon: 'car.png',
                        data: [
                            {
                                geojsonFilename: 'CarParking_Multi.geojson',
                                infoWindowTemplate: 'carParking.html',
                                geojson: null,
                                features: null,
                                style: {
                                    zIndex: 2
                                }

                            }
                        ]

                    },

                    {
                        id: 'CarPermitParking',
                        label: 'Permit',
                        visible: false,
                        inMenu: true,
                        parent: 'Parking',
                        isExpander: false,
                        buttonClass: 'btn-primary main-menu-sub',
                        icon: 'permit_icon_bw.svg',
                        data: [
                            {
                                geojsonFilename: 'CarParking_Permit.geojson',
                                infoWindowTemplate: 'carParking.html',
                                geojson: null,
                                features: null,
                                style: {
                                    zIndex: 2
                                }

                            }
                        ]

                    },

                    {
                        id: 'Bus',
                        label: 'Bus',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Transit',
                        isExpander: false,
                        icon: 'bus.svg',
                        data: [
                            {
                                geojsonFilename: 'Bus_stops.geojson',
                                icon: 'bus-map.svg',
                                geojson: null,
                                features: null,
                                infoWindowTemplate: 'bus.html',
                            }
                        ]
                    }, {
                        id: 'MAX',
                        label: 'MAX',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Transit',
                        isExpander: false,
                        icon: 'max.svg',
                        data: [
                            {
                                geojsonFilename: 'MAX_lines.geojson',
                                geojson: null,
                                features: null,
                                style: {
                                    strokeColor: '#000000',
                                    strokeWeight: 3
                                }

                            },
                            {
                                geojsonFilename: 'MAX_stops.geojson',
                                icon: 'max-map.svg',
                                geojson: null,
                                features: null,
                                infoWindowTemplate: 'max.html'
                            }
                        ]
                    }, {
                        id: 'Streetcar',
                        label: 'Streetcar',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Transit',
                        isExpander: false,
                        icon: 'streetcar.svg',
                        data: [
                            {
                                geojsonFilename: 'Streetcar_lines.geojson',
                                geojson: null,
                                features: null,
                                style: {
                                    strokeColor: '#7851a9',
                                    strokeWeight: 3
                                }
                            },
                            {
                                geojsonFilename: 'Streetcar_stops.geojson',
                                icon: 'streetcar-map.svg',
                                geojson: null,
                                features: null,
                                infoWindowTemplate: 'streetcar.html'
                            }
                        ]
                    }
                    ,

                    {
                        id: 'CampusTours',
                        label: 'Campus',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Tours',
                        isExpander: false,
                        icon: 'psu.png',
                        data: [
                            {
                                geojsonFilename: 'CampusVisit.geojson',
                                infoWindowTemplate: 'tour.html',
                                icon: 'psu-map.png',
                                geojson: null,
                                features: null
                            }
                        ]
                    }
                    ,
                    {
                        id: 'CultureTours',
                        label: 'Art',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Tours',
                        isExpander: false,
                        icon: 'art.svg',
                        data: [
                            {
                                geojsonFilename: 'ArtTour.geojson',
                                infoWindowTemplate: 'arttour.html',
                                icon: 'art-map.svg',
                                geojson: null,
                                features: null
                            }
                        ]
                    }
                    ,
                    {
                        id: 'SustainabilityTours',
                        label: 'Sustainability',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Tours',
                        isExpander: false,
                        icon: 'leaf.png',
                        data: [
                            {
                                geojsonFilename: 'PSU_Sustainability.geojson',
                                infoWindowTemplate: 'tour.html',
                                icon: 'leaf-map.png',
                                geojson: null,
                                features: null
                            }
                        ]
                    }

                    ,
                    {
                        id: 'RestaurantBar',
                        label: 'Restaurants',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Food',
                        isExpander: false,
                        icon: 'restaurants.svg',
                        data: [
                            {
                                geojsonFilename: 'RestaurantBar.geojson',
                                icon: 'restaurants-map.svg',
                                infoWindowTemplate: 'restaurant.html',
                                geojson: null,
                                features: null
                            }
                        ]
                    }

                    ,
                    {
                        id: 'CoffeeShops',
                        label: 'Coffee Shops',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Food',
                        isExpander: false,
                        icon: 'coffee.svg',
                        data: [
                            {
                                geojsonFilename: 'CoffeeShops.geojson',
                                infoWindowTemplate: 'restaurant.html',
                                icon: 'coffee-map.svg',
                                geojson: null,
                                features: null
                            }
                        ]
                    }

                    ,
                    {
                        id: 'Foodcarts',
                        label: 'Food Carts',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Food',
                        isExpander: false,
                        icon: 'foodcart.svg',
                        data: [
                            {
                                geojsonFilename: 'Foodcart_Site.geojson',
                                infoWindowTemplate: 'foodcart.html',
                                icon: 'foodcart-map.svg',
                                geojson: null,
                                features: null
                            }
                        ]
                    }
                ]
            };

            return config;
    });

}).call(this);
