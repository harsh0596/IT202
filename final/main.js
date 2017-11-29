var db = new Dexie("Locations");

db.version(1).stores({
   locations: 'latitude, longitude'
});

db.open().catch(function(error) {
	alert('Uh oh : ' + error);
});

$(".nav-link").on("click", function() {
    $(".screen").hide();
    var target = $(this).attr("href");
    $(target).show();

    if (target == '#screen2') {
        var map = new google.maps.Map(document.getElementById('screen2'), {
            zoom: 11,
            center: { lat: 41.8711, lng: -87.6429 }
        });
        map.addListener(map, 'idle', function() {
            map.trigger(map, 'resize');
        });

        $.ajax({
            url: "https://data.cityofchicago.org/resource/3uz7-d32j.json",
            type: "GET",
            data: {
                "$limit": 100,
                "$$app_token": "arWzLDTVt4t8zPMhJAeM7jczm"
            }
        }).done(function(data) {

            $.each(data, function(i, v) {
                map.addListener(map, 'idle', function() {
                    map.trigger(map, 'resize');
                });

                var info = new google.maps.InfoWindow({
                    content: '<div class="mdc-layout-grid__cell">' +
                        '<div class="ccard mdc-card shrine-product-card">' +
                        '<p class="pr"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> &nbsp&nbsp' + v._primary_decsription + '</p>' +
                        '<p><i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp&nbsp' + v.block + '</p>' +
                        '<p><i class="fa fa-calendar" aria-hidden="true"></i> &nbsp&nbsp' + v.date_of_occurrence.slice(0, 10) + '</p>' +
                        '<p><i class="fa fa-clock-o" aria-hidden="true"></i> &nbsp&nbsp' + v.date_of_occurrence.slice(12, 19) + '</p>' +
                        '</div>' +
                        '</div>'
                });


                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map,
                    title: 'test'
                });

                marker.addListener('click', function() {
                    info.open(map, marker);
                });

            });
        });
    }

    if (target == "#screen3") {
        var latitude;
        var longitude;

        if (!navigator.geolocation) {
            return;
        }

        function success(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            var marker = new google.maps.Marker({
                position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                map: map,
                title: 'test',
                icon: 'https://i.imgur.com/QkoGikZ.png'
            });
            
            db.locations.add({
                latitude: latitude,
                longitude: longitude
            });
        }

        function error() {

        }

        navigator.geolocation.getCurrentPosition(success, error);

        var map = new google.maps.Map(document.getElementById('mymap'), {
            zoom: 14,
            center: { lat: 41.8711, lng: -87.6429 }
        });
        map.addListener(map, 'idle', function() {
            map.trigger(map, 'resize');
        });

        $.ajax({
            url: "https://data.cityofchicago.org/resource/9rg7-mz9y.json",
            type: "GET",
            data: {
                "$limit": 5000,
                "$$app_token": "arWzLDTVt4t8zPMhJAeM7jczm"
            }
        }).done(function(data) {

            $.each(data, function(i, v) {
                map.addListener(map, 'idle', function() {
                    map.trigger(map, 'resize');
                });

                var info = new google.maps.InfoWindow({
                    content: '<div class="mdc-layout-grid__cell">' +
                        '<div class="ccard mdc-card shrine-product-card">' +
                        '<p><i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp&nbsp' + v.address + '</p>' +
                        '<p><i class="fa fa-phone" aria-hidden="true"></i> &nbsp&nbsp' + v.phone + '</p>' +
                        '</div>' +
                        '</div>'
                });


                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map,
                    title: 'test'
                });

                marker.addListener('click', function() {
                    info.open(map, marker);
                });

            });
        });
    }
});

$.ajax({
    url: "https://data.cityofchicago.org/resource/3uz7-d32j.json",
    type: "GET",
    data: {
        "$limit": 100,
        "$$app_token": "arWzLDTVt4t8zPMhJAeM7jczm"
    }
}).done(function(data) {

    $.each(data, function(i, v) {
        $("#shrine-products").append(
            '<div class="mdc-layout-grid__cell">' +
            '<div class="ccard mdc-card shrine-product-card">' +
            '<p class="pr"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> &nbsp&nbsp' + v._primary_decsription + '</p>' +
            '<p><i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp&nbsp' + v.block + '</p>' +
            '<p><i class="fa fa-calendar" aria-hidden="true"></i> &nbsp&nbsp' + v.date_of_occurrence.slice(0, 10) + '</p>' +
            '<p><i class="fa fa-clock-o" aria-hidden="true"></i> &nbsp&nbsp' + v.date_of_occurrence.slice(12, 19) + '</p>' +
            '</div>' +
            '</div>'
        )
    });
});

$(".ploc").append(
        '<p>Previous Locations:</p>'
        )
db.locations.each((l) => {
    $(".ploc").append(
        '<p>Latitude: ' + l.latitude + '  Longitude: ' + l.longitude + '</p>'
        )
});

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(function(registration) {
            console.log('Service Worker Registered');
      });
}

