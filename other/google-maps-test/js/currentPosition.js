function CurrentPosition(controlDiv, map) {
    // Set CSS for the control border
    var goCurrentPositionUI = document.createElement('div');
    goCurrentPositionUI.id = 'goCurrentPositionUI';
    goCurrentPositionUI.title = 'Click to go';
    controlDiv.appendChild(goCurrentPositionUI);

    // Set CSS for the control interior
    var goCurrentPositionText = document.createElement('div');
    goCurrentPositionText.id = 'goCurrentPositionText';
    goCurrentPositionText.innerHTML = 'Current Position';
    goCurrentPositionUI.appendChild(goCurrentPositionText);

    goCurrentPositionUI.addEventListener('click', function() {
        var infoWindow = new google.maps.InfoWindow({map: map});
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Ты здесь! :-)');
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }
    });
}