const Home = (argument = '') => {
    console.log('Home', argument);
  };

  const Button = (text) => {
    return `<button class="awesome-button">${text}</button>`;
  };




const displaySearchResults = (results) => {
  const resultsList = document.querySelector('#results');
  resultsList.innerHTML = ''; // Clear the previous search results
  if (results.length > 0) {
    // Display each search result as a list item
    results.forEach((result) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <a href="#pagedetail/${result.id}">
          <h3>${result.name}</h3>
          <p>Released: ${result.released}</p>
          <img class="game-img" src="${result.background_image}" >
         
        </a>
      `;
      resultsList.appendChild(listItem);
    });
  } else {
    resultsList.innerHTML = '<li>No results found.</li>';
  }
};






