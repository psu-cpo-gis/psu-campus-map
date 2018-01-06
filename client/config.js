(function () {
    'use strict';
    angular.module('app.configuration', [])
        .factory('config', function () {
            var config =
            {
                initialPoint: { lat: 45.5112589, lng: -122.6838359 },
                initialZoom: 17,
                staticCampusMapURL: 'https://www.pdx.edu/campus-map',
                layers: [

                    {
                        id: 'TrailersDougFir',
                        visible: true,
                        inMenu: false,
                        data: [
                            {
                                geojsonFilename: 'TrailersDougFir.geojson',
                                infoWindowTemplate: 'trailersDougFir.html',
                                geojson: null,
                                features: null,
                                isSearchTarget: true,
                            }
                        ],
                    },
                    {
                        id: 'TrailersPonderosaPine',
                        visible: true,
                        inMenu: false,
                        data: [
                            {
                                geojsonFilename: 'TrailersPonderosaPine.geojson',
                                infoWindowTemplate: 'trailersPonderosaPine.html',
                                geojson: null,
                                features: null,
                                isSearchTarget: true,
                            }
                        ],
                    },
                    {
                        id: 'TrailersWHemlock',
                        visible: true,
                        inMenu: false,
                        data: [
                            {
                                geojsonFilename: 'TrailersWHemlock.geojson',
                                infoWindowTemplate: 'trailersWHemlock.html',
                                geojson: null,
                                features: null,
                                isSearchTarget: true,
                            }
                        ],
                    },                
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
                        id: 'Travel',
                        label: 'Travel',
                        visible: false,
                        inMenu: true,
                        buttonClass: 'btn-primary main-menu',
                        isExpander: true,
                        parent: null,
                        icon: 'multimodal-icon.svg',
                        data: [],
                        children: ['TriMet', 'Bike', 'Parking']
                    },
                    {
                        id: 'TriMet',
                        label: 'TriMet',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Travel',
                        isExpander: false,
                        icon: 'rosette.svg',
                        data: [
                            {
                                geojsonFilename: 'Bus_stops.geojson',
                                icon: 'bus-map.svg',
                                geojson: null,
                                features: null,
                                infoWindowTemplate: 'bus.html',
                            },                          
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
                            },
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
                    },

                   {
                        id: 'Bike',
                        label: 'Bike',
                        buttonClass: 'btn-primary main-menu-sub',
                        visible: false,
                        inMenu: true,
                        parent: 'Travel',
                        isExpander: false,
                        icon: 'ic_directions_bike_black_48dp.png',
                        data: [
                            {
                                geojsonFilename: 'BikeParking.geojson',
                                icon: 'bike_pkng-map.png',
                                geojson: null,
                                features: null,
                                infoWindowTemplate: 'bikeGarage.html',
                            },
                            {
                                geojsonFilename: 'BikeRepair.geojson',
                                icon: 'Fixit_repair-map.png',
                                geojson: null,
                                features: null,
                                infoWindowTemplate: 'bikeRepair.html',
                            },                                   
                            {
                                geojsonFilename: 'Bike_Facilities.geojson',
                                icon: 'ic_directions_bike_black_48dp-map.png',
                                geojson: null,
                                features: null,
                                infoWindowTemplate: 'tour.html',
                            },                                                  
                            {
                                geojsonFilename: 'DedicatedBikeLane.geojson',
                                geojson: null,
                                features: null,
                                style: {
                                    strokeColor: '#128030',
                                    strokeWeight: 3
                                }
                            },      
                            {
                                geojsonFilename: 'EstablishedBikeway.geojson',
                                geojson: null,
                                features: null,
                                style: {
                                    strokeColor: '#128030',
                                    strokeWeight: 3
                                }
                            },                                                

                        ]
                    },


                    {
                        id: 'Parking',
                        label: 'Parking',
                        visible: false,
                        inMenu: true,
                        buttonClass: 'btn-primary main-menu',
                        isExpander: false,
                        parent: 'Travel',
                        icon: 'parking.png',
                        data: [
                            {
                                geojsonFilename: 'CarParking_Multi.geojson',
                                infoWindowTemplate: 'carParking.html',
                                geojson: null,
                                features: null,
                                style: {
                                    zIndex: 2
                                }
                            },
                            {
                                geojsonFilename: 'CarParking_Permit.geojson',
                                infoWindowTemplate: 'carParking.html',
                                geojson: null,
                                features: null,
                                style: {
                                    zIndex: 2
                                       }
                            }

                        ],
                        children: []
                    },
                {
                    id: 'Food',
                    label: 'Eat',
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
                    label: 'Compute',
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
                    id: 'Explore',
                    label: 'Explore',
                    visible: false,
                    inMenu: true,
                    parent: null,
                    isExpander: true,
                    buttonClass: 'btn-primary main-menu',
                    icon: 'psu.png',
                    data: [],
                    children: ['CampusTours', 'CultureTours', 'SustainabilityTours', 'StudentHealth']

                },
                {
                    id: 'CampusTours',
                    label: 'Tour',
                    buttonClass: 'btn-primary main-menu-sub',
                    visible: false,
                    inMenu: true,
                    parent: 'Explore',
                    isExpander: false,
                    icon: 'tours.png',
                    data: [
                        {
                            geojsonFilename: 'CampusVisit.geojson',
                            infoWindowTemplate: 'tour.html',
                            icon: 'tours-map.png', 
                            geojson: null,
                            features: null
                        }
                    ]
                },
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
                },
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
                },
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
                },
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
                },
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
                },
                {
                    id: 'StudentHealth',
                    label: 'Health',
                    buttonClass: 'btn-primary main-menu-sub',
                    visible: false,
                    inMenu: true,
                    parent: 'Explore',
                    isExpander: false,
                    icon: 'studenthealth.svg',
                    data: [
                        {
                            geojsonFilename: 'StudentHealth.geojson',
                            infoWindowTemplate: 'tour.html',
                            icon: 'studenthealth-map.png',
                            geojson: null,
                            features: null
                        }
                    ]
                },

                ]
            };

            return config;
    });

}).call(this);
