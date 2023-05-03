const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, released, description, background_image, metacritic, platforms, clip, stores } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.metacritic span").innerHTML = metacritic;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector(".background_image").src = background_image;

      // loop through platforms array and create HTML for each object
      let platformsHTML = '';
      platforms.forEach((platform) => {
        platformsHTML += `<span class="platform"> ${platform.platform.name}</span>`;
      });
      articleDOM.querySelector(".platforms").innerHTML = platformsHTML;

      // loop through platforms array and create HTML for each object
      const storesHTML = stores.map(gameStore => 
        `<a href="http://${gameStore.store.domain}" target="_blank">${gameStore.store.name}</a>`); //target_blank ouvre l'élément dans une nouvelle fenêtre, self dans la même
        articleDOM.querySelector("p.stores span").innerHTML = storesHTML;

           // fetch videos for the game
 fetch(`https://api.rawg.io/api/games/${gameData.id}/movies?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          // create HTML for each video
          let videosHTML = '';
          responseData.results.forEach((video) => {
            const { name, data } = video;
            const videoURL = data.max ? data.max : data.high; // get the highest quality video available
            videosHTML += `
              <div class="video">
                <h2>${name}</h2>
                <iframe src="${videoURL}" frameborder="0" allowfullscreen style="height:200px; width:400px;"></iframe>
                </div>
            `;
          });
          articleDOM.querySelector(".videos").innerHTML = videosHTML;
        }); 
      };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        }); 
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
      <div class="article">
      <div class="left-column ">
        <h1 class="title"></h1>
        <p class="release-date">Release date : <span></span></p>
        <p class="metacritic">Metacritic score: <span></span></p>
        <p class="description"></p>
        <p class="platforms"></p>
        <p class="stores">Stores: <span></span></p>
      </div>
      <div class="right-column col-md-3 margin-right:100px ">
        <img class="background_image"/>
        <div class="videos"></div>
      </div>
    </div>

      </section>
    `;

    preparePage();
  };

  render();
};
