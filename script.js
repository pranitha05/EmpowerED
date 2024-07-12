document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const gamesGrid = document.getElementById('games-grid');
  const categoryButtons = document.querySelectorAll('.categories button');
  const playButtons = document.querySelectorAll('.play-button');

  searchButton.addEventListener('click', () => {
      const query = searchInput.value.toLowerCase();
      filterGames(query);
  });

  searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
          const query = searchInput.value.toLowerCase();
          filterGames(query);
      }
  });

  categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
          const category = button.getAttribute('data-category');
          filterGamesByCategory(category);
      });
  });

  playButtons.forEach(button => {
      button.addEventListener('click', () => {
          alert('Game is loading...');
      });
  });

  function filterGames(query) {
      const gameCards = gamesGrid.getElementsByClassName('game-card');
      Array.from(gameCards).forEach(card => {
          const title = card.querySelector('.game-title').innerText.toLowerCase();
          if (title.includes(query)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  }

  function filterGamesByCategory(category) {
      const gameCards = gamesGrid.getElementsByClassName('game-card');
      Array.from(gameCards).forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  }
});
