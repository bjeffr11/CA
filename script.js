/* =====================================================
   1. CONFIGURACIÓN: lo que tú personalizas
   ===================================================== */
const NOMBRE = "Princesita bonita";   // 👈 cambia por su nombre
const ANIO = 2026;           // año del calendario

// Modo prueba: abre el calendario con  index.html?test=1
// Así puedes ver todas las puertas antes de diciembre.
const MODO_PRUEBA = new URLSearchParams(location.search).has("test");

/* =====================================================
   2. CONTENIDO: 24 días. Edita libremente.
   spotify: link directo de la canción (opcional)
   cancion: texto para buscar en Spotify si no hay link (opcional)
   Los de Latin Mafia llevan solo el artista: reemplázalos con
   el nombre exacto de SUS canciones favoritas.
   ===================================================== */
const DIAS = [
  { emoji: "🤗", titulo: "Cupón de bienvenida", texto: "Empieza la cuenta regresiva y tu primer regalo es un cupón válido por besos y abrazos. Canjeable cuando quieras, las veces que quieras, y sin fecha de vencimiento. Quedan 23 sorpresas más.", cancion: "" },
  { emoji: "🎧", titulo: "Playlist para el corazoncito", texto: "Todas las canciones de amor cobraron sentido por vos.", spotify: "https://open.spotify.com/playlist/42male8m1OA6Kddw56iuiJ?si=dd41fc782aad4b97" },
  { emoji: "💌", titulo: "Mensaje", texto: "Si fueras una canción, serías cualquiera de nsqk porque nunca quiero que se acaben."},
  { emoji: "🍫", titulo: "Antojo", texto: "Cupón válido por un cafe helado preparado por mí."},
  { emoji: "🔥", titulo: "Noche de recuerdos", texto: "Debemos tomarnos muchas fotitos juntos", cancion: "" },
  { emoji: "🎄", titulo: "Plan", texto: "Cupón: una noche de ver películas navideñas bajo una manta. ", cancion: "" },
  { emoji: "💌", titulo: "Cartita", texto: "Gracias por todos los momentos bonitos que me das y por ser vos conmigo <3", cancion: "" },
  { emoji: "📸", titulo: "Recuerdo", texto: "Mándame la foto que más te guste de nosotros dos. La voy a guardar para siempre. (aun debemos actualizar muchas)", cancion: "" },
  { emoji: "💭", titulo: "Mi momento favorito", texto: "Este dia nos toca contarnos nuestro momento favorito juntos.", cancion: "" },
  { emoji: "👨‍🍳", titulo: "Dia de chefsitos", texto: "Nos debemos cocinar juntos tu comida favorita.", cancion: "" },
  { emoji: "☕", titulo: "Mensaje", texto: "Mi plan favorito de la semana sigue siendo cualquiera donde vos estés.", cancion: "" },
  { emoji: "🌟", titulo: "Latin Mafia", texto: "Hoy toca una canción de Latin Mafia que me recuerda mucho a vos y te la dedico.", spotify: "https://open.spotify.com/intl-es/track/6QvMHLFmp3sk707iQZhCfA?si=94eb548a40554e82" },
  { emoji: "🍪", titulo: "Receta", texto: "Cupón: hacemos galletas navideñas juntos, pero no te prometo no quemar más de la mitad JAJAJA.", cancion: "" },
  { emoji: "📍", titulo: "Un lugar para los dos", texto: "Un lugar donde queras que estemos los 2 solos, y tratamos de hacerlo realidad", cancion: "" },
  { emoji: "💬", titulo: "Pregunta", texto: "¿Cuál es el mejor concierto al que te gustaría que fuéramos juntos?", cancion: "" },
  { emoji: "🎅", titulo: "Reto", texto: "Mandame una foto con un gorro navideño o algo rojo. Mientras más exagerado, mejor.", cancion: "" },
  { emoji: "✨", titulo: "Mensaje", texto: "Gracias por hacerme sonreír sin hacer esfuerzo. Eso vale más que cualquier regalo.", cancion: "" },
  { emoji: "🌠", titulo: "Mensaje", texto: "No se como le haces para siempre ser tan increible y tan hermosa, sos muy especial para mi gracias por tanto te amo mucho <3.", cancion: "" },
  { emoji: "🍕", titulo: "Plan", texto: "Cupón válido por una cena donde vos elegis el lugar.", cancion: "" },
  { emoji: "🎶", titulo: "Latin Mafia", texto: "Hoy armamos juntos la playlist de nuestras canciones favoritas.", cancion: "" },
  { emoji: "🧣", titulo: "Mensaje", texto: "Si el frío llega, ya sabes quién te presta el abrazo.", cancion: "" },
  { emoji: "🎄", titulo: "Casi Navidad", texto: "Faltan solo tres días. Hoy te toca elegir un plan que hagamos juntos quien sabe y lo cumplimos antes que se acabe este.", cancion: "" },
  { emoji: "🌙", titulo: "Ya casiii", texto: "Mañana es Nochebuena, pero hoy te regalo esta canción para cerrar la noche.", cancion: "Bad Bunny Ojitos Lindos" },
  { emoji: "🎁", titulo: "¡Feliz Navidad!", texto: "Llegamos al final del calendario. Gracias por hacer de este diciembre uno de los mejores. Tu regalo final te lo doy en persona 😉", cancion: "" },
];

/* =====================================================
   3. LÓGICA
   ===================================================== */
const calendario = document.getElementById("calendario");
const ventana = document.getElementById("ventana");

// localStorage guarda en el navegador qué puertas ya abrió.
// JSON.parse convierte el texto guardado de vuelta a un arreglo.
const abiertas = JSON.parse(localStorage.getItem("adviento-abiertas") || "[]");

// ¿Ya se puede abrir la puerta n?
function puedeAbrir(n) {
  if (MODO_PRUEBA) return true;
  const hoy = new Date();
  if (hoy.getFullYear() > ANIO) return true;   // ya pasó el año
  if (hoy.getFullYear() < ANIO) return false;  // todavía no llega
  // En JavaScript los meses empiezan en 0, así que diciembre = 11
  return hoy.getMonth() === 11 && hoy.getDate() >= n;
}

// Crea las 24 puertitas
DIAS.forEach((dia, i) => {
  const n = i + 1; // el índice empieza en 0, el día en 1
  const boton = document.createElement("button");
  boton.className = "puerta";
  boton.setAttribute("aria-label", "Abrir el día " + n);
  // Detrás: el emoji del día. Encima: la hoja de la puerta (número + perilla)
  boton.innerHTML = `
    <span class="detras">${dia.emoji}</span>
    <span class="hoja"><span class="num">${n}</span><span class="pomo"></span></span>
  `;

  if (!puedeAbrir(n)) boton.classList.add("bloqueada");
  if (abiertas.includes(n)) boton.classList.add("abierta");

  boton.addEventListener("click", () => abrirPuerta(n, boton));
  calendario.appendChild(boton);
});

function abrirPuerta(n, boton) {
  if (!puedeAbrir(n)) {
    // Puerta bloqueada: sacudida y aviso
    boton.classList.add("tiembla");
    setTimeout(() => boton.classList.remove("tiembla"), 400);
    mostrar({ emoji: "🔒", titulo: "¡Ey, paciencia!", texto: `Esta puerta se abre el ${n} de diciembre. No se vale hacer trampa 😏`, cancion: "" });
    return;
  }

  // Guardar que ya la abrió
  if (!abiertas.includes(n)) {
    abiertas.push(n);
    localStorage.setItem("adviento-abiertas", JSON.stringify(abiertas));
  }
  boton.classList.add("abierta");
  mostrar(DIAS[n - 1]);
}

// Rellena la ventana emergente con el contenido del día
function mostrar(dia) {
  document.getElementById("emoji").textContent = dia.emoji;
  document.getElementById("titulo").textContent = dia.titulo;
  document.getElementById("texto").textContent = dia.texto;

  const enlace = document.getElementById("enlace");
  if (dia.spotify) {
    // Link directo a la canción, álbum o playlist
    enlace.href = dia.spotify;
    enlace.textContent = "🎵 Escuchar en Spotify";
  } else if (dia.cancion) {
    // Sin link directo: abre una búsqueda en Spotify con ese texto
    // encodeURIComponent arregla espacios y tildes para la URL
    enlace.href = "https://open.spotify.com/search/" + encodeURIComponent(dia.cancion);
    enlace.textContent = "🎵 Buscar en Spotify";
  } else {
    enlace.removeAttribute("href");
    enlace.textContent = "";
  }
  ventana.showModal();
}

document.getElementById("cerrar").addEventListener("click", () => ventana.close());
// Cerrar al hacer clic fuera de la ventana
ventana.addEventListener("click", (e) => { if (e.target === ventana) ventana.close(); });

/* ---------- Saludo y cuenta regresiva ---------- */
document.getElementById("saludo").textContent = `Para ti, ${NOMBRE} ❤️`;

const hoy = new Date();
const navidad = new Date(ANIO, 11, 25);
const dias = Math.ceil((navidad - hoy) / (1000 * 60 * 60 * 24));
document.getElementById("contador").textContent =
  dias > 0 ? `Faltan ${dias} días para Navidad` : "¡Feliz Navidad! 🎅";

/* ---------- Nieve ---------- */
const nieve = document.getElementById("nieve");
for (let i = 0; i < 40; i++) {
  const copo = document.createElement("span");
  copo.className = "copo";
  copo.textContent = "❄";
  copo.style.left = Math.random() * 100 + "vw";
  copo.style.fontSize = 10 + Math.random() * 18 + "px";
  copo.style.animationDuration = 6 + Math.random() * 8 + "s";
  copo.style.animationDelay = -Math.random() * 10 + "s";
  nieve.appendChild(copo);
}