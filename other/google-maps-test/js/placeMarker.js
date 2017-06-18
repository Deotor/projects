function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true,
    });

    setLocalStorage('lat' + counterForLat(), marker.getPosition(marker).lat(marker));
    setLocalStorage('lng' + counterForLng(), marker.getPosition(marker).lng(marker));

    var content = marker.getPosition(marker).lat(marker) + ' ' + marker.getPosition(marker).lng(marker);
    var arr = content.split(' ');
    console.log(arr);
    marker.addListener('click', function() {
        var infowindow = new google.maps.InfoWindow({
            content: content,
            maxWidth: 200
        });
        infowindow.open(map, marker);
        setTimeout(function () {
            infowindow.close(map, marker);
        }, 3000);
        marker.addListener('drag', function() {
            infowindow.close(map, marker);
        });
    });
    marker.addListener('dragend', function() {
        for(var i = 1; i <= 10; i++){
            if(localStorage.getItem('lat' + i) == arr[0]){
                setLocalStorage('lat' + i, arr[0]);
                setLocalStorage('lat' + i, marker.getPosition(marker).lat(marker));
            }
            if(localStorage.getItem('lng' + i) == arr[1]){
                setLocalStorage('lng' + i, arr[1]);
                setLocalStorage('lng' + i, marker.getPosition(marker).lng(marker));
            }
        }
        content = marker.getPosition(marker).lat(marker) + ' ' + marker.getPosition(marker).lng(marker);
        arr = content.split(' ');
    });

    //функции для удаления маркеров
    var markers = [];
    markers.push(marker);
    function setMapOnAll(map) {
        markers[0].setMap(map);
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    marker.addListener('rightclick', function() {
        deleteMarkers()
    });

    //Записываем в localstorage
    function setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }
}

function setMapOnAll(map) {
    var markers = [];
    for(var m = 1; m <= 10; m++){
        if(localStorage.getItem('lat' + m) && localStorage.getItem('lng' + m)){
                var marker = new google.maps.Marker({
                    position: {lat: parseFloat(localStorage.getItem('lat' + m)), lng: parseFloat(localStorage.getItem('lng' + m))},
                    map: map
                });
                markers.push(marker);
        }
    }
    console.log(markers);
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}