'use strict';
angular.module('app.map', []).controller('mapCtrl', [
  '$scope', '$window', '$modal', '$compile', '$location', '$rootScope', '$routeParams', '$anchorScroll', '$timeout', '$http', 'printService', function($scope, $window, $modal, $compile, $location, $rootScope, $routeParams, $anchorScroll, $timeout, $http, printService) {
    var centerChangedToken, getAllVisibleFeatures, getElementOffset, i, infoWindow, initialVisibleLayers, initialize, initializeLayerData, initialized, j, l, len, len1, mapCenterChanged, mapState, mapZoomChanged, mapZoomChangedToken, pad, psuOverlayMapType, ref, search, searchFeatures, showPopup, toggleFeature, updateLayers, updateMapType, updateUrlWithCurrentState, updateWhenAllLayersLoaded, vl;
    console.log('top of map load');
    $scope.basemap = 'road';
    $scope.selectedSearchValue = void 0;
    $scope.searchFields = [];
    searchFeatures = null;
    psuOverlayMapType = null;
    $scope.isPrint = $location.path() === '/print';
    updateMapType = function() {
      var bounds, northEastLat, northEastLng, psuOverlayBounds, southWestLat, southWestLng;
      if ($scope.basemap === 'satellite') {
        return;
      }
      bounds = $scope.map.getBounds();
      if (bounds) {
        southWestLat = bounds.getSouthWest().lat();
        southWestLng = bounds.getSouthWest().lng();
        northEastLat = bounds.getNorthEast().lat();
        northEastLng = bounds.getNorthEast().lng();
        psuOverlayBounds = new google.maps.LatLngBounds(new google.maps.LatLng(45.501, -122, 689), new google.maps.LatLng(45.516, -122.671));
        if (bounds.intersects(psuOverlayBounds) && mapState.zoom > 16) {
          return $scope.map.setMapTypeId('psuOverlay');
        } else {
          return $scope.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
      }
    };
    updateUrlWithCurrentState = function() {
      var i, l, len, phase, ref, visibleLayers;
      $location.search('zoom', mapState.zoom);
      $location.search('lat', mapState.center.lat);
      $location.search('lng', mapState.center.lng);
      $location.search('b', mapState.basemap);
      visibleLayers = [];
      ref = $scope.layers;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        if (l.visible && l.inMenu) {
          visibleLayers.push(l.id);
        }
      }
      $location.search('l', visibleLayers.join());
      phase = $scope.$root.$$phase;
      if (phase !== '$apply' && phase !== '$digest') {
        return $scope.$apply();
      }
    };
    $scope.toggleBasemap = function() {
      var options;
      options = {};
      if ($scope.basemap === 'road') {
        mapState.basemap = 'satellite';
        $scope.basemap = 'satellite';
        $scope.map.overlayMapTypes.setAt(0, null);
        options = {
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        $scope.map.setOptions(options);
      } else if ($scope.basemap === 'satellite') {
        mapState.basemap = 'road';
        $scope.basemap = 'road';
        $scope.map.overlayMapTypes.setAt(0, psuOverlayMapType);
        updateMapType();
      }
      updateUrlWithCurrentState();
    };
    getAllVisibleFeatures = function(withMergePopupKey) {
      var d, f, features, i, j, k, l, len, len1, len2, ref, ref1, ref2;
      features = [];
      ref = $scope.layers;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        if (l.visible) {
          ref1 = l.data;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            d = ref1[j];
            if (d.mergePopupKey === withMergePopupKey && d.features !== null) {
              ref2 = d.features;
              for (k = 0, len2 = ref2.length; k < len2; k++) {
                f = ref2[k];
                features.push(f);
              }
            }
          }
        }
      }
      return features;
    };
    showPopup = function(latlng, feature, searchResult, template) {
      var compiled, content, f, i, infoWindowTemplate, len, mergePopupKey, phase, scope, visibleFeatures;
      if ($scope.showMapShare) {
        $scope.showMapShare = false;
      }
      infoWindowTemplate = template || feature.getProperty('infoWindowTemplate');
      if (infoWindowTemplate === void 0) {
        return;
      }
      scope = $rootScope.$new();
      content = '<div><div id="infowindow_content" ng-include src="\'views/Map/info-windows/' + infoWindowTemplate + '\'"></div></div>';
      compiled = $compile(content)(scope);
      scope.feature = feature;
      scope.searchResult = searchResult;
      scope.showMapShare = false;
      scope.mergedFeatures = [];
      if (feature) {
        mergePopupKey = feature.getProperty('mergePopupKey');
        if (mergePopupKey) {
          visibleFeatures = getAllVisibleFeatures(mergePopupKey);
          for (i = 0, len = visibleFeatures.length; i < len; i++) {
            f = visibleFeatures[i];
            if (feature.getProperty(mergePopupKey) && f.getProperty(mergePopupKey) === feature.getProperty(mergePopupKey)) {
              scope.mergedFeatures.push(f);
            }
          }
        }
      }
      scope.togglePopupShare = function(e) {
        var offset;
        offset = getElementOffset(e.target);
        $scope.sharePanelStyle.left = offset.left - 151;
        $scope.sharePanelStyle.top = offset.top - 5;
        return $scope.showMapShare = !$scope.showMapShare;
      };
      scope.showTextModal = function(header, text) {
        return $modal.open({
          templateUrl: "views/Map/textModal.html",
          controller: 'TextModalCtrl',
          size: 'sm',
          resolve: {
            header: function() {
              return header;
            },
            text: function() {
              return text;
            }
          }
        });
      };
      phase = scope.$root.$$phase;
      if (phase !== '$apply' && phase !== '$digest') {
        scope.$apply();
      }
      if ($scope.config.isMobile) {
        return setTimeout(function() {
          return $modal.open({
            templateUrl: "views/Map/infoModal.html",
            controller: 'InfoModalCtrl',
            resolve: {
              element: function() {
                return compiled[0];
              }
            }
          });
        }, 300);
      } else {
        infoWindow.setContent(compiled[0]);
        infoWindow.setPosition(latlng);
        infoWindow.addListener('closeclick', function() {
          $scope.showMapShare = false;
          return $scope.$apply();
        });
        return infoWindow.open($scope.map);
      }
    };
    $scope.onSelectSearch = function($item, $model, $label) {
      var buildingId, f, i, j, k, lat, latlng, len, len1, len2, len3, linearRing, lng, o, polygon, ref, ref1, ref2, x1, x2, y1, y2;
      if (searchFeatures === null) {
        return;
      }

      buildingId = $item.building;

      for (i = 0, len = searchFeatures.length; i < len; i++) {
        f = searchFeatures[i];
        if (f.getProperty('BLDID_AIM') === buildingId) {
          x1 = 9999;
          y1 = 9999;
          x2 = -9999;
          y2 = -9999;
          ref = f.getGeometry().getArray();
          for (j = 0, len1 = ref.length; j < len1; j++) {
            polygon = ref[j];
            ref1 = polygon.getArray();
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              linearRing = ref1[k];
              ref2 = linearRing.getArray();
              for (o = 0, len3 = ref2.length; o < len3; o++) {
                latlng = ref2[o];
                if (latlng.lat() < x1) {
                  x1 = latlng.lat();
                }
                if (latlng.lng() < y1) {
                  y1 = latlng.lng();
                }
                if (latlng.lat() > x2) {
                  x2 = latlng.lat();
                }
                if (latlng.lng() > y2) {
                  y2 = latlng.lng();
                }
              }
            }
          }
          lat = x1 + ((x2 - x1) / 2);
          lng = y1 + ((y2 - y1) / 2);
          latlng = new google.maps.LatLng(lat, lng);
          $scope.map.setCenter(latlng, 20);
          $scope.map.setZoom(20);
          if ($item.isBuilding) {
            showPopup(latlng, f);
          } else {
            showPopup(latlng, null, $item, 'searchResult.html');
          }
          $scope.selectedSearchValue = void 0;
          return;
        }
      }
    };
    mapState = {
      center: {
        lat: $scope.config.initialPoint.lat,
        lng: $scope.config.initialPoint.lng
      },
      zoom: $scope.config.initialZoom,
      basemap: 'road'
    };
    infoWindow = new google.maps.InfoWindow();
    $scope.layers = $scope.config.layers;
    $scope.showMapShare = false;
    $scope.sharePanelStyle = {};
    search = $location.search();
    if (typeof search.zoom !== 'undefined') {
      mapState.zoom = parseInt(search.zoom);
    }
    if (typeof search.lat !== 'undefined' && typeof search.lng !== 'undefined') {
      mapState.center = {
        lat: parseFloat(search.lat),
        lng: parseFloat(search.lng)
      };
    }
    if (typeof search.l !== 'undefined') {
      initialVisibleLayers = search.l.split(',');
      for (i = 0, len = initialVisibleLayers.length; i < len; i++) {
        vl = initialVisibleLayers[i];
        ref = $scope.layers;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          l = ref[j];
          if (l.id === vl) {
            l.visible = true;
          }
        }
      }
    }
    if (typeof search.b !== 'undefined') {
      mapState.basemap = search.b;
      $scope.basemap = search.b;
    }
    toggleFeature = function(f, isOn) {
      f.setProperty('isVisible', isOn ? 'true' : 'false');
      return $scope.map.data.overrideStyle(f, {
        visible: isOn
      });
    };
    updateLayers = function() {
      var d, f, k, len2, len3, len4, o, p, ref1, ref2, ref3;
      ref1 = $scope.layers;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        l = ref1[k];
        ref2 = l.data;
        for (o = 0, len3 = ref2.length; o < len3; o++) {
          d = ref2[o];
          if (d.features !== null) {
            ref3 = d.features;
            for (p = 0, len4 = ref3.length; p < len4; p++) {
              f = ref3[p];
              if (l.visible) {
                if (!f.getProperty('isVisible') || f.getProperty('isVisible') === 'false') {
                  toggleFeature(f, true);
                }
              } else {
                if (f.getProperty('isVisible') === 'true') {
                  toggleFeature(f, false);
                }
              }
            }
          }
        }
      }
      updateUrlWithCurrentState();
    };
    updateWhenAllLayersLoaded = function() {
      if (_.every($scope.layers, function(l) {
        return _.every(l.data, function(d) {
          return d.features !== null;
        });
      })) {
        return updateLayers();
      }
    };
    initializeLayerData = function(layerData) {
      var f, k, len2, ref1;
      layerData.features = $scope.map.data.addGeoJson(layerData.geojson);
      if (layerData.isSearchTarget) {
        searchFeatures = layerData.features;
      }
      ref1 = layerData.features;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        f = ref1[k];
        toggleFeature(f, false);
        f.setProperty('icon', layerData.icon);
        f.setProperty('infoWindowTemplate', layerData.infoWindowTemplate);
        if (layerData.style) {
          f.setProperty('style', JSON.stringify(layerData.style));
        } else {
          f.setProperty('style', null);
        }
        if (layerData.mergePopupKey) {
          f.setProperty('mergePopupKey', layerData.mergePopupKey);
        } else {
          f.setProperty('mergePopupKey', null);
        }
      }
      return updateWhenAllLayersLoaded();
    };
    $scope.getChildMenus = function(layer) {
      var c, children, k, len2, len3, m, o, ref1, ref2;
      children = [];
      ref1 = $scope.layers;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        m = ref1[k];
        ref2 = layer.children;
        for (o = 0, len3 = ref2.length; o < len3; o++) {
          c = ref2[o];
          if (m.id === c) {
            children.push(m);
          }
        }
      }
      return children;
    };
    $scope.getMenuButtonClass = function(layer) {
      var childMenus, k, len2, m;
      if (layer.isExpander) {
        if (!layer.visible) {
          childMenus = $scope.getChildMenus(layer);
          for (k = 0, len2 = childMenus.length; k < len2; k++) {
            m = childMenus[k];
            if (m.visible) {
              return 'active';
            }
          }
        }
        return null;
      }
      if (layer.visible) {
        return 'active';
      } else {
        return null;
      }
    };
    $scope.getMenu = function(id) {
      var k, len2, m, ref1;
      ref1 = $scope.layers;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        m = ref1[k];
        if (m.id === id) {
          return m;
        }
      }
      return null;
    };
    $scope.toggleLayer = function(layer) {
      var k, len2, ref1;
      layer.visible = !layer.visible;
      if (layer.isExpander && layer.visible) {
        ref1 = $scope.layers;
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          l = ref1[k];
          if (l !== layer && l.isExpander) {
            l.visible = false;
          }
        }
      }
      setTimeout(function() {
        return updateLayers();
      }, 0);
    };
    $scope.goHome = function() {
      $scope.map.setZoom($scope.config.initialZoom);
      $scope.map.setCenter(new google.maps.LatLng($scope.config.initialPoint.lat, $scope.config.initialPoint.lng), $scope.config.initialZoom);
    };
    $scope.getCurrentUrl = function() {
      return $location.absUrl();
    };
    $scope.toggleMapShare = function(e) {
      var offset;
      offset = getElementOffset(e.target);
      $scope.sharePanelStyle.left = offset.left - 301;
      if ($('.logo').height() === 40) {
        $scope.sharePanelStyle.top = offset.top - 60;
      } else {
        $scope.sharePanelStyle.top = offset.top - 110;
      }
      return $scope.showMapShare = !$scope.showMapShare;
    };
    $scope.printPreview = function() {
      $window.open($scope.config.staticCampusMapURL);
      return true;
    };
    $scope.print = function() {
      return $window.open($scope.config.staticCampusMapURL);
    };
    $scope.currentLocationMarker = null;
    $scope.copyLink = function() {
      var copyTextarea, msg, successful;
      copyTextarea = document.querySelector('#currentUrl');
      copyTextarea.select();
      successful = document.execCommand('copy');
      msg = successful != null ? successful : {
        'successful': 'unsuccessful'
      };
      return console.log('Copying text command was ' + msg);
    };
    $scope.enableGps = function(autoToggle) {
      $scope.gpsToken = navigator.geolocation.watchPosition(function(position) {
        var boundingBoxPercent, bounds, mapHeight, mapWidth, ne, newPoint, newbounds, northEastLat, northEastLng, southWestLat, southWestLng, sw;
        newPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        if ($scope.currentLocationMarker) {
          $scope.currentLocationMarker.setPosition(newPoint);
        } else {
          $scope.currentLocationMarker = new google.maps.Marker({
            clickable: false,
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png', new google.maps.Size(22, 22), new google.maps.Point(0, 18), new google.maps.Point(11, 11)),
            shadow: null,
            position: newPoint,
            map: $scope.map
          });
        }
        bounds = $scope.map.getBounds();
        if (bounds) {
          southWestLat = bounds.getSouthWest().lat();
          southWestLng = bounds.getSouthWest().lng();
          northEastLat = bounds.getNorthEast().lat();
          northEastLng = bounds.getNorthEast().lng();
          boundingBoxPercent = 0.80;
          mapWidth = northEastLng - southWestLng;
          mapHeight = northEastLat - southWestLat;
          ne = new google.maps.LatLng(northEastLat - mapHeight * boundingBoxPercent, northEastLng - mapWidth * boundingBoxPercent);
          sw = new google.maps.LatLng(southWestLat + mapHeight * boundingBoxPercent, southWestLng + mapWidth * boundingBoxPercent);
          newbounds = new google.maps.LatLngBounds(ne, sw);
          if (!newbounds.contains($scope.currentLocationMarker.getPosition())) {
            $scope.map.setCenter(newPoint);
          }
        }
      }, function(e) {}, {
        enableHighAccuracy: false,
        maximumAge: 5000
      });
    };
    $scope.disableGps = function() {
      if ($scope.gpsToken) {
        navigator.geolocation.clearWatch($scope.gpsToken);
        $scope.gpsToken = null;
        if ($scope.currentLocationMarker) {
          $scope.currentLocationMarker.setMap(null);
          $scope.currentLocationMarker = null;
        }
      }
    };
    $scope.toggleGps = function() {
      var elem;
      elem = angular.element(document.getElementById('gpsButton'));
      if ($scope.gpsToken) {
        $scope.disableGps();
      } else {
        $scope.enableGps();
      }
      elem.toggleClass('gps-on');
      elem.toggleClass('gps-off');
    };
    pad = function(n, width, z) {
      z = z || '0';
      n = n + '';
      if (n.length >= width) {
        return n;
      } else {
        return new Array(width - n.length + 1).join(z) + n;
      }
    };
    mapZoomChangedToken = null;
    centerChangedToken = null;
    mapZoomChanged = function() {
      if (mapZoomChangedToken) {
        clearTimeout(mapZoomChangedToken);
      }
      if (centerChangedToken) {
        clearTimeout(centerChangedToken);
      }
      mapZoomChangedToken = setTimeout(function() {
        var zoom;
        zoom = $scope.map.getZoom();
        mapState.zoom = zoom;
        updateUrlWithCurrentState();
        updateMapType();
      }, 100);
    };
    mapCenterChanged = function() {
      if (centerChangedToken) {
        clearTimeout(centerChangedToken);
      }
      centerChangedToken = setTimeout(function() {
        var bounds, center, zoom;
        zoom = $scope.map.getZoom();
        center = $scope.map.getCenter();
        mapState.zoom = zoom;
        mapState.center.lat = Math.round(center.lat() * 10000000) / 10000000;
        mapState.center.lng = Math.round(center.lng() * 10000000) / 10000000;
        updateUrlWithCurrentState();
        updateMapType();
        if ($scope.gpsToken && $scope.currentLocationMarker) {
          bounds = $scope.map.getBounds();
          if (!bounds.contains($scope.currentLocationMarker.getPosition())) {
            $scope.$apply(function() {
              return $scope.toggleGps();
            });
          }
        }
      }, 100);
    };
    getElementOffset = function(element) {
      var box, de, left, top;
      de = document.documentElement;
      box = element.getBoundingClientRect();
      top = box.top + window.pageYOffset - de.clientTop;
      left = box.left + window.pageXOffset - de.clientLeft;
      return {
        top: top,
        left: left
      };
    };
    initialized = false;
    initialize = function() {
      var buildingStyle, mapOptions, psuOverlayMapTypeOptions;
      if (initialized) {
        return;
      }
      initialized = true;
      if ($rootScope.map) {
        $scope.map = $rootScope.map;
        google.maps.event.clearInstanceListeners($scope.map);
      } else {
        psuOverlayMapTypeOptions = {
          getTileUrl: function(coord, zoom) {
            return "./_alllayers/L" + zoom + "/R" + pad(coord.y.toString(16), 8) + "/C" + pad(coord.x.toString(16), 8) + ".png";
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 19,
          minZoom: 11,
          name: "psuOverlay"
        };
        psuOverlayMapType = new google.maps.ImageMapType(psuOverlayMapTypeOptions);
        mapOptions = {
          zoom: mapState.zoom,
          center: new google.maps.LatLng(mapState.center.lat, mapState.center.lng),
          zoomControl: !$scope.config.isMobile,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP
          },
          minZoom:15,
          tilt: 0,
          streetViewControl: false,
          disableDefaultUI: true,
          mapTypeControlOptions: {}
        };
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.map.mapTypes.set('psuOverlay', psuOverlayMapType);
        if ($scope.basemap === 'satellite') {
          $scope.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        } else {
          $scope.map.overlayMapTypes.push(psuOverlayMapType);
        }
        google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function() {
          return updateMapType();
        });
        google.maps.event.addListener($scope.map, 'zoom_changed', mapCenterChanged);
        google.maps.event.addListener($scope.map, 'center_changed', mapCenterChanged);
        console.log('map created');
      }
      $rootScope.map = $scope.map;
      setTimeout(function() {
        var k, len2, ref1, results;
        ref1 = $scope.layers;
        results = [];
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          l = ref1[k];
          results.push((function(l) {
            var d, len3, o, ref2, results1;
            ref2 = l.data;
            results1 = [];
            for (o = 0, len3 = ref2.length; o < len3; o++) {
              d = ref2[o];
              results1.push((function(d) {
                var request;
                request = $http.get('./geojson/' + d.geojsonFilename);
                return request.then(function(result) {
                  d.geojson = result.data;
                  return initializeLayerData(d);
                });
              })(d));
            }
            return results1;
          })(l));
        }
        return results;
      }, 0);
      buildingStyle = {
        fillColor: 'yellow',
        strokeWeight: 0,
        fillOpacity: 0
      };
      $scope.map.data.setStyle(function(f) {
        var style;
        style = {};
        if (f.getProperty('NUM_STORY') !== void 0) {
          style = buildingStyle;
        } else if (f.getProperty('icon')) {
          style.icon = {
            anchor: new google.maps.Point(15, 15),
            url: '/map-icons/' + f.getProperty('icon')
          };
        }
        if (f.getProperty('style')) {
          style = JSON.parse(f.getProperty('style'));
        }
        return style;
      });
      $scope.map.data.addListener('mouseover', function(e) {
        if (e.feature.getProperty('NUM_STORY') !== void 0) {
          return $scope.map.data.overrideStyle(e.feature, {
            strokeWeight: 2,
            fillOpacity: 0.5
          });
        }
      });

      $scope.map.data.addListener('mouseout', function(e) {
        if (e.feature.getProperty('NUM_STORY') !== void 0) {
          return $scope.map.data.overrideStyle(e.feature, buildingStyle);
        }
      });
      $scope.map.data.addListener('click', function(e) {
        return showPopup(e.latLng, e.feature);
      });
      setTimeout(function() {
        var request;
        request = $http.get('/search/PSU_Occupants.json');
        return request.then(function(result) {
          var feature, k, len2, ref1, results;
          console.log('got search data');
          ref1 = result.data.features;
          results = [];
          var abbrevs = [];
          for (k = 0, len2 = ref1.length; k < len2; k++) {
            feature = ref1[k];

            if(abbrevs.indexOf(feature.properties.Abbrev) == -1){
                $scope.searchFields.push({
                    text:feature.properties.Abbrev,
                    buildingName: feature.properties.Name,
                    building: feature.properties.BLDG_AIM,
                    isBuilding:true
                })
                abbrevs.push(feature.properties.Abbrev)
            }

            $scope.searchFields.push({
              text: feature.properties.Department,
              buildingName: feature.properties.Name,
              building:feature.properties.BLDG_AIM,
              department: feature.properties.Department,
              room: feature.properties.Room,
              isBuilding: false
            });

            $scope.searchFields.push({
              text: feature.properties.Room,
              buildingName: feature.properties.Name,
              building:feature.properties.BLDG_AIM,
              department: feature.properties.Department,
              room: feature.properties.Room,
              isBuilding: false
            });

            $scope.searchFields.push({
              text: feature.properties.Name,
              buildingName: feature.properties.Name,
              building:feature.properties.BLDG_AIM,
              department: feature.properties.Department,
              room: feature.properties.Room,
              isBuilding: true
            });
          }
          return ;
        });
      }, 0);
      console.log('initialize done');
    };
    angular.element($window).bind('load', initialize);
    initialize();
    $scope.currentLocationMarker = null;
    console.log('bottom of map load');
    console.log('another console.log');
  }
]).controller('TextModalCtrl', [
  '$scope', '$modalInstance', 'header', 'text', '$modal', function($scope, $modalInstance, header, text, $modal) {
    $scope.header = header;
    $scope.text = text;
    $scope.ok = function() {
      $modalInstance.dismiss("cancel");
    };
  }
]).controller('InfoModalCtrl', [
  '$scope', '$modalInstance', 'element', '$modal', '$sce', function($scope, $modalInstance, element, $modal, $sce) {
    console.log(element);
    $scope.html = $sce.trustAsHtml(element.outerHTML);
    $scope.ok = function() {
      $modalInstance.dismiss("cancel");
    };
  }
]);
