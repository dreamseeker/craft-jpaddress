/**
 * JpAddress plugin for Craft CMS
 *
 * JpAddressGoogleMapFields JS
 *
 * @author    TORU KOKUBUN
 * @copyright Copyright (c) 2016 TORU KOKUBUN
 * @link      http://d-s-b.jp/
 * @package   JpAddress
 * @since     1.0.0
 */

;(function ($) {
    $.JpAddressGoogleMapFields = function (options) {
        var op = $.extend({}, $.JpAddressGoogleMapFields.defaults, options);

        var selector = op.namespace,
            $target = $('#' + selector),
            $latitude = $target.find('input.latitude'),
            $longitude = $target.find('input.longitude'),
            $zoomLevel = $target.find('input.zoom-level');

        var _default_pos = op.mapPosition;

        var _lat = (!op.useDefaultPosition && $latitude.val()) ? parseFloat($latitude.val()) : parseFloat(_default_pos[0]),
            _lng = (!op.useDefaultPosition && $longitude.val()) ? parseFloat($longitude.val()) : parseFloat(_default_pos[1]),
            _zoom = (!op.useDefaultPosition && $zoomLevel.val()) ? parseInt($zoomLevel.val()) : parseInt(_default_pos[2]);

        var mapMarker,
            mapCanvas,
            mapGeocoder,
            $map = $target.find('.map__canvas'),
            mapOpts = {
                zoom: _zoom,
                center: new google.maps.LatLng(_lat, _lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                zoomControl: true,
                disableDefaultUI: true
            };

        // refresh marker
        var refreshMarker = function () {
            mapMarker = new google.maps.Marker({
                position: mapCanvas.getCenter(),
                map: mapCanvas
            });
        };

        // set map centerd position.
        var refreshMapCode = function () {
            var _pos = mapCanvas.getCenter();

            $latitude.val(_pos.lat());
            $longitude.val(_pos.lng());
            $zoomLevel.val(mapCanvas.getZoom());
        };

        // get map position from geocoder
        var geocodeSearch = function (_query) {
            if (mapGeocoder) {
                mapGeocoder.geocode({'address': _query}, function (_results, _status) {
                    if (_status == google.maps.GeocoderStatus.OK) {
                        mapCanvas.setCenter(_results[0].geometry.location);
                        mapMarker.setPosition(_results[0].geometry.location);
                    } else if (_status == google.maps.GeocoderStatus.ERROR) {
                        alert('サーバとの通信時に何らかのエラーが発生しました。');
                    } else if (_status == google.maps.GeocoderStatus.INVALID_REQUEST) {
                        alert('GeocoderRequestに誤りがあります。');
                    } else if (_status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        alert('クエリ送信の制限回数を超えました。時間を空けて検索してください。');
                    } else if (_status == google.maps.GeocoderStatus.REQUEST_DENIED) {
                        alert('ジオコーダの利用が許可されていません。');
                    } else if (_status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                        alert('未知のエラーに遭遇しました。');
                    } else if (_status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                        alert('検索結果が見つかりませんでした。キーワードを変えて検索してください。');
                    } else {
                        alert(_status);
                    }
                });
            }
        };

        var loadGoogleMap = function () {
            $map.css({
                width: op.mapWidth,
                height: op.mapHeight
            });

            // view map / marker
            mapCanvas = new google.maps.Map($map[0], mapOpts);
            refreshMarker();

            // Event : if change map center, refresh marker
            google.maps.event.addListener(mapCanvas, 'center_changed', function () {
                mapMarker.setMap(null);
                refreshMarker();
            });

            // Event : if idle, refresh map codes
            google.maps.event.addListener(mapCanvas, 'idle', function () {
                refreshMapCode();
            });
        };

        loadGoogleMap();

        if (op.address !== null) {
            mapGeocoder = new google.maps.Geocoder();
            geocodeSearch(op.address);
        }
    };
    $.JpAddressGoogleMapFields.defaults = {
        namespace: null,
        address: null,
        useDefaultPosition: false,
        mapPosition: [35.681298, 139.76624689999994, 14],
        mapWidth: '100%',
        mapHeight: '400px'
    };
})(jQuery);