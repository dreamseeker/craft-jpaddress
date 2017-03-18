/**
 * JpAddress plugin for Craft CMS
 *
 * JpAddressFieldType JS
 *
 * @author    TORU KOKUBUN
 * @copyright Copyright (c) 2016 TORU KOKUBUN
 * @link      http://d-s-b.jp/
 * @package   JpAddress
 * @since     1.0.0
 */

;(function ($, window, document, undefined) {

    var pluginName = "JpAddressFieldType",
        defaults = {};

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function (id) {
            var _this = this,
                $element = $(_this.element);

            $(function () {
                _this.setjQueryObjects($element);
                _this.jpostal($element);
                _this.refreshMapCoordinates();

                // Event : view map
                _this.objects['controlMapView'].on('click', function (e) {
                    e.preventDefault();
                    _this.refreshMapGeocoder();
                });

                // Event : refresh map
                _this.objects['controlMapRefresh'].on('click', function (e) {
                    e.preventDefault();
                    _this.refreshMapGeocoder();
                });

                // Event : clear map
                _this.objects['controlMapClear'].on('click', function (e) {
                    e.preventDefault();
                    _this.switchControls('clear');
                    _this.clearCoordinates();
                });
            });
        },

        setjQueryObjects: function ($element) {
            var _this = this;

            _this.objects = {};

            _this.objects['controlMapView'] = $element.find('.control__map-view');
            _this.objects['controlMapRefresh'] = $element.find('.control__map-refresh');
            _this.objects['controlMapClear'] = $element.find('.control__map-clear');
            _this.objects['mapFields'] = $element.find('.map__fields');

            _this.objects['prefecture'] = $element.find('.prefecture > select');
            _this.objects['cityStreet'] = $element.find('input.city-street');
            _this.objects['city'] = $element.find('input.city');
            _this.objects['street'] = $element.find('input.street');
            _this.objects['building'] = $element.find('input.building');

            _this.objects['latitude'] = $element.find('input.latitude');
            _this.objects['longitude'] = $element.find('input.longitude');
            _this.objects['zoomLevel'] = $element.find('input.zoom-level');

            // _this.objects['latitude'].attr('readonly', true);
            // _this.objects['longitude'].attr('readonly', true);
            // _this.objects['zoomLevel'].attr('readonly', true);
        },

        jpostal: function ($element) {
            var _address = {},
                _postalCode = '#' + $element.find('input.postal-code').attr('id'),
                _prefecture = '#' + $element.find('.select.prefecture select').attr('id'),
                _building = '#' + $element.find('input.building').attr('id');

            _address[_prefecture] = "%3";
            _address[_building] = "%6%7";

            if($element.find('input.city-street').length){
                // City-Street field only
                var _cityStreet = '#' + $element.find('input.city-street').attr('id');

                _address[_cityStreet] = "%4%5";
            } else {
                // separate City / Street field
                var _city = '#' + $element.find('input.city').attr('id'),
                    _street = '#' + $element.find('input.street').attr('id');

                _address[_city] = "%4";
                _address[_street] = "%5";
            }

            $element.find('input.postal-code').jpostal({
                postcode: [_postalCode],
                address: _address
            });
        },

        refreshMapCoordinates: function () {
            var _this = this;

            var _lat = parseFloat(_this.escapeHTML(_this.objects['latitude'].val())),
                _lng = parseFloat(_this.escapeHTML(_this.objects['longitude'].val())),
                _zoom = parseInt(_this.escapeHTML(_this.objects['zoomLevel'].val()));

            if($.isFunction($.JpAddressGoogleMapFields)) {
                if (isFinite(_lat) && isFinite(_lng)) {
                    $.JpAddressGoogleMapFields({
                        namespace: _this.options.namespace,
                        mapPosition: [_lat, _lng, _zoom]
                    });
                } else {
                    $.JpAddressGoogleMapFields({
                        namespace: _this.options.namespace,
                        fourceDefaultPosition: true
                    });
                }
            } else {
                setTimeout(function(){
                    _this.refreshMapCoordinates();
                }, 500);
            }
        },

        refreshMapGeocoder: function () {
            var _this = this;

            var _address = _this.escapeHTML(_this.objects['prefecture'].val());

                if(_this.objects['cityStreet'].length){
                    // City-Street field only
                    _address += _this.escapeHTML(_this.objects['cityStreet'].val());
                } else {
                    // separate City / Street field
                    _address += _this.escapeHTML(_this.objects['city'].val());
                    _address += _this.escapeHTML(_this.objects['street'].val());
                }

                _address += _this.escapeHTML(_this.objects['building'].val());

            if (_address) {
                _this.switchControls('view');

                $.JpAddressGoogleMapFields({
                    namespace: _this.options.namespace,
                    address: _address
                });
            } else {
                alert('住所を入力してください');
            }
        },

        clearCoordinates: function () {
            var _this = this;

            _this.objects['latitude'].val('');
            _this.objects['longitude'].val('');
            _this.objects['zoomLevel'].val(15);
        },

        switchControls: function (mode) {
            var _this = this;

            switch (mode) {
                case 'clear':
                    _this.objects['mapFields'].addClass('hidden');
                    _this.objects['controlMapView'].removeClass('hidden');
                    _this.objects['controlMapRefresh'].addClass('hidden');
                    _this.objects['controlMapClear'].addClass('hidden');
                    break;
                default:
                    _this.objects['mapFields'].removeClass('hidden');
                    _this.objects['controlMapView'].addClass('hidden');
                    _this.objects['controlMapRefresh'].removeClass('hidden');
                    _this.objects['controlMapClear'].removeClass('hidden');
                    break;
            }
        },

        escapeHTML: function (value) {
            return $('<div />').text(value).html();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
