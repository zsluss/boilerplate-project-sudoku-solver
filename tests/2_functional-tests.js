const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('solve valid puzzle', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.solution, '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
                done();
            });
    });
    test('solve invalid puzzle', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send(({
            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Required field missing');
                done();
            });
    });
    test('solve invalid characters puzzle', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send(({
                puzzle: '..9..5.1.85.4....2432....a.1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });
    test('solve incorrect length puzzle', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69....6.62.71...9......1945....4.37.4.3..6..'
            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });
    test('cant be solved puzzle', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send(({
                puzzle: '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Puzzle cannot be solved');
                done();
            });
    });
    test('POST to check all fields', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: '7',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.valid, true);
                done();
            });
    });
    test('POST to check single placement conflict', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A4',
                value: '1',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.valid, false);
                assert.equal(res.body.conflict, 'row')
                done();
            });
    });
    test('POST to check 2 placement conflict', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A5',
                value: '1',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.valid, false);
                assert.equal(res.body.conflict.length, 2)
                done();
            });
    });
    test('POST to check 3 placement conflict', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A2',
                value: '5',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.valid, false);
                assert.equal(res.body.conflict.length, 3)
                done();
            });
    });
    test('POST to check missing info conflict', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                value: '5',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Required field(s) missing');
                done();
            });
    });
    test('POST to check invalid characters conflict', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: 'a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '7',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Invalid characters in puzzle');
                done();
            });
    });
    test('POST to check incorrect length', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '7',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });
    test('POST to check invalid coordinate', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'p1',
                value: '7',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Invalid coordinate');
                done();
            });
    });
    test('POST to check invalid placement', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send(({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '17',

            }))
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body.error, 'Invalid value');
                done();
                after(function () {
                    chai.request(server)
                        .get('/api/issues/apitest/')
                });
            });
    });

});

