// Lightbox: clica una foto i s'obre al centre amb fons fosc.
// Es reutilitza a resultats.html i fotos.html.
(function () {
  function ensureLightbox() {
    let lb = document.getElementById("lightbox");
    if (lb) return lb;
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.innerHTML =
      '<img id="lightbox-img" alt="Foto ampliada">' +
      '<button id="lightbox-tancar" aria-label="Tancar">✕</button>';
    document.body.appendChild(lb);
    lb.addEventListener("click", function (e) {
      if (e.target.id === "lightbox-tancar" || e.target.id === "lightbox") close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    return lb;
  }

  function open(src, alt) {
    const lb = ensureLightbox();
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox-img").alt = alt || "";
    lb.classList.add("obert");
    document.body.style.overflow = "hidden";
  }
  function close() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.classList.remove("obert");
    document.getElementById("lightbox-img").src = "";
    document.body.style.overflow = "";
  }

  // Exposar global
  window.lightbox = { open: open, close: close };

  // Enganxar a totes les fotos amb data-lightbox
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-lightbox]").forEach(function (img) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        open(img.src, img.alt);
      });
    });
  });
})();