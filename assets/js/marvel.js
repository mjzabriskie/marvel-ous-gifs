var searchEl = document.getElementById("user-form");
var searchInput = document.getElementById("search-input");
var resultsContainerEl = document.querySelector("#results-container");
var resultsEl = document.querySelector("#results");

var search = [];
const APIKey = "1c68710c9a12fca3d6066e8f1e1bc1c1";
const hashKey = "acdbcd7e533a37b7ba8af93b84c3021e";
const giphyKey = "l0bmAzCfm8fxpcpAusIYozKfaOUG4B22";

var ts = 1;

var displayResults = function (hero) {
  //check if api returned any heros
  if (hero.data.count === 0) {
    resultsEl.textContent = "No hero found.";
    return false;
  }

  //clear old content
  resultsEl.textContent = "";

  //loop over heros
  for (var i = 0; i < hero.data.count; i++) {
    //populate hero name
    var heroName = hero.data.results[i].name;

<<<<<<< HEAD
      //create container for each hero
      var heroResultEl = document.createElement("a");
      heroResultEl.classList = "button";
      heroResultEl.setAttribute("href", "./character-page.html?heroName=" + heroName);
=======
    //create container for each hero
    var heroResultEl = document.createElement("a");
    heroResultEl.classList = "cards";
    heroResultEl.setAttribute("href", "./character-page.html?heroName=" + heroName);
    heroResultEl.setAttribute("id", "result-btn");
>>>>>>> feature/search-merge

    // create img element
    var characterImg = hero.data.results[i].thumbnail.path;
    var imgContainerEl = document.createElement("div")
    var imgEl = document.createElement("img");
    imgContainerEl.classList = "card-image";
    imgEl.classList = "";
    imgEl.setAttribute("src", characterImg + "/portrait_fantastic.jpg")
    imgContainerEl.appendChild(imgEl);

    //create span element to hold repo name
    var heroNameEl = document.createElement("span");
    heroNameEl.setAttribute("class", "hero-name-btn");
    heroNameEl.classList = "hero-name-btn font-beba is-size-5"
    heroNameEl.textContent = heroName;

    //append to container
    heroResultEl.appendChild(imgContainerEl);
    heroResultEl.appendChild(heroNameEl);

<<<<<<< HEAD
var getUserInput = function (event) {
    event.preventDefault();
    resultsContainerEl.classList.remove("is-hidden");
    var heroName = searchInput.value.trim();
    localStorage.setItem('search', heroName);
    if(heroName) {
        console.log(heroName);
=======
>>>>>>> feature/search-merge

    //append container to the dom
    resultsEl.appendChild(heroResultEl);
  }

};

<<<<<<< HEAD
var getUserSelection = function (event) {
  var heroName = event.target.textContent;

  console.log(heroName);
  // localStorage.setItem('search', heroName);
  // if(heroName) {
  //     console.log(heroName);
  // } else {
  //     alert("enter hero name");
  // }
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
=======
var getUserInput = function (event) {
  event.preventDefault();
  var heroName = searchInput.value.trim();
  if (heroName) {
    console.log(heroName);
>>>>>>> feature/search-merge

    getMarvelData(heroName);
    getGifs(heroName);
    searchInput.value = "";
  } else {
    alert("enter hero name");
  }
};

$(function () {
  $("#search-input").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: "https://gateway.marvel.com/v1/public/characters",
        dataType: "json",
        data: {
          ts: 1,
          nameStartsWith: request.term,
          limit: 11,
          apikey: "1c68710c9a12fca3d6066e8f1e1bc1c1",
          hash: "acdbcd7e533a37b7ba8af93b84c3021e"

        },
        success: function (data) {
          console.log(data);
          response($.map(data.data.results, function (item) {
            return {
              label: item.name,
              value: item.name
            }
          }));
        }
      });
    },
    minLength: 2,
    select: function (event, ui) {
      if (ui.item) { }
    }
  });
});

var getMarvelData = function (hero) {
  var apiUrl = "https://gateway.marvel.com/v1/public/characters?ts=" + ts + "&nameStartsWith=" + hero + "&limit=11&apikey=" + APIKey + "&hash=" + hashKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayResults(data);
      });
    }
  });
}

var getGifs = function (hero) {
  var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=l0bmAzCfm8fxpcpAusIYozKfaOUG4B22&q=" + hero + "+cartoon&limit=6&offset=0&rating=pg-13&lang=en";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      })
    }
  })
}
searchEl.addEventListener("submit", getUserInput);
$("#results").on('click', 'a', function() {
  var name = this.textContent
  localStorage.setItem("search", name);
  console.log(name);
})

resultsEl.addEventListener("click", getUserSelection);






