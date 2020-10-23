const tests = ["EMF", "Temp", "Box", "Writing", "Orbs", "Finger"]
const ghosts = ["Phantom", "Banshee", "Jinn", "Revenant", "Shade", "Oni", "Wraith", "Mare", "Demon", "Yurei", "Polstergeist", "Spirit"]
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

const calculate = document.addEventListener("submit", e => {
  e.preventDefault()
  const elements = document.getElementById("myForm").elements
  let arr = [] 
  for (let i = 0; i < elements.length - 1; i++) {
    let item = elements[i]
    arr.push(item.checked ? 1 : 0)
  }
  // console.log(arr)
  checkTests(arr, ghosts, values)
}) 

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