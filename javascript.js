$(document).ready(function () {
    var Geo = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported');
    }

    function success(position) {
        Geo.lat = position.coords.latitude;
        Geo.lng = position.coords.longitude;

        var key = 'df5c4f754085afa5';
        var Weather = 'http://api.wunderground.com/api/' + key + '/forecast/geolookup/conditions/q/' + Geo.lat + ',' + Geo.lng + '.json';

        $.ajax({
            url: Weather,
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                var location = data['location']['city'];
                var tempf = data['current_observation']['temp_f'];
                var tempc = data['current_observation']['temp_c'];
                var img = data['current_observation']['icon_url'];
                var desc = data['current_observation']['weather'];

                $('#location').html(location);
                $('#temp').html(tempf);

                var units = "&#8451;";
                $('#temp').html(tempc.toFixed(1));
                $('#units').html(units);
                $('#units').on("click", function () {
                    if (units == "&#8451;") {
                        $('#temp').html(tempf.toFixed(1));
                        units = "&#8457;";
                        $('#units').html("&#8457;");
                    } else {
                        $('#temp').html(tempc.toFixed(1));
                        units = "&#8451;";
                        $('#units').html("&#8451;");
                    }
                });

                $('#desc').html(desc);
                $('#img').attr('src', img);
            }
        });
    }

    function error() {
        alert("That's weird! We couldn't find you!");
    }
});
