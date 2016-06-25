(function () {
    'use strict';
    angular.module('app.helpers', [])
        .factory('printService', function () {
            var printService =
            {
                printMap: function(map) {
                    map.setOptions({
                        zoomControl: false
                    });
 
                    var popUpAndPrint = function() {
                        var dataUrl = [];

                        $('#map canvas').filter(function() {
                            dataUrl.push(this.toDataURL("image/png"));
                        });
 
                        var container = $(document.getElementById('map'));
                        var clone = container.clone();

                        var width = container.innerWidth();
                        var height = container.innerHeight();

                        var printWidth = 700;
                        var printHeight = 920;

                        var topOffset = 0;
                        var leftOffset = 0;

                        $(clone).find('canvas').each(function(i, item) {
                            $(item).replaceWith(
                              $('<img>')
                                .attr('src', dataUrl[i]))
                                .css('position', 'absolute')
                                .css('left', 0)
                                .css('top', 0)
                                .css('width', width + 'px')
                                .css('height', height + 'px');
                        });
                        $(clone).find('img').css('position', 'absolute');

                        //$(clone).css('left', (-1 * leftOffset) + "px");

                        //var printWindow = window.open('', 'PrintMap',
                        //  'width=' + width + ',height=' + height);
                        var printWindow = window.open('', 'PrintMap',
                          'width=' + printWidth + ',height=' + printHeight);

                        //outer.append(clone);
                        var cloneElem = $(clone);

                        cloneElem
                            .find('div').first()
                            .css('background-color', "#dcdcdc")
                            .css('width', printWidth)
                            .css('height', printHeight);

                        if (leftOffset > 0) {
                            cloneElem.find('div').first()
                                .css('left', (-1 * leftOffset) + "px")
                                .css('width', (printWidth + leftOffset) + "px");
                        }

                        if (topOffset > 0) {
                            cloneElem.find('div').first()
                                .css('top', (-1 * topOffset) + "px")
                                .css('height', (printHeight + topOffset) + "px");
                        }
                        
                        printWindow.document.writeln(cloneElem.html());

                        setTimeout(function() {
                            printWindow.document.close();
                            printWindow.focus();
                            printWindow.print();
                            printWindow.close();

                            map.setOptions({
                                zoomControl: true
                            });
                        }, 500);

                    };
 
                    setTimeout(popUpAndPrint, 0);
                }
            };

            return printService;
        })
    .directive('selectOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    if (!window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    })
    .filter('cut', function () {
        return function (value, delimiter, tail) {
            if (!value) return '';

            var firstDelimiter = value.indexOf(delimiter);

            if (firstDelimiter < 0)
                return value;

            var newValue = value.substr(0, firstDelimiter);

            if (newValue.length < value.length)
                newValue += tail;

            return newValue;
        };
    });

}).call(this);
