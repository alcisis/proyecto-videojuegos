// Array de juegos
export const games = [
    { id: 1, name: "The Witcher 3", genre: "RPG", score: 9.7 },
    { id: 2, name: "Cyberpunk 2077", genre: "RPG", score: 7.2 },
    { id: 3, name: "Doom Eternal", genre: "FPS", score: 8.5 }
];

// Árbol de géneros
export const genresTree = {
    name: "Géneros",
    children: [
        { name: "RPG", children: [] },
        { name: "FPS", children: [] }
    ]
};