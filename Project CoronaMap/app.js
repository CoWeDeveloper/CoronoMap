mapboxgl.accessToken = 'pk.eyJ1IjoiY29sZWdlbmQiLCJhIjoiY2wxOTUyYWNwMDQ5YzNvc2VuZDZ5cjNycyJ9.6ovBVMEi4KAvQdLWgvvPxQ';
const mapdata = () => {
    fetch("/data.json").
        then(response => response.json()).
        then(res => {
    res.data.forEach(element => {
        latitude = element.latitude
        longitude = element.longitude
        cases  =element.infected
    if (cases>255){
        color = "rgb(255, 0, 0)"; 
    }
    else{
        color = `rgb(${cases}, 0, 0)`
    }

        // Mark on the Map
        const marker1 = new mapboxgl.Marker({
            color: color,
            marker1 : cases
        })
            .setLngLat([longitude, latitude])
            .addTo(map);


    })
})
}

mapdata()





















map.on('load', () => {
    map.addSource("");
    // Add a layer showing the places.
    map.addLayer({
    'id': 'places',
    'type': 'circle',
    'source': 'places',
    'paint': {
    'circle-color': '#4264fb',
    'circle-radius': 6,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
    }
    });
     
    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });
     
    map.on('mouseenter', 'places', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
     
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
     
    map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });
    });