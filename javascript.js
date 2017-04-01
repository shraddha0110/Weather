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
                // get all the information

                console.log(data);
                var location = data['location']['city'];
                var tempf = data['current_observation']['temp_f'];
                var tempc = data['current_observation']['temp_c'];
                var img = data['current_observation']['icon_url'];
                var desc = data['current_observation']['weather'];

                $('#location').html(location);

                $('#temp').html(tempf);
                $('#units').html("&#8451;");

                /*$units.on("click", function () {
                    if (units === "C") {
                        $temp.html(tempf.toFixed(1));
                        units = "F";
                        $units.html("F");
                    } else {
                        $temp.html(tempc.toFixed(1));
                        units = "C";
                        $units.html("C");
                    }
                });*/



                $('#desc').html(desc);
                $('#img').attr('src', img);
            }
        });
    }

    function error() {
        alert("That's weird! We couldn't find you!");
    }
});

/*

$("#temp").onclick(function tempChange() {
    switch (degreeUnit) {
        case ("&#8451;"):
            degreeUnit = "&#8451;";
            temperature.innerHTML = tempf + degreeUnit; // Set imperial state.
            break;
        case ("&#8457;"):
            degreeUnit = "&#8451;";
            temperature.innerHTML = tempc + degreeUnit; // Set metric state.
            break;
    }
});
*/
