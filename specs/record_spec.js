var assert = require('assert');
var Record = require('../record.js');
var Store = require('../store.js');
var Customer = require('../customer.js');

describe("Record", function() {

    var store;
    var record1;
    var record2;
    var record3;
    var customer1;
    var customer2;

    beforeEach(function() {
        store = new Store("Upuls Mad Music Emporium", "Motherwell", 500);
        record1 = new Record("Mumford & Sons", "Babel", "Country", 10);
        record2 = new Record("Elton John", "Goodbye Yellow Brick Road", 12);
        record3 = new Record("Funky BeeJays", "Gettin' Busy", 7);

        store.addRecord(record1);
        store.addRecord(record2);
    });

    it("Should start with two records in inventory", function(){
        assert.strictEqual(store.inventory.length, 2)
    })

    it("Should be able to show record info", function(){
        assert.strictEqual(record1.info(), "Artist: Mumford & Sons, Title: Babel, Genre: Country, Price: 10.")
    })
})