const tests = [
  "EMF nivel 5",
  "Temperatura heladas",
  "Spiritbox",
  "Escritura Fantasma",
  "Orbes",
  "Huellas Dactilares",
  "DOTS",
];

const values = [
  [0, 0, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 0],
  [1, 1, 0, 1, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 1],
  [0, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 1, 1, 0],
];

/*
const ghosts = [
  "Ente",
  "Banshee",
  "Jinn",
  "Revenant",
  "Sombra",
  "Oni",
  "Espectro",
  "Pesadilla",
  "Demonio",
  "Yurei",
  "Polstergeist",
  "Espiritu",
  "Yokai",
  "Myling",
  "Goryo",
  "Hantu",
];
*/

const ghosts = {
"Ente": "Gran impacto en la cordura 'al verlo' / sacarle foto hara que desaparesca por un tiempo(no funciona en cazeria)",
"Benshee": "Solo ataca a 1 jugador hasta que lo mate / es debil al crucifujo(rango de 3m => 5m)",
"Jinn": "se mueve mas rapido mientras mas lejos este de su victima / no puede usar su habilidad con el tablero apagado(baja 25% de sanidad 5s despues de usar su habilidad)",
"Revenant": "Se mueve mucho mas rapido en cazeria(2x) / disminuye la velocidad si no ve a su victima(x0.5)",
"Sombra": "Es menos activo en presencia de 2 o mas jugadores / mientras mas jugadores esten juntos, tiene menos probabilidad de atacar",
"Oni": "Es activo cuando hay gente cerca y lanza objetos a gran velocidad / es facil de encontrar",
"Espectro": "Puede volar, casi no dejara rastro de pisadas y sonidos de pisadas son casi no existentes / tiene reaccion toxica con la sal",
"Pesadilla": "Aumenta la probabilidad de atacar en la oscuridad(apaga paneles e interruptor) / reduce la probabilidad de atacar cuando la luz esta encendida",
"Demonio": "Ataca mas que el resto de los fantasmas(sin motivo especifico) / la cordura no disminuye al usar la tabla de ouija",
"Yurei": "Disminuye notablemente la cordura cuando se manifiesta / marcar la habitacion con incienso la aleja del lugar",
"Poltergeist": "Puede mover mas de 1 objeto a la vez y tambien cerrar varias puertas a la vez(puede lanzar varios objetos a la vez y bajar la cordura si estas de espalda) / es inefectivo en un cuarto vacio",
"Espiritu": "No tienen fortalezas / usar incienso duplicara el tiempo que no atacara(90s => 180s)",
"Yokai": "Hablar cerca de un yokai aumentara su enojo y aumentara su probabilidad de atacar / mientras caza solo escuchara voces cercanas a el",
"Myling": "Es silencioso cuando caza / generan ruido paranormal con mayor frecuencia",
"Goryo": "Usualmente se mostrara en camara cuando no hay gente cerca / es raro verlos lejos de su lugar de muerte",
"Hantu": "Se mueve mas rapido en lugares frios(1.8m/s) / se mueve mas lento en lugares calidos (1m/s)"
}

const checkboxes = document.querySelectorAll("input[type=checkbox]");
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", function () {
    const elements = document.getElementById("myForm").elements;
    let arr = [];
    for (let i = 0; i < elements.length; i++) {
      let item = elements[i];
      arr.push(item.checked ? 1 : 0);
    }
    let y = arr.find(element => element > 0);
    if (y === undefined) {
      document.getElementById("phasmo");
      phasmo.innerHTML = "";
    }else{
      // console.log(arr)
      checkTests(arr, ghosts, values);
    }    
  });
}

const checkTests = (arr, ghosts, values) => {
  let tempG = Object.keys(ghosts);
  let tempV = [...values];
  let rem = [];
  let results = {};
  for (let x = 0; x < arr.length; x++) {
    if (arr[x] > 0) {
      for (let y = 0; y < tempV.length; y++) {
        if (tempV[y][x] != 1) {
          rem.push(y);
        }
      }
    }
  }
  rem = rem
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    )
    .sort((a, b) => a - b);
  rem.reverse().forEach((val) => {
    tempG.splice(val, 1);
    tempV.splice(val, 1);
  });
  // console.log(tempV, arr);

  tempV.forEach((val, index) => {
    idxs = compareArrays(arr, val);
    // console.log(idxs);
    idxs.forEach((value) => {
      // console.log(tempG[index])
      // console.log(tests[value]);
      if (results[tempG[index]] != undefined) {
        results[tempG[index]].push(tests[value]);
      } else {
        results[tempG[index]] = [tests[value]];
      }
    });
  });

  // let final = []
  // for (let result in results) {
  //   final.push(...results[result])
  // }
  // console.log(final.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []))

  const phasmo = document.getElementById("phasmo");
  phasmo.innerHTML = "";
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  tbl.className += "table table-dark";
  tbl.setAttribute("id", "myTable");
  for (let result in results) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("th");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    const text1 = document.createTextNode(`${result}`);
    const text2 = document.createTextNode(`${results[result]}`);
    const text3 = document.createTextNode(`${ghosts[result]}`);

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);

    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tblBody.appendChild(tr);
  }
  tbl.appendChild(tblBody);
  phasmo.appendChild(tbl);
};

const compareArrays = (arr, val) => {
  let idxs = [];
  arr.forEach((value, index) => {
    if (value != val[index]) {
      idxs.push(index);
    }
  });
  return idxs;
};

document.querySelector("#clearForm").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#phasmo").innerHTML = "";
  const elements = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      elements[i].checked = false;
    }
  }
});
