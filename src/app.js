/* eslint-disable */
import "bootstrap";
import "./style.css";

document.addEventListener("DOMContentLoaded", function() {
  let tiempoRestante = 10;
  let temporizador;

  function generarNuevaCarta() {
    const valorCarta = document.getElementById("valorCarta");
    const palos = ["hearts", "diamonds", "clubs", "spades"];
    const valores = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "K",
      "Q",
      "J"
    ];
    const paloAleatorio = palos[Math.floor(Math.random() * palos.length)];
    const valorAleatorio = valores[Math.floor(Math.random() * valores.length)];

    const paloImagen = document.getElementById("paloImagen");
    const paloImagenReverse = document.getElementById("paloImagenReverse");

    paloImagen.src = `./images/${paloAleatorio}.png`;
    paloImagenReverse.src = `./images/${paloAleatorio}.png`;

    document.getElementById("valorCarta").innerHTML = valorAleatorio;

    if (paloAleatorio === "hearts" || paloAleatorio === "diamonds") {
      valorCarta.style.color = "#da0037";
    } else {
      valorCarta.style.color = "";
    }

    reiniciarTemporizador();
  }

  function reiniciarTemporizador() {
    if (temporizador) {
      clearInterval(temporizador);
    }

    tiempoRestante = 10;
    actualizarTemporizador();

    temporizador = setInterval(function() {
      tiempoRestante--;

      actualizarTemporizador();

      if (tiempoRestante <= 0) {
        generarNuevaCarta();
      }
    }, 1000);
  }

  function actualizarTemporizador() {
    document.getElementById("countdown").textContent = formatTiempo(
      tiempoRestante
    );
  }

  function formatTiempo(tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    return `${String(minutos).padStart(
      2,
      "0"
    )}:${String(segundos).padStart(2, "0")}`;
  }

  reiniciarTemporizador();

  document
    .getElementById("contenedorBotonNuevaCarta")
    .addEventListener("click", function() {
      generarNuevaCarta();
    });

  document
    .getElementById("cambiarTamanio")
    .addEventListener("click", function() {
      const widthInput = parseInt(document.getElementById("widthInput").value);
      const heightInput = parseInt(
        document.getElementById("heightInput").value
      );

      const minWidth = 200;
      const minHeight = 250;

      const newWidth = Math.max(widthInput, minWidth);
      const newHeight = Math.max(heightInput, minHeight);

      if (
        isNaN(widthInput) ||
        isNaN(heightInput) ||
        newWidth !== parseInt(widthInput) ||
        newHeight !== parseInt(heightInput)
      ) {
        alert("Please enter valid numbers for width and height.");
      } else if (widthInput < minWidth || heightInput < minHeight) {
        alert(
          `Allowed sizes: Minimum width: ${minWidth}px, minimum height: ${minHeight}px`
        );
      }

      const carta = document.getElementById("carta");
      carta.style.width = newWidth + "px";
      carta.style.height = newHeight + "px";

      document.getElementById("widthInput").value = newWidth;
      document.getElementById("heightInput").value = newHeight;
    });

  generarNuevaCarta();
});
