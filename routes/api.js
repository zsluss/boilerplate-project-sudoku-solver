'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post ( (req, res) => {
      console.log("coordinate: ",req.body.coordinate,"puzzle: ",req.body.puzzle,"value: ",req.body.value)
      if(req.body.puzzle === undefined || req.body.puzzle === "" || req.body.coordinate === undefined|| req.body.coordinate === "" || req.body.value  === undefined || req.body.value  === ""){ return res.json({error:'Required field(s) missing' })}
      let row = req.body.coordinate.at(0)
      let column = req.body.coordinate.at(1)
      let puzzle = req.body.puzzle
      let value = req.body.value


      if(solver.validate(puzzle, res)){return}
      if(value < 1 || value > 9 || !(/[1-9]/.test(value)) ){return res.json({error: 'Invalid value'})}
      if (!(/[1-9]/.test(column)) || !(/[A-Ia-i]/.test(row))|| req.body.coordinate.length > 2) { return res.json({error: 'Invalid coordinate'})}
      row = solver.letterToNumber(row)
      let conflict = []
      let checkRow = solver.checkRowPlacement(puzzle,row,column,value)
      let checkColumn = solver.checkColPlacement(puzzle,row,column,value)
      let checkRegion = solver.checkRegionPlacement(puzzle,row,column,value)
      if(checkRow === 'inRow'){conflict.push('row')}
      if(checkColumn === 'inColumn'){conflict.push('column')}
      if(checkRegion === 'inRegion'){conflict.push('region')}
      if(checkRow === 'correct'){ return res.json({valid: true})}
      if( checkColumn === 'inColumn'||checkRegion === 'inRegion'|| checkRow === 'correct'){
      return res.json(
        {valid: false,
          conflict: conflict})}
      console.log("works")
      res.json({valid : true})

      // make an object to be return if it fails any of the row/col/regions
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      if(solver.validate(puzzle, res)){return}

         });
};
