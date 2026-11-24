/* =====================================================
   Cuenta regresiva a la próxima puerta.
   Usa lo que ya existe en script.js: puedeAbrir(), ANIO y MODO_PRUEBA.
   Va en un archivo aparte para no tocar tu script.js.
   ===================================================== */
(function () {
  const caja = document.getElementById("proxima");
  const puertas = document.querySelectorAll("#calendario .puerta");
  if (!caja) return;

  // 5 -> "05" (para que el reloj se vea 07:05:09)
  const dos = (x) => String(x).padStart(2, "0");

  function actualizar() {
    // 1) Desbloquear en vivo las puertas cuyo día ya llegó (sin recargar)
    puertas.forEach((p, i) => {
      if (puedeAbrir(i + 1)) p.classList.remove("bloqueada");
    });

    // 2) Buscar la primera puerta que sigue cerrada
    let siguiente = 0;
    for (let n = 1; n <= puertas.length; n++) {
      if (!puedeAbrir(n)) { siguiente = n; break; }
    }
    if (!siguiente) {
      caja.textContent = MODO_PRUEBA
        ? "🧪 Modo prueba: todas las puertas abiertas"
        : "🎁 ¡Ya puedes abrir todas las puertas!";
      return;
    }

    // 3) Tiempo que falta para las 00:00 del día de esa puerta
    // (mes 11 = diciembre, porque en JavaScript los meses empiezan en 0)
    const faltan = new Date(ANIO, 11, siguiente) - new Date();
    const d = Math.floor(faltan / 86400000);
    const h = Math.floor(faltan / 3600000) % 24;
    const m = Math.floor(faltan / 60000) % 60;
    const s = Math.floor(faltan / 1000) % 60;

    caja.textContent =
      `🔔 La puerta ${siguiente} se abre en ${d > 0 ? d + " d " : ""}${dos(h)}:${dos(m)}:${dos(s)}`;
  }

  actualizar();
  setInterval(actualizar, 1000);   // se actualiza cada segundo
})();