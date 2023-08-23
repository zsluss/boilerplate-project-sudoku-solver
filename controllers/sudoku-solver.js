class SudokuSolver {

  validate(puzzleString, res) {
    if (puzzleString === undefined) { return res.json({ error: 'Required field missing' }) }
    if (puzzleString.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' })
    }
    for (let i = 0; i < puzzleString.length; i++) {
      let test = puzzleString[i].includes('.') || /[1-9]/.test(puzzleString[i])
      if (!test) { return res.json({ error: 'Invalid characters in puzzle' }) }
    }
    return
  }

  letterToNumber(row) {
    row = row.toUpperCase()
    if (row === 'A') return 1
    if (row === 'B') return 2
    if (row === 'C') return 3
    if (row === 'D') return 4
    if (row === 'E') return 5
    if (row === 'F') return 6
    if (row === 'G') return 7
    if (row === 'H') return 8
    if (row === 'I') return 9
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const location = ((row - 1) * 9) + column * 1
    if (value === puzzleString.charAt(location - 1)) { return 'correct' }
    for(let j = 0; j < 81; j+=9){
      let lessLoc = j + 10
      let iValue = j + 1
      let iLess = j + 10
    if (location < lessLoc && location > j) {
      for (let i = iValue; i < iLess; i++) {
        if (value === puzzleString.charAt(i - 1)) return 'inRow'
      }
    };}
    return 'RowAvail'
  }

  checkColPlacement(puzzleString, row, column, value) {
    const location = ((row - 1) * 9) + column * 1 
    if (value === puzzleString.charAt(location - 1)) { return 'correct' }
    for(let i = 0; i<81; i+=9){
    let charSpot = i + column * 1
if(value === puzzleString.charAt(charSpot - 1)) return 'inColumn'
    }
    return 'ColumnAvail'
  }

  checkRegionPlacement(puzzleString, row, column, value) {65
    const location = ((row - 1) * 9) + column * 1
    let grid
 if(row >= 1 && row <= 3 && column <= 3 && column >=1){grid = 1};
 if(row >= 1 && row <= 3 && column <= 6 && column >=4){grid = 4};
 if(row >= 1 && row <= 3 && column <= 9 && column >=7){grid = 7};
 if(row >= 4 && row <= 6 && column <= 3 && column >=1){grid = 28};
 if(row >= 4 && row <= 6 && column <= 6 && column >=4){grid = 31};
 if(row >= 4 && row <= 6 && column <= 9 && column >=7){grid = 34};
 if(row >= 7 && row <= 9 && column <= 3 && column >=1){grid = 55};
 if(row >= 7 && row <= 9 && column <= 6 && column >=4){grid = 58};
 if(row >= 7 && row <= 9 && column <= 9 && column >=7){grid = 61};
 
 for(let i=0; i <  27; i+=9){
  let start = grid + i 
  for(let j = 0; j < 3; j++){
    if(value === puzzleString.charAt(start + j - 1)){return 'inRegion'}
  }}
return 'RegionAvail'
}


  solve(puzzleString) {


  }
}

module.exports = SudokuSolver;

