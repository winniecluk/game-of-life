var init = [
[0, 1, 1],
[1, 1, 0],
[1, 1, 1]
]

nextGen(init);

function nextGen(petri){
  // loops through each row
  var copiedArr = petri.slice();
  var nextGenArr = [];
  for (let i = 0; i < petri.length; i++){
    // loops through each element
    nextGenArr.push([]);
    for (let j = 0; j < petri[i].length; j++){
      let neighbors = [];
      let thisElement = petri[i][j];
      neighbors.push(thisElement);

      if (0 === i){
        if (j === 0){
          let re = pushStatements({
            firstCol: true,
            lastCol: false,
            firstRow: true,
            lastRow: false
          });
          eval(re.join(''));
        } else if (j === petri[i].length - 1){
          let re = pushStatements({
            firstCol: false,
            lastCol: true,
            firstRow: true,
            lastRow: false
          });
          eval(re.join(''));
        } else {
          let re = pushStatements({
            firstCol: true,
            firstRow: true,
            lastCol: true,
            lastRow: false
          });
          eval(re.join(''));
        }
      } else if (petri.length - 1 === i){
        if (j === 0){
          let re = pushStatements({
            firstCol: true,
            lastCol: false,
            firstRow: false,
            lastRow: true
          });
          eval(re.join(''));
        } else if (j === petri[i].length - 1){
          let re = pushStatements({
            firstCol: false,
            lastCol: true,
            firstRow: false,
            lastRow: true
          });
          eval(re.join(''));
        } else {
          let re = pushStatements({
            firstCol: true,
            firstRow: false,
            lastCol: true,
            lastRow: true
          });
          eval(re.join(''));
        }
      } else {
        if (j === 0){
          let re = pushStatements({
            firstCol: true,
            lastCol: false,
            firstRow: true,
            lastRow: true
          });
          eval(re.join(''));
        } else if (j === petri[i].length - 1){
          let re = pushStatements({
            firstCol: false,
            lastCol: true,
            firstRow: true,
            lastRow: true
          });
          eval(re.join(''));
        } else {
          let re = pushStatements({
            firstCol: true,
            firstRow: true,
            lastCol: true,
            lastRow: true
          });
          eval(re.join(''));
        }
      }
      var change = evaluateNeighbors(thisElement, neighbors);
      if (change){
        thisElement = thisElement === 0 ? 1 : 0;
        console.log('inside change');
      }
      console.log(thisElement);
      nextGenArr[i].push(thisElement);
    } // closes j loop
  } // closes i loop
  console.log(nextGenArr);
  return nextGenArr;
} // closes function


function evaluateNeighbors(thisElement, neighbors){
  if (0 === thisElement){
    let arrs1 = 0;
    for (let i = 0; i < neighbors.length; i++){
      if (1 === neighbors[i]){
        arrs1++;
      }
    }
    if (arrs1 === 3){
      return true;
    } else {
      return false;
    }
  } else if (1 === thisElement){
    let arrs1 = 0;
    for (let i = 0; i < neighbors.length; i++){
      if (1 === neighbors[i]){
        arrs1++;
      }
    }
    if (arrs1 < 2){
      return true;
    } else if (arrs1 > 3){
      return true;
    } else {
      return false;
    }
  }

}

function pushStatements(configObj){
  var statements = [];
  if (configObj.firstRow){
      statements.push('neighbors.push(petri[i + 1][j]);');
    if (configObj.firstCol){
      statements.push('neighbors.push(petri[i + 1][j + 1]);');
    }
    if (configObj.lastCol){
      statements.push('neighbors.push(petri[i + 1][j - 1]);');
    }
  }
  if (configObj.lastRow){
    statements.push('neighbors.push(petri[i - 1][j]);');
    if (configObj.firstCol){
      statements.push('neighbors.push(petri[i - 1][j + 1]);');
    }
    if (configObj.lastCol){
      statements.push('neighbors.push(petri[i - 1][j - 1]);');
    }
  }
  if (configObj.firstCol){
      statements.push('neighbors.push(petri[i][j + 1]);');
  }
  if (configObj.lastCol){
      statements.push('neighbors.push(petri[i][j - 1]);');
  }
  return statements;
}
