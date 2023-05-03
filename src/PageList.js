const API_KEY = 'ed4a05b7bfa94445bf1c2b2e3df85fbd';

const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

//FONCTION SEARCH----------------------
const performSearch = (searchTerm) => {
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Call a function to display the search results on the page
      displayResults(data.results);
    })
    .catch((error) => {
      console.error(error);
      // Handle any errors that occur during the search
    });
};

    const searchForm = document.querySelector('#search-form');

    searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    const searchTerm = document.querySelector('#search-input').value;
    if (searchTerm) {
      // Call a function to perform the search using the API, passing the search term as an argument
      performSearch(searchTerm);
}
});

//FIN DE LA FONCTION SEARCH----------------------

const displayResults = (articles) => {
  const resultsContent = articles.map((article) => (
    `<div class="cardGame col-md-5">
      <h2>${article.name}</h2>
      <h2>sortie : ${article.released}</h2>
      <a href="#pagedetail/${article.id}">
        <img class="game-img" src="${article.background_image}" alt="${article.name}">
      </a>
    </div>`
  ));

  const resultsContainer = document.querySelector('.page-list .articles');
  resultsContainer.innerHTML = `<div class="justify-content-center row row-cols-md-4 g-4">
  ${resultsContent.join("\n")}
  </div>`;};

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };
    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles container">Loading...</div>
      </section>
     
    `;

    preparePage();
  };

  render();
};