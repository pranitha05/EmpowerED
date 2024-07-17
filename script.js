document.addEventListener('DOMContentLoaded', () => {
    // Initialize Right Lottie animation
    const lottieContainer = document.getElementById('right-lottie-container');
    const animation = lottie.loadAnimation({
        container: lottieContainer, 
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './animation/animation.json' 
        
    });

    // Initialize Left Lottie animation
    const leftLottieAnimation = bodymovin.loadAnimation({
        container: document.getElementById('left-lottie-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './animation/animation.json' 
    });


    const searchInput = document.getElementById('search-input');
    const clearInput = document.getElementById('clear-button');
    const gamesGrid = document.getElementById('games-grid');
    const categoryButtons = document.querySelectorAll('.categories button');
    const playButtons = document.querySelectorAll('.play-button');

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

    clearInput.addEventListener('click', function() {
        document.getElementById('search-input').value = '';
    });


    /**
     * Event listener setup for Play buttons.
     * Redirects the user to a specific game page based on the game title when a Play button is clicked.
     * Retrieves the game title from the data-game-title attribute of the clicked button,
     * encodes it for URL compatibility, and navigates the user to play-game.html with the gameTitle query parameter.
     * This action occurs in the same browser tab, not opening a new tab.
     */
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gameTitle = button.getAttribute('data-game-title');
            window.location.href = `play-game.html?gameTitle=${encodeURIComponent(gameTitle)}`;
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
