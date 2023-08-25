const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver= new Solver;
let validPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."

suite('Unit Tests', () => {
    test('Valid puzzle', function() {
       assert.equal(solver.validate(validPuzzle),'valid') 
    });
    test('invalid characters', function() {
       assert.equal(solver.validate("1.5..2.84..63.12.7.2..5....a9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."), 'invalid')
    });
    test('length check', function() {
        assert.equal(solver.validate("1.5..2.84..63.12.7.2..5.......8.2.3674.3.7.2..9.47...8..1..16....926914.37."), 'toolong')
     });
     test('valid row', function() {
        assert.equal(solver.checkRowPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,1,'7'), 'RowAvail')
     });
     test('invalid row', function() {
        assert.equal(solver.checkRowPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,1,'9'), 'inRow')
     });
     test('valid column', function() {
        assert.equal(solver.checkColPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,1,'7'), 'ColumnAvail')
     });
     test('invalid column', function() {
        assert.equal(solver.checkColPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,1,'8'), 'inColumn')
     }); 
     test('valid region', function() {
     assert.equal(solver.checkRegionPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,1,'7'), 'RegionAvail')
    });
    test('invalid region', function() {
       assert.equal(solver.checkRegionPlacement("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",1,1,'8'), 'inRegion')
    });
    test('Valid puzzle', function() {
        assert.notEqual(solver.solve(validPuzzle), 'fail') 
     }); 
     test('Invalid puzzle', function() {
        assert.equal(solver.solve('115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), 'fail') 
     });
     test('Incomplete puzzle', function() {
        assert.equal(solver.solve('115..2.84..63.12.7.2..5.....9...8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), 'toolong') 
     });  


});
