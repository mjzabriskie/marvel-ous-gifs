var searchEl = document.getElementById("user-form");
var searchInput = document.getElementById("search-input");


const APIKey = "1c68710c9a12fca3d6066e8f1e1bc1c1";
const hashKey = "acdbcd7e533a37b7ba8af93b84c3021e";
var ts = 1;

var getUserInput = function (event) {
    event.preventDefault();
    var heroName = searchInput.value.trim();
    if(heroName) {
        console.log(heroName);
        getMarvelData(heroName);
        searchInput.value = "";
    } else {
        alert("enter hero name");
    }
};

var getMarvelData = function (hero) {
    var apiUrl = "https://gateway.marvel.com/v1/public/characters?ts="+ ts +"&name=" + hero + "&apikey=" + APIKey + "&hash=" + hashKey;
    fetch(apiUrl).then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        }
    });
}
searchEl.addEventListener("submit", getUserInput);


