String.prototype.replaceAt = function (index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + 1, replacement.length);
}


class SudokuSolver {

  validate(puzzleString, res) {
    if (puzzleString === undefined) { return 'fieldmissing' }
    if (puzzleString.length !== 81) {
      return 'toolong'
    }
    for (let i = 0; i < puzzleString.length; i++) {
      let test = puzzleString[i].includes('.') || /[1-9]/.test(puzzleString[i])
      if (!test) { return 'invalid' }
    }
    return 'valid'
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
    for (let j = 0; j < 81; j += 9) {
      let lessLoc = j + 10
      let iValue = j + 1
      let iLess = j + 10
      if (location < lessLoc && location > j) {
        for (let i = iValue; i < iLess; i++) {
          if (value === puzzleString.charAt(i - 1)) return 'inRow'
        }
      };
    }
    return 'RowAvail'
  }

  checkColPlacement(puzzleString, row, column, value) {
    const location = ((row - 1) * 9) + column * 1

    if (value === puzzleString.charAt(location - 1)) { return 'correct' }
    for (let i = 0; i < 81; i += 9) {
      let charSpot = i + column * 1
      if (value === puzzleString.charAt(charSpot - 1)) return 'inColumn'
    }
    return 'ColumnAvail'
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const location = ((row - 1) * 9) + column * 1
    let grid
    if (row >= 1 && row <= 3 && column <= 3 && column >= 1) { grid = 1 };
    if (row >= 1 && row <= 3 && column <= 6 && column >= 4) { grid = 4 };
    if (row >= 1 && row <= 3 && column <= 9 && column >= 7) { grid = 7 };
    if (row >= 4 && row <= 6 && column <= 3 && column >= 1) { grid = 28 };
    if (row >= 4 && row <= 6 && column <= 6 && column >= 4) { grid = 31 };
    if (row >= 4 && row <= 6 && column <= 9 && column >= 7) { grid = 34 };
    if (row >= 7 && row <= 9 && column <= 3 && column >= 1) { grid = 55 };
    if (row >= 7 && row <= 9 && column <= 6 && column >= 4) { grid = 58 };
    if (row >= 7 && row <= 9 && column <= 9 && column >= 7) { grid = 61 };

    for (let i = 0; i < 27; i += 9) {
      let start = grid + i
      for (let j = 0; j < 3; j++) {
        if (value == puzzleString.charAt(start + j - 1)) { return 'inRegion' }
      }
    }
    return 'RegionAvail'
  }


  solve(puzzleString) {
    if (puzzleString.length !== 81) {return 'toolong'}
    let rowRes,colRes,regRes,exit= 0
    let answer = puzzleString;
    while (answer.includes('.')) {
      for (let i = 1; i < 82; i++) {
        let row, column
        if (!/[1-9]/.test(answer.charAt(i - 1))) {
          row = String(Math.ceil(i / 9))
          for (let j = i; j > 0; j -= 9) {
            if (j < 10 && j > 0) { column = String(j) }
          }
        
        let one = "", two = "", three = "", four = "", five = "", six = "", seven = "", eight = "", nine = ""
        for (let k = 1; k < 10; k++){
               for (let l = 0; l < 81; l += 9) {
            let lessLoc = l + 10
            let iValue = l + 1
            let iLess = l + 10
            if (i < lessLoc && i > l) {
              for (let n = iValue; n < iLess; n++) {
                let test = answer.charAt(n - 1)
                if (String(k) === String(test)) {
                  rowRes = 'inRow';
                }
              };
            }
          }
          for (let m = 0; m < 81; m += 9) {
            let charSpot = m + column * 1
            let tester = answer.charAt(charSpot - 1)
            if (String(k) === String(tester)) { colRes = 'inColumn' }
          }
          if(this.checkRegionPlacement(answer, row, column, k) === 'inRegion'){regRes = 'inRegion'}
          if (rowRes === 'inRow' || colRes === 'inColumn' || regRes === 'inRegion') {
            switch (String(k)) {
              case '1':
                one = 'fail';
                break;
              case '2':
                two = 'fail';
                break;
              case '3':
                three = 'fail';
                break;
              case '4':
                four = 'fail';
                break;
              case '5':
                five = 'fail';
                break;
              case '6':
                six = 'fail';
                break;
              case '7':
                seven = 'fail';
                break;
              case '8':
                eight = 'fail';
                break;
              case '9':
                nine = 'fail';
                break;
            }
          }
          if (one === 'fail' && two === 'fail' && three === 'fail' && four === 'fail' && five === 'fail' && six === 'fail' && seven === 'fail' && eight === 'fail' && nine === 'fail' && !/[1-9]/.test(answer.charAt(i - 1))) {return 'fail'}
          if (two === 'fail' && three === 'fail' && four === 'fail' && five === 'fail' && six === 'fail' && seven === 'fail' && eight === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 1) }
          if (one === 'fail' && three === 'fail' && four === 'fail' && five === 'fail' && six === 'fail' && seven === 'fail' && eight === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 2) }
          if (one === 'fail' && two === 'fail' && four === 'fail' && five === 'fail' && six === 'fail' && seven === 'fail' && eight === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 3) }
          if (one === 'fail' && two === 'fail' && three === 'fail' && five === 'fail' && six === 'fail' && seven === 'fail' && eight === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 4) }
          if (one === 'fail' && two === 'fail' && three === 'fail' && four === 'fail' && six === 'fail' && seven === 'fail' && eight === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 5) }
          if (one === 'fail' && two === 'fail' && three === 'fail' && four === 'fail' && five === 'fail' && seven === 'fail' && eight === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 6) }
          if (one === 'fail' && two === 'fail' && three === 'fail' && four === 'fail' && five === 'fail' && six === 'fail' && eight === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 7) }
          if (one === 'fail' && two === 'fail' && three === 'fail' && four === 'fail' && five === 'fail' && six === 'fail' && seven === 'fail' && nine === 'fail') { answer = answer.replaceAt(i - 1, 8) }
          if (one === 'fail' && two === 'fail' && three === 'fail' && four === 'fail' && five === 'fail' && six === 'fail' && seven === 'fail' && eight === 'fail') { answer = answer.replaceAt(i - 1, 9) }
         
          colRes = ""
          regRes = ""
          rowRes = ""
          if (!answer.includes('.')) {
          if(answer.match(/1/gi).length !== 9) return 'fail'
          if(answer.match(/2/gi).length !== 9) return 'fail'
          if(answer.match(/3/gi).length !== 9) return 'fail'
          if(answer.match(/4/gi).length !== 9) return 'fail'
          if(answer.match(/5/gi).length !== 9) return 'fail'
          if(answer.match(/6/gi).length !== 9) return 'fail'
          if(answer.match(/7/gi).length !== 9) return 'fail'
          if(answer.match(/8/gi).length !== 9) return 'fail'
          if(answer.match(/9/gi).length !== 9) return 'fail'
          return answer
                        }
            }

         
                    }
        if (!answer.includes('.')) return answer
      }
      //exit in case it gets stuck
      
      exit++
      if (exit === 100) {
        return'fail'

      }}
    
    return answer
  }
}
module.exports = SudokuSolver;

