var bioContentEl = document.getElementById("bio-content");
var comicContainerEl = document.querySelector("#results-container")
var comicEl = document.getElementById("results");
var gifsContainerEl = document.querySelector("#gifs");

const APIKey = "1c68710c9a12fca3d6066e8f1e1bc1c1";
const hashKey = "acdbcd7e533a37b7ba8af93b84c3021e";
var ts = 1;

var displayGifs = function(gifs){
      //check if api returned any gifs
  if (gifs.data.length === 0) {
    resultsEl.textContent = "No GIFs found.";
    return false;
  }

  //loop over gif results
  for (var i = 0; i < gifs.data.length; i++) {
      var gifUrl = gifs.data[i].url;
      var gifAlt = gifs.data[i].title

    //create container for each gif
    var gifResultEl = document.createElement("a");
    gifResultEl.classList = "gif-result";
    gifResultEl.setAttribute("href", gifUrl);
    gifResultEl.setAttribute("target", "_blank");

    // create gif element
    var characterGif = gifs.data[i].images.fixed_height.url;
    var gifEl = document.createElement("img");

    gifEl.setAttribute("src", characterGif);
    gifEl.setAttribute("alt", gifAlt);
    gifResultEl.appendChild(gifEl);

    //append container to the dom
    gifsContainerEl.appendChild(gifResultEl);
  }
}

var getGifs = function (hero) {
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=l0bmAzCfm8fxpcpAusIYozKfaOUG4B22&q=" + hero + "&limit=30&offset=0&lang=en";
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayGifs(data);
        })
      }
    })
  }

var getMarvelData = function () {
    var hero = localStorage.getItem('search');
    getGifs(hero);
    var apiUrl = "https://gateway.marvel.com/v1/public/characters?ts=" + ts + "&name=" + hero + "&apikey=" + APIKey + "&hash=" + hashKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var apiUrl = "https://gateway.marvel.com/v1/public/characters/" + data.data.results[0].id + "/comics?" + "ts=" + ts + "&limit=5&apikey=" + APIKey + "&hash=" + hashKey;
                fetch(apiUrl).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (dataId) {
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
        comicContainerEl.classList.remove("is-hidden");
        bioContentEl.classList.add("is-hidden");
        for(var i = 0; i < dataId.data.count; i++) {
            var comicTitle = dataId.data.results[i].title;
            var comicImage = dataId.data.results[i].thumbnail.path;
            var comicUrl = dataId.data.results[i].urls[0].url;

            var heroResultEl = document.createElement("a");
            heroResultEl.classList = "cards";
            heroResultEl.setAttribute("href", comicUrl);
            heroResultEl.setAttribute("target", "_blank");
            heroResultEl.setAttribute("id", "result-btn");

            // create img element
            var imgContainerEl = document.createElement("div")
            var imgEl = document.createElement("img");
            imgContainerEl.classList = "card-image";
            imgEl.classList = "";
            imgEl.setAttribute("src", comicImage + "/portrait_fantastic.jpg")
            imgContainerEl.appendChild(imgEl);

            //create span element to hold hero name
            var heroNameEl = document.createElement("span");
            heroNameEl.setAttribute("class", "hero-name-btn");
            heroNameEl.classList = "hero-name-btn font-beba is-size-5"
            heroNameEl.textContent = comicTitle;

            //append to container
            heroResultEl.appendChild(imgContainerEl);
            heroResultEl.appendChild(heroNameEl);


            //append container to the dom
            comicEl.appendChild(heroResultEl);
        }
    }
    $("#hero-img").attr("src", characterImg + "/portrait_uncanny.jpg");
    $("#hero-bio").text(characterBio);
    $("#character-name").text(characterName);
};

getMarvelData();