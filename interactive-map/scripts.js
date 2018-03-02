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
            "icon-image": "rocket-15",
            "icon-size": 2

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


            loadArticle(e.features[0].properties.name);


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




const articleData = [

    {
        cityName: "Ho Chi Minh, Vietnam",
        name: "Ho",
        text: "If you’re looking to go somewhere rich in history and culture, Ho Chi Minh should be on your list. You could dedicate a day to visiting some of the country’s most important museums: The War Remnants Museums and the FITO museum where you'll be able to see some of the country’s journey in history and its unique art. Around this time of the year, the weather in the city is great for day trips around the Mekong Delta where you can enjoy fresh coconut drinks on a small kayak that takes you around the river. After you spend three days in the city, which is enough for you to tour around a bit, you can take a 40-minute flight to Phnom Penh, Cambodia where you can traverse the country’s beautiful capital and enjoy some of the most important contemporary art hubs. Although the flight costs could be a little pricey, you’ll be able to enjoy both these cities even on the lowest of budgets. On average, you can spend 35 AED on food per day, and if you take a hostel slightly further away from the city, it can go as low as 45 AED a night. If you give your stay a 750 AED budget, you’ll definitely be able to go around the city comfortably."
    },

    {
        cityName: "Luxor and Aswan, Egypt",
        name: "Luxor",
        text: "You’ve probably thought about going to Egypt, but maybe you didn’t know there’s much more to Egypt than just Cairo. Luxor and Aswan are two of the most historically significant cities in the world: if you’re interested in going underground and seeing some of the oldest tombs in the world then these cities are for you. But they are not just packed with history — taking a cruise along the Nile river is one of the most stunning experiences you can have in Egypt, all for  around 470 AED for 4 nights including all your meals! You will be able to enjoy the perfect weather as the sun sets and rises in the middle of the river and get to see some of the best dance shows by the locals at night. Only 45 minutes away from Luxor is Cairo, where you can fly to before or after your trip to experience Egypt’s city life. If you book your flight to Egypt early enough, you can get it for as low as 850 AED."
    },
    {
        cityName: "Andorra La Vella, Andorra",
        name: "Andorra",
        text: "You don’t get much rain in Abu Dhabi, let alone snow. Andorra is a tiny country between Spain and France known for its unique ski resorts and hiking trails. The country is often overlooked when people are planning their trips around Europe despite its gorgeous snow-filled mountains and incredible food. You can spend a couple of days in Andorra learning to ski or improving your skiing skills for a more chill spring break. You can book a room at a ski resort for about 440 AED, which includes ski equipment and access to most slopes. There are always small restaurants in the city to eat at, but eating at the resort won’t break your budget either. If you have a couple of friends you want to visit in Paris or Madrid, you can always spend a couple of days in Andorra and take a bus out to its neighboring countries. A bus ticket from Andorra to Barcelona is around 90 AED, but there are better deals for a big group renting a whole bus for themselves. Sometimes all you need is to make some snow angels and drink hot chocolate in the mountains — and Andorra is the perfect place for it."
    },

    {
        cityName: "Shiraz, Iran",
        name: "Shiraz",
        text: "Iran is one of the most prominent countries when it comes to architecture and history. Shiraz is known for its art, poetry, and colorful gardens. You can visit the Tomb of Hafez, one of the most important poets of Iran and follow that with some reflection in any one of the nearby gardens. If you’re concerned about safety, the country is now much better equipped for incoming tourists. Life in Shiraz is pretty cheap — you can spend as low as 90 AED a day for food and a hostel. Entrance fees for the different tourist attractions there are about 20-30 AED each, a reasonable price for the remarkable experience being offered. If you’re looking to decorate your room or buy some souvenirs for your family, the bazaars in the country have some of the most beautiful handcrafts you can buy for as much or as little as you’re willing to spend on them. If you want to travel to Tehran, a flight there is around 180 AED, and you can always take a night bus for a much cheaper price too. The country is also known for the kindness of its people and their outstanding hospitality, so you’re sure to make some friends along the way."
    },

    {
        cityName: "Ajman, Fujairah, Ras al-Khaimah, Umm al-Quwain, United Arab Emirates",
        name: "Ajman",
        text: "When breaks come around, we’re always eager to leave to country and travel anywhere else. But have you considered visiting any other emirate in the UAE other than Abu Dhabi, Dubai and Sharjah? The UAE is much more than its three famous emirates. Fujairah and Ras al- Khaimah have some of the most relaxing beaches in the UAE, and even going on a day cruise in any of the beach resorts there can be a real treat. In Ajman and Umm al-Quwain, you get a sense of the history and traditions of this country, and you’ll feel much more familiar with the culture of the place you live in. If you can drive or going with someone who can, you can always rent a car  for a reasonable price and drive around the emirates. You don’t have to spend the nights if you’re working with a low budget, but if you do, you can book a hotel for around 90-100 AED a night at any of the emirates. Give yourself a challenge and take a picture in every Emirate this spring break."
    }

];


function loadArticle(name){

    var dataObj = articleData.find(function(element) {
        return element.name === name;
    });

<<<<<<< HEAD

=======
>>>>>>> 771497720c18b9ba0aa487c02d5e5b075ece7e7d





}
