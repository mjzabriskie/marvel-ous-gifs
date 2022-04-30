var searchEl = document.getElementById("user-form");
var searchInput = document.getElementById("search-input");
var resultsEl = document.querySelector("#results");

var search = [];
const APIKey = "1c68710c9a12fca3d6066e8f1e1bc1c1";
const hashKey = "acdbcd7e533a37b7ba8af93b84c3021e";
const giphyKey = "l0bmAzCfm8fxpcpAusIYozKfaOUG4B22";

var ts = 1;

var displayResults = function(hero){
    //check if api returned any heros
    if (hero.data.count === 0) {
      resultsEl.textContent = "No hero found.";
      return false;
    }

    //clear old content
    resultsEl.textContent = "";

    //loop over heros
    for (var i = 0; i < hero.data.count; i++) {
      //format repo name
      var heroName = hero.data.results[i].name;

      //create container for each repo
      var heroResultEl = document.createElement("a");
      heroResultEl.classList = "card-body";
      heroResultEl.setAttribute("href", "./character-page.html?heroName=" + heroName);

      //create span element to hold repo name
      var heroNameEl = document.createElement("span");
      heroNameEl.textContent = heroName;

      //append to container
      heroResultEl.appendChild(heroNameEl);

      //append container to the dom
      resultsEl.appendChild(heroResultEl);
    }
  };

var getUserInput = function (event) {
    event.preventDefault();
    var heroName = searchInput.value.trim();
    localStorage.setItem('search', heroName);
    if(heroName) {
        console.log(heroName);
        
        getMarvelData(heroName);
        getGifs(heroName);
        searchInput.value = "";
    } else {
        alert("enter hero name");
    }
};

$(function() {
    $("#search-input").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: "https://gateway.marvel.com/v1/public/characters",
          dataType: "json",
          data: {
            ts: 1,
            nameStartsWith: request.term,
            limit: 10,
            apikey: "1c68710c9a12fca3d6066e8f1e1bc1c1",
            hash: "acdbcd7e533a37b7ba8af93b84c3021e"

          },
          success: function(data) {
            console.log(data);
            response($.map(data.data.results, function(item) {
              return {
                label: item.name,
                value: item.name
              }
            }));
          }
        });
      },
      minLength: 2,
      select: function(event, ui) {
        if (ui.item) {}
      }
    });
  });

var getMarvelData = function (hero) {
    var apiUrl = "https://gateway.marvel.com/v1/public/characters?ts="+ ts +"&nameStartsWith=" + hero + "&apikey=" + APIKey + "&hash=" + hashKey;
    fetch(apiUrl).then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayResults(data);
            });
        }
    });
}

var getGifs = function (hero) {
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=l0bmAzCfm8fxpcpAusIYozKfaOUG4B22&q="+hero+"+cartoon&limit=6&offset=0&rating=pg-13&lang=en";
    fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
            })
        }
    })
}
searchEl.addEventListener("submit", getUserInput);






