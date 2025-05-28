import { games, genresTree } from './data.js';

function loadGenres() {
    const container = document.getElementById('genre-filters');
    genresTree.children.forEach(genre => {
        const button = document.createElement('button');
        button.textContent = genre.name;
        button.onclick = () => filterByGenre(genre.name);
        container.appendChild(button);
    });
}

function filterByGenre(genre) {
    const filteredGames = games.filter(game => game.genre === genre);
    renderGames(filteredGames);
}

function renderGames(gamesList) {
    const container = document.getElementById('games-list');
    container.innerHTML = gamesList.map(game => `
        <div class="game-card">
            <h3>${game.name}</h3>
            <p>Género: ${game.genre} | Puntuación: ${game.score}</p>
        </div>
    `).join('');
}

loadGenres();
renderGames(games); // Mostrar todos los juegos al inicio