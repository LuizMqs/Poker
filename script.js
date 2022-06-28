let cartas = [];
let novaCarta = new Object();
let cartasJogador = [];
let achouAlgumEvento = false;

function geradorCopas() {
  let contador = 2;

  while (contador <= 14) {
    novaCarta = {
      valor: contador,
      naipe: "copas",
      imagem: `./imagens/${contador}H`,
    };

    cartas.push(novaCarta);
    contador++;
  }
}

function geradorOuro() {
  let contador = 2;

  while (contador <= 14) {
    novaCarta = {
      valor: contador,
      naipe: "ouro",
      imagem: `./imagens/${contador}D`,
    };

    cartas.push(novaCarta);
    contador++;
  }
}

function geradorPaus() {
  let contador = 2;

  while (contador <= 14) {
    novaCarta = {
      valor: contador,
      naipe: "paus",
      imagem: `./imagens/${contador}C`,
    };

    cartas.push(novaCarta);
    contador++;
  }
}

function geradorEspada() {
  let contador = 2;

  while (contador <= 14) {
    novaCarta = {
      valor: contador,
      naipe: "espada",
      imagem: `./imagens/${contador}S`,
    };

    cartas.push(novaCarta);
    contador++;
  }
}

geradorCopas();
geradorOuro();
geradorPaus();
geradorEspada();

function sortear() {
  cartas = cartas.sort(() => Math.random() - 0.5);
}

function mostrarCartas() {
  sortear();

  for (let i = 1; i <= 5; i++) {
    document.getElementById("cartas").innerHTML += `<img src="${cartas[0].imagem
      .replace("10", "T")
      .replace("11", "J")
      .replace("12", "Q")
      .replace("13", "K")
      .replace("14", "A")}.svg" />`;
    cartasJogador.push(cartas.shift());
  }
  resultado();
}

function verificarSequencia() {
  if (
    cartasJogador[0].valor + 1 == cartasJogador[1].valor &&
    cartasJogador[1].valor + 1 == cartasJogador[2].valor &&
    cartasJogador[2].valor + 1 == cartasJogador[3].valor &&
    cartasJogador[3].valor + 1 == cartasJogador[4].valor
  ) {
    if (!verificarStraightFlush())
      document.getElementById("resultado").innerHTML = "Sequência";
  }
  achouAlgumEvento = true;
}

function verificarStraightFlush() {
  if (
    cartasJogador[0].naipe == cartasJogador[1].naipe &&
    cartasJogador[0].naipe == cartasJogador[2].naipe &&
    cartasJogador[0].naipe == cartasJogador[3].naipe &&
    cartasJogador[0].naipe == cartasJogador[4].naipe
  ) {
    document.getElementById("resultado").innerHTML = "Straight Flush";
    return true;
  } else {
    return false;
  }
}

function verificarCartasIguais() {
  let cont = 1,
    carta = { valor: 0 },
    par = 0,
    trinca = 0;

  cartasJogador.forEach((element) => {
    if (element.valor == carta.valor) {
      cont++;
      achouAlgumEvento = true;

      if (cont == 2) par++;
      else if (cont == 3) trinca++;
      else if (cont == 4)
        document.getElementById("resultado").innerHTML = "Quadra";
    } else {
      cont = 1;
      carta = element;
    }
  });

  if (par == 2) {
    document.getElementById("resultado").innerHTML = "Dois pares";
  }

  if (par == 1) {
    document.getElementById("resultado").innerHTML = "Par";
  }

  if (trinca == 1 && par == 1) {
    document.getElementById("resultado").innerHTML = "Full House";
  }
}

function resultado() {
  cartasJogador = cartasJogador.sort((cartaA, cartaB) => {
    if (cartaA.valor > cartaB.valor) return 1;
    else if (cartaA.valor < cartaB.valor) return -1;
    else return 0;
  });

  verificarCartasIguais();

  if (achouAlgumEvento == false) {
    document.getElementById("resultado").innerHTML = "Nada";
  }

  verificarSequencia();
}
