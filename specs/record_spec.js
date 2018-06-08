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
        record2 = new Record("Elton John", "Goodbye Yellow Brick Road", "Indie", 12);
        record3 = new Record("Funky BeeJays", "Gettin' Busy", "Jazz", 7);
        customer1 = new Customer("Upul", 140);

        store.addRecord(record1);
        store.addRecord(record2);
    });

    it("Should start with two records in inventory", function(){
        assert.strictEqual(store.inventory.length, 2);
    });

    it("Should be able to show record info", function(){
        assert.strictEqual(record1.info(), "Artist: Mumford & Sons, Title: Babel, Genre: Country, Price: 10.");
    });

    it("Should be able to list records in inventory", function(){        
        assert.deepStrictEqual(store.showRecords(), [record1.info(), record2.info()]);
    });

    it("Should be able to sell record and store balance goes up", function(){
        store.sellRecord(record1);
        assert.strictEqual(store.balance, 510);
    })

    it("Should be able to show stor financial status", function(){
        assert.strictEqual(store.showFinancialStatus(), 522);
    });

    it("Should be able to return records by genre", function(){
        assert.deepStrictEqual(store.getByGenre("Indie"), [record2])
    })

    it("Customer should be able to buy records, wallet is also affected", function(){
        customer1.buyRecordFromShop(record1, store);
        assert.strictEqual(customer1.recordCollection.length, 1);
        assert.strictEqual(customer1.wallet, 130)
    })

    it("Customer cannot buy record if funds less than price", function(){
        customer1.wallet = 5;
        customer1.buyRecordFromShop(record1, store);
        assert.strictEqual(customer1.recordCollection.length, 0);
    });

    it("Customer should be able to get value of collection", function(){
        customer1.buyRecordFromShop(record1, store);
        customer1.buyRecordFromShop(record2, store);
        assert.strictEqual(customer1.recordCollection.length, 2);
        assert.strictEqual(customer1.getCollectionValue(), 22)
    })

    it("Customer should be able to get value of genre in hs collection", function(){
        customer1.buyRecordFromShop(record1, store);
        customer1.buyRecordFromShop(record1, store);
        assert.strictEqual(customer1.getGenreValue("Country"), 20)
    })
})