
// BASE DE DATOS DE PELÍCULAS

const peliculas = [
    {
        nombre: "Interestelar",
        genero: "Ciencia ficción",
        imagen: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        nombre: "El origen",
        genero: "Ciencia ficción",
        imagen: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
    },
    {
        nombre: "Harry Potter",
        genero: "Fantasía",
        imagen: "https://image.tmdb.org/t/p/w500/1stUIsjawROZxjiCMtqqXqgfZWC.jpg"
    },
    {
        nombre: "Coco",
        genero: "Animación",
        imagen: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"
    },
    {
        nombre: "Avatar",
        genero: "Ciencia ficción",
        imagen: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
    },
    {
        nombre: "Titanic",
        genero: "Drama",
        imagen: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
    },
    {
        nombre: "Spider-Man",
        genero: "Acción",
        imagen: "https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg"
    }
];

// DATOS GUARDADOS

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
let nombreUsuario = localStorage.getItem("nombreUsuario") || "Cinéfilo";

let puntos = 0;
let indicePregunta = 0;
let respondida = false;


// NAVEGACIÓN

function irA(seccion) {
    document.getElementById(seccion).scrollIntoView({
        behavior: "smooth"
    });
}


// MOSTRAR PELÍCULAS

function mostrarPeliculas(lista = peliculas) {
    const contenedor = document.getElementById("peliculas");
    contenedor.innerHTML = "";

    lista.forEach(pelicula => {
        const guardada = favoritos.includes(pelicula.nombre);

        const tarjeta = document.createElement("div");
        tarjeta.className = "card";

        const imagen = document.createElement("img");
        imagen.src = pelicula.imagen;
        imagen.alt = pelicula.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = pelicula.nombre;

        const genero = document.createElement("p");
        genero.textContent = pelicula.genero;

        const boton = document.createElement("button");
        boton.textContent = guardada ? "★ Guardada" : "☆ Agregar a favoritos";

        boton.onclick = () => guardarFavorito(pelicula.nombre);

        tarjeta.append(imagen, titulo, genero, boton);
        contenedor.appendChild(tarjeta);
    });
}


// BUSCAR Y FILTRAR

function filtrar() {
    const texto = document.getElementById("buscar").value.toLowerCase();
    const genero = document.getElementById("genero").value;

    const resultado = peliculas.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        const coincideGenero = genero === "Todos" || p.genero === genero;

        return coincideNombre && coincideGenero;
    });

    mostrarPeliculas(resultado);
}


// FAVORITOS

function guardarFavorito(nombre) {
    if (favoritos.includes(nombre)) {
        favoritos = favoritos.filter(p => p !== nombre);
    } else {
        favoritos.push(nombre);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarPeliculas();
    mostrarFavoritos();
    actualizarPerfil();
}


function mostrarFavoritos() {
    const contenedor = document.getElementById("listaFavoritos");
    contenedor.innerHTML = "";

    if (favoritos.length === 0) {
        contenedor.textContent = "Todavía no tienes películas favoritas.";
        return;
    }

    favoritos.forEach(nombre => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = "🎬 " + nombre;

        const boton = document.createElement("button");
        boton.textContent = "Eliminar de favoritos";

        boton.onclick = () => guardarFavorito(nombre);

        tarjeta.append(titulo, boton);
        contenedor.appendChild(tarjeta);
    });
}


// PUBLICACIONES

function publicar() {
    const nombre = document.getElementById("nombre").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const opinion = document.getElementById("opinion").value.trim();
    const calificacion = document.getElementById("calificacion").value;

    if (!nombre || !titulo || !opinion) {
        alert("Completa todos los campos.");
        return;
    }

    const nuevaPublicacion = {
        nombre,
        titulo,
        opinion,
        calificacion
    };

    publicaciones.unshift(nuevaPublicacion);

    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

    document.getElementById("nombre").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("opinion").value = "";

    mostrarPublicaciones();
}


function mostrarPublicaciones() {
    const contenedor = document.getElementById("publicaciones");
    contenedor.innerHTML = "";

    publicaciones.forEach(p => {
        const post = document.createElement("div");
        post.className = "post";

        const usuario = document.createElement("strong");
        usuario.textContent = "👤 " + p.nombre;

        const pelicula = document.createElement("h3");
        pelicula.textContent = "🎬 " + p.titulo;

        const estrellas = document.createElement("p");
        estrellas.textContent = "⭐".repeat(Number(p.calificacion));

        const opinion = document.createElement("p");
        opinion.textContent = p.opinion;

        post.append(usuario, pelicula, estrellas, opinion);
        contenedor.appendChild(post);
    });
}


// PERFIL

function cambiarNombre() {
    const nuevoNombre = prompt("Escribe tu nuevo nombre:", nombreUsuario);

    if (nuevoNombre && nuevoNombre.trim()) {
        nombreUsuario = nuevoNombre.trim();

        localStorage.setItem("nombreUsuario", nombreUsuario);

        actualizarPerfil();
    }
}


function actualizarPerfil() {
    document.getElementById("nombrePerfil").textContent = nombreUsuario;

    document.getElementById("totalFavoritos").textContent =
        favoritos.length + " películas favoritas";
}


// TRIVIA

const preguntas = [
    {
        pregunta: "¿Qué película tiene un personaje llamado Jack Sparrow?",
        respuestas: ["Titanic", "Piratas del Caribe", "Avatar"],
        correcta: 1
    },
    {
        pregunta: "¿Cómo se llama el reino de Elsa?",
        respuestas: ["Arendelle", "Narnia", "Gotham"],
        correcta: 0
    },
    {
        pregunta: "¿Quién es conocido como el caballero de la noche?",
        respuestas: ["Superman", "Iron Man", "Batman"],
        correcta: 2
    },
    {
        pregunta: "¿En qué película aparece un anillo que debe destruirse?",
        respuestas: ["El señor de los anillos", "Harry Potter", "Star Wars"],
        correcta: 0
    }
];


function mostrarPregunta() {
    const pregunta = preguntas[indicePregunta];

    document.getElementById("pregunta").textContent = pregunta.pregunta;

    document.getElementById("contador").textContent =
        "Pregunta " + (indicePregunta + 1) + " de " + preguntas.length;

    document.getElementById("resultado").textContent = "";

    document.getElementById("respuestas").innerHTML = "";

    respondida = false;

    pregunta.respuestas.forEach((respuesta, indice) => {
        const boton = document.createElement("button");

        boton.textContent = respuesta;

        boton.onclick = () => comprobarRespuesta(indice);

        document.getElementById("respuestas").appendChild(boton);
    });
}


function comprobarRespuesta(indice) {
    if (respondida) return;

    respondida = true;

    const correcta = preguntas[indicePregunta].correcta;

    if (indice === correcta) {
        puntos++;
        document.getElementById("resultado").textContent =
            "¡Respuesta correcta! 🎉";
    } else {
        document.getElementById("resultado").textContent =
            "Respuesta incorrecta. ¡Sigue intentando!";
    }

    document.getElementById("puntuacion").textContent =
        "Puntos: " + puntos;

}


function siguientePregunta() {
    if (indicePregunta === preguntas.length - 1) {
        alert("¡Terminaste la trivia! Tu puntuación fue: " + puntos);
        indicePregunta = 0;
        puntos = 0;
        document.getElementById("puntuacion").textContent = "Puntos: 0";
    } else {
        indicePregunta++;
    }

    mostrarPregunta();
}


// INICIAR PÁGINA

mostrarPeliculas();
mostrarFavoritos();
mostrarPublicaciones();
actualizarPerfil();
mostrarPregunta();
