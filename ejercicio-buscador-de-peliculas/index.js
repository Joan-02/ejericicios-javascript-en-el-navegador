const peliculas = [
    {
      titulo: "El Padrino",
      año: 1972,
    },
    {
      titulo: "Titanic",
      año: 1997,
    },
    {
      titulo: "El Señor de los Anillos: La Comunidad del Anillo",
      año: 2001,
    },
    {
      titulo: "Interestelar",
      año: 2014,
    },
    {
      titulo: "Matrix",
      año: 1999,
    },
    {
      titulo: "El Rey León",
      año: 1994,
    },
    {
      titulo: "Forrest Gump",
      año: 1994,
    },
    {
      titulo: "El Caballero Oscuro",
      año: 2008,
    }
];

function mostrarPeliculas(peliculas) {
    const listaPeliculas = document.querySelector('#resultados');
    listaPeliculas.innerHTML = '';

    peliculas.forEach((pelicula) => {
        const li = document.createElement('li');
        li.className = 'tituloPelicula';
        li.innerText = `${pelicula.titulo} ${pelicula.año}`;
        listaPeliculas.appendChild(li);
    })
};

function filtrarPeliculas() {
    const inputBuscador = document.querySelector("#buscarPelicula");
    const textoBuscado = inputBuscador.value.toLowerCase();

    console.log("Texto buscado: ", textoBuscado); // Muestra lo que está buscando el usuario

    const peliculasFiltradas = peliculas.filter((pelicula) => {
        const tituloPelicula = pelicula.titulo.toLowerCase();
        console.log("Comparando: ", tituloPelicula, " con ", textoBuscado); // Muestra cada título comparado con el texto buscado

        return tituloPelicula.includes(textoBuscado); // Compara si el título contiene el texto buscado
    });

    console.log("Películas encontradas: ", peliculasFiltradas); // Muestra las películas que coinciden
};

mostrarPeliculas(peliculas);