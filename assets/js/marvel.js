var searchEl = document.getElementById("user-form");
var searchInput = document.getElementById("search-input");


const APIKey = "1c68710c9a12fca3d6066e8f1e1bc1c1";
const hashKey = "acdbcd7e533a37b7ba8af93b84c3021e";
const giphyKey = "l0bmAzCfm8fxpcpAusIYozKfaOUG4B22";

var ts = 1;

var getUserInput = function (event) {
    event.preventDefault();
    var heroName = searchInput.value.trim();
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
    var apiUrl = "https://gateway.marvel.com/v1/public/characters?ts="+ ts +"&name=" + hero + "&apikey=" + APIKey + "&hash=" + hashKey;
    fetch(apiUrl).then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
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






