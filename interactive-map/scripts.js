mapboxgl.accessToken = 'pk.eyJ1IjoidGhlLWdhemVsbGUtYWQiLCJhIjoiY2plYTBzN3FuMThlMTJxbnRwdWlxaHh3NSJ9.PJwTgB-VeuND42Rh6RYpRg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [53.8478,23.4241], //set as UAE
    zoom: 2
});

var articleIsLoaded = false;
var loadedArticleLocation = null;



map.on('load', function () {
    map.addControl(new mapboxgl.NavigationControl());

    // Add a symbol layer.
    map.addLayer({
        "id": "symbols",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        //Ho Chi Minh city
                        "type": "Feature",
                        "properties": {
                            name: "Ho"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                106.6297,
                                10.8231

                            ]
                        }
                    },
                    {
                        //Luxor, Egypt
                        "type": "Feature",
                        "properties": {
                            name: "Luxor"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                32.6396,
                                25.6872
                            ]
                        }
                    },
                    {
                        //Andorra La Vella, Andorra
                        "type": "Feature",
                        "properties": {
                            name: "Andorra"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                1.5218,
                                42.5063
                            ]
                        }
                    },  {

                        //Shiraz, Iran
                        "type": "Feature",
                        "properties": {
                            name: "Shiraz"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                52.5837,
                                29.5918

                            ]
                        }
                    },
                    {
                        //UAE set
                        "type": "Feature",
                        "properties": {
                            name: "UAE"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                55.5136,
                                25.4052
                            ]
                        }
                    }
                ]
            }
        },
        "layout": {
            "icon-image": "rocket-15"
        }
    });

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'symbols', function (e) {
        if( articleIsLoaded && (loadedArticleLocation ===  e.features[0].properties.name) ){
            //clicking the same symbol twice, if the article is open will close the article.


            //close the article panel



            // //fly to the center
            // map.flyTo({
            //     //super hacky. if zoom changes, re-determine the number that will adjust the map to be at the ideal location.
            //     center:  [53.8478,23.4241],
            //     zoom: 2
            //
            // });

            loadedArticleLocation = null;
            articleIsLoaded = false;


        }else{

            //set the current one as the article
            loadedArticleLocation = e.features[0].properties.name;
            console.log("clicked : " + e.features[0].properties.name);


            //loadArticle(e.features[0].properties.name);


            articleIsLoaded = true;


            //fly to the location
            map.flyTo({
                //super hacky. if zoom changes, re-determine the number that will adjust the map to be at the ideal location.
                center: [e.features[0].geometry.coordinates[0] - 0.15, e.features[0].geometry.coordinates[1]],
                zoom: 10

            });


        }

    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'symbols', function () {

        map.getCanvas().style.cursor = 'pointer';

    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'symbols', function () {

        map.getCanvas().style.cursor = '';

    });
});