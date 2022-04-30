const APIKey = "1c68710c9a12fca3d6066e8f1e1bc1c1";
const hashKey = "acdbcd7e533a37b7ba8af93b84c3021e";
var ts = 1;

// var heroName = window.location.search.split("=")[1];
// //console.log(heroName);

var getMarvelData = function () {
    var hero = localStorage.getItem('search');
    console.log(hero);
    var apiUrl = "https://gateway.marvel.com/v1/public/characters?ts=" + ts + "&name=" + hero + "&apikey=" + APIKey + "&hash=" + hashKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                characterPage(data);
                var apiUrl = "https://gateway.marvel.com/v1/public/characters/" + data.data.results[0].id + "/comics?" + "ts=" + ts + "&apikey=" + APIKey + "&hash=" + hashKey;
                fetch(apiUrl).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (dataId) {
                            console.log(dataId);
                            characterPage(data, dataId);
                        });
                    }
                });
            });
        }

    });
};

var characterPage = function (data, dataId) {
    var characterName = data.data.results[0].name;
    var characterBio = data.data.results[0].description;
    var characterImg = data.data.results[0].thumbnail.path;
    if(characterBio === "") {
        console.log("empty");
    }
    console.log(characterImg);
    $("#hero-img").attr("src", characterImg + ".jpg");
    $("#hero-bio").text(characterBio);
    $("#character-name").text(characterName);
    console.log(characterName);
};

getMarvelData();