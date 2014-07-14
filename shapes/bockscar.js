//==== GLOBAL VARS =============================================================
var waypoints = [
    {
        "name": "North Field, Tinian",
        "type": "Takeoff",
        "lat": 15.072044,
        "lng": 145.638369
    },
    {
        "name": "Yakushima island",
        "type": "Rendezvous",
        "lat": 30.35,
        "lng": 130.516667
    },
    {
        "name": "Kokura",
        "type": "Primary target",
        "lat": 33.883333,
        "lng":  130.883333
    },
    {
        "name": "Nagasaki",
        "type": "Secondary target",
        "lat": 32.783333,
        "lng":  129.866667
    },
    {
        "name": "Yontan airfield, Okinawa",
        "type": "Landing",
        "lat": 26.393564,
        "lng": 127.7467
    }
];
//==== FUNCTIONS ===============================================================
function initialize() {
    // Initialize map
    var mapOptions = {
        center: new google.maps.LatLng(waypoints[0].lat, waypoints[0].lng),
        zoom: 5
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Cycle waypoints array
    var waypointMarkers = new Array();
    

    // Build array of LatLng object of waypoints
    var coords = new Array();
    waypoints.forEach(function(element, index, array) {
        var waypointCoords = new google.maps.LatLng(element.lat, element.lng);
        var markerOptions = {
            position: waypointCoords,
            map: map,
            title: element.type + ": " + element.name
        }
        if (element.name == 'Nagasaki') {
            var icon = {
                url: 'nuclear_explosion_thumb.gif',
                scaledSize: new google.maps.Size(41,50)
            };
            markerOptions.icon = icon;
        }
        
        waypointMarkers.push(new google.maps.Marker(markerOptions));
        coords.push(waypointCoords);
    });
    console.log(coords);
    // Create ployline and set it on map
    var flightPath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#4C4CC7',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
}

//==== WINDOW ONLOAD ===========================================================
google.maps.event.addDomListener(window, 'load', initialize);