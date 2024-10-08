document.addEventListener('DOMContentLoaded', () => {
    // Initialize Right Lottie animation
    const lottieContainerRight = document.getElementById('right-lottie-container');
    if (lottieContainerRight) {
        lottie.loadAnimation({
            container: lottieContainerRight, 
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './animation/animation.json' 
        });
    }

    // Initialize Left Lottie animation
    const lottieContainerLeft = document.getElementById('left-lottie-container');
    if (lottieContainerLeft) {
        bodymovin.loadAnimation({
            container: lottieContainerLeft,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './animation/animation.json' 
        });
    }

    // Main page functionality
    if (document.body.id === 'main-page') {
        const searchInput = document.getElementById('search-input');
        const clearInput = document.getElementById('clear-button');
        const gamesGrid = document.getElementById('games-grid');
        const categoryButtons = document.querySelectorAll('.categories button');
        const playButtons = document.querySelectorAll('.play-button');


        // Figure out why did it search before i click enter
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim() !== '') {
                clearInput.classList.add('show');
            } else {
                clearInput.classList.remove('show');
            }
            // filterGames(searchInput.value.toLowerCase()); This listener currently triggers the search as the user types, 
            // which is not what I want since I only want to search on Enter key press.
        });

        // Modify this event listener to include focusing back on the input after clearing
        clearInput.addEventListener('click', () => {
            searchInput.value = '';
            clearInput.classList.remove('show');
            searchInput.focus(); // Re-focus the input after clearing
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

        clearInput.addEventListener('click', () => {
            searchInput.value = '';
            filterGames('');
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
                card.style.display = title.includes(query) ? 'block' : 'none';
            });
        }

        function filterGamesByCategory(category) {
            const gameCards = gamesGrid.getElementsByClassName('game-card');
            Array.from(gameCards).forEach(card => {
                card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? 'block' : 'none';
            });
        }
    }

    // Game display page functionality
    if (document.body.id === 'play-game-page') {
        const iframe = document.getElementById('game-frame');
        const urlParams = new URLSearchParams(window.location.search);
        const gameTitle = urlParams.get('gameTitle');

        if (iframe) {

            // Hide all game info sections initially
            const gameInfoSections = document.querySelectorAll('.game-info');
            gameInfoSections.forEach(section => section.style.display = 'none');

            switch (gameTitle) {
                case 'Chess':
                    iframe.src = 'https://cdn.htmlgames.com/Chess/';
                    document.getElementById('game-chess').style.display = 'block';
                    break;
                    
                case 'Simmon':
                    iframe.src = 'https://cdn.htmlgames.com/SimonSays/';
                    document.getElementById('game-simon').style.display = 'block';
                    break;

                case 'Speed-Math':
                    iframe.src = 'https://cdn.htmlgames.com/RapidMath/';
                    document.getElementById('game-speed-math').style.display = 'block';
                    break;

                case 'Array':
                    iframe.src = 'https://cdn.htmlgames.com/array-game/';
                    document.getElementById('game-array').style.display = 'block';
                    break;

                case 'Remember':
                    iframe.src = 'https://cdn.htmlgames.com/DailyWordSearch/';
                    document.getElementById('game-remember').style.display = 'block';
                    break;

                case 'Letter':
                    iframe.src = 'https://cdn.htmlgames.com/LetterTrain/';
                    document.getElementById('game-letter').style.display = 'block';
                    break;

                case 'Number-Search':
                    iframe.src = 'https://cdn.htmlgames.com/NumberSearch/';
                    document.getElementById('game-number-search').style.display = 'block';
                    break;
                    
                case 'Classic-packman':
                    iframe.src = 'https://cdn.htmlgames.com/ClassicPac/';
                    document.getElementById('game-classic-packman').style.display = 'block';
                    break;

                default:
                    // Default or error handling
                    iframe.src = 'about:blank'; 
                    break;
            }
        } else {
            console.error('Page is not found.');
        }
    }
});
