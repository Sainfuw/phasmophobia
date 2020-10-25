const tests = ["EMF nivel 5", "Tempemperatura bajo cero", "Spiritbox", "Escritura Fantasma", "Orbes", "Huellas Dactilares"]
const ghosts = ["Ente", "Banshee", "Jinn", "Revenant", "Sombra", "Oni", "Espectro", "Pesadilla", "Demonio", "Yurei", "Polstergeist", "Espiritu"]
const values = [ 
  [1,1,0,0,1,0],
  [1,1,0,0,0,1],
  [1,0,1,0,1,0],
  [1,0,0,1,0,1],
  [1,0,0,1,1,0],
  [1,0,1,1,0,0],
  [0,1,1,0,0,1],
  [0,1,1,0,1,0],
  [0,1,1,1,0,0],
  [0,1,0,1,1,0],
  [0,0,1,0,1,1],
  [0,0,1,1,0,1]
]

const checkboxes = document.querySelectorAll('input[type=checkbox]')
for(var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function(){
      const elements = document.getElementById("myForm").elements
      let arr = [] 
      for (let i = 0; i < elements.length; i++) {
        let item = elements[i]
        arr.push(item.checked ? 1 : 0)
      }
      // console.log(arr)
      checkTests(arr, ghosts, values)
    })
}

const checkTests = (arr, ghosts, values) => {
  let tempG = [...ghosts]
  let tempV = [...values]
  let rem = []
  let results = {}
  for(let x = 0; x < arr.length; x++) {
    if (arr[x] > 0) {
      for(let y = 0; y < tempV.length; y++) {
        if (tempV[y][x] != 1) {
          rem.push(y)
        }
      }
    }
  }
  rem = rem.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []).sort((a,b) => a-b)
  rem.reverse().forEach(val => {
    tempG.splice(val, 1)
    tempV.splice(val, 1)
  })
  // console.log(tempV, arr);

  tempV.forEach((val, index) => {
    idxs = compareArrays(arr, val)
    // console.log(idxs);
    idxs.forEach(value => {
      // console.log(tempG[index])
      // console.log(tests[value]);
      if (results[tempG[index]] != undefined) {
        results[tempG[index]].push(tests[value])
      } else {
        results[tempG[index]] = [tests[value]]
      }
    })
  })

  // let final = []
  // for (let result in results) {
  //   final.push(...results[result])
  // }
  // console.log(final.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []))

  const phasmo = document.getElementById("phasmo")
  phasmo.innerHTML = ""
  const tbl = document.createElement("table")
  const tblBody = document.createElement("tbody")
  tbl.className += "table table-dark"
  tbl.setAttribute("id", "myTable");
  for (let result in results) {
    const tr = document.createElement("tr")

    const td1 = document.createElement("th")
    const td2 = document.createElement("td")

    const text1 = document.createTextNode(`${result}`)
    const text2 = document.createTextNode(`${results[result]}`)

    td1.appendChild(text1)
    td2.appendChild(text2)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tblBody.appendChild(tr)
  }
  tbl.appendChild(tblBody)
  phasmo.appendChild(tbl)
}

const compareArrays = (arr, val) => {
  let idxs = []
  arr.forEach((value, index) => {
    if (value != val[index]) {
      idxs.push(index)
    }
  })
  return idxs
}

document.querySelector('#clearForm').addEventListener('click', (e) => {
  e.preventDefault()
  document.querySelector('#phasmo').innerHTML = ''
  const elements = document.querySelectorAll('input[type=checkbox]')
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      elements[i].checked = false
    }
  }
})