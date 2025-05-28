// Variables globales
let juegosFiltrados = [...videojuegos];

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarVideojuegos(juegosFiltrados);
    initFiltros();
});

// Mostrar videojuegos en el contenedor
function mostrarVideojuegos(juegos) {
    const contenedor = document.getElementById("juegos-container");
    if (!contenedor) return;

    if (juegos.length === 0) {
        contenedor.innerHTML = `<p class="no-results">No se encontraron juegos. ¡Prueba con otro filtro!</p>`;
        return;
    }

    contenedor.innerHTML = juegos.map(juego => `
        <div class="tarjeta">
            <h3>${juego.nombre}</h3>
            <p><strong>Género:</strong> ${juego.genero}</p>
            <p><strong>Año:</strong> ${juego.año}</p>
            <p><strong>Puntuación:</strong> ${juego.puntuacion}/10</p>
        </div>
    `).join("");
}

// Inicializar filtros y eventos
function initFiltros() {
    const buscador = document.getElementById("buscador");
    const filtroGenero = document.getElementById("filtro-genero");
    const btnOrdenarAnio = document.getElementById("btn-ordenar-anio");
    const btnOrdenarPuntuacion = document.getElementById("btn-ordenar-puntuacion");
    const btnReset = document.getElementById("btn-reset");
    const yearSlider = document.getElementById("year-range");
    const yearValue = document.getElementById("year-value");
    const themeSwitch = document.getElementById("theme-switch");

    // Búsqueda en tiempo real
    if (buscador) {
        buscador.addEventListener("input", (e) => {
            const texto = e.target.value.toLowerCase();
            juegosFiltrados = videojuegos.filter(juego => 
                juego.nombre.toLowerCase().includes(texto) ||
                juego.genero.toLowerCase().includes(texto)
            );
            aplicarFiltrosAdicionales();
        });
    }

    // Filtro por género (dropdown)
    if (filtroGenero) {
        const generos = [...new Set(videojuegos.map(juego => juego.genero))];
        filtroGenero.innerHTML = `
            <option value="todos">Todos los géneros</option>
            ${generos.map(genero => `<option value="${genero}">${genero}</option>`).join("")}
        `;

        filtroGenero.addEventListener("change", (e) => {
            aplicarFiltrosAdicionales();
        });
    }

    // Slider de años
    if (yearSlider && yearValue) {
        yearSlider.addEventListener("input", (e) => {
            yearValue.textContent = `2011-${e.target.value}`;
            aplicarFiltrosAdicionales();
        });
    }

    // Ordenar por año
    if (btnOrdenarAnio) {
        btnOrdenarAnio.addEventListener("click", () => {
            juegosFiltrados.sort((a, b) => b.año - a.año);
            mostrarVideojuegos(juegosFiltrados);
        });
    }

    // Ordenar por puntuación
    if (btnOrdenarPuntuacion) {
        btnOrdenarPuntuacion.addEventListener("click", () => {
            juegosFiltrados.sort((a, b) => b.puntuacion - a.puntuacion);
            mostrarVideojuegos(juegosFiltrados);
        });
    }

    // Botón Reset
    if (btnReset) {
        btnReset.addEventListener("click", () => {
            juegosFiltrados = [...videojuegos];
            mostrarVideojuegos(juegosFiltrados);
            if (buscador) buscador.value = "";
            if (filtroGenero) filtroGenero.value = "todos";
            if (yearSlider) {
                yearSlider.value = 2023;
                yearValue.textContent = "2011-2023";
            }
        });
    }

    // Toggle modo claro/oscuro
    if (themeSwitch) {
        themeSwitch.addEventListener("change", (e) => {
            document.body.classList.toggle("light-mode", e.target.checked);
            localStorage.setItem("theme", e.target.checked ? "light" : "dark");
        });

        // Cargar tema guardado
        const savedTheme = localStorage.getItem("theme") || "dark";
        themeSwitch.checked = savedTheme === "light";
        document.body.classList.toggle("light-mode", themeSwitch.checked);
    }
}

// Aplicar filtros combinados (búsqueda, género y año)
function aplicarFiltrosAdicionales() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const generoSeleccionado = document.getElementById("filtro-genero").value;
    const yearMax = parseInt(document.getElementById("year-range").value);

    juegosFiltrados = videojuegos.filter(juego => {
        const cumpleTexto = texto === "" || 
            juego.nombre.toLowerCase().includes(texto) || 
            juego.genero.toLowerCase().includes(texto);
        const cumpleGenero = generoSeleccionado === "todos" || juego.genero === generoSeleccionado;
        const cumpleAnio = juego.año <= yearMax;
        return cumpleTexto && cumpleGenero && cumpleAnio;
    });

    mostrarVideojuegos(juegosFiltrados);
}