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
        record2 = new Record("Elton John", "Goodbye Yellow Brick Road", "Pop", 12);
        record3 = new Record("Funky BeeJays", "Gettin' Busy", "Jazz", 7);
        record4 = new Record("RazorLight", "Up All Night", "Indie", 9);
        record5 = new Record("Lil Yacthy", "Bring It Back", "Rap", 16);
        customer1 = new Customer("Upul", 140);
        customer2 = new Customer("Big Daddy Kane", 100);

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
        assert.deepStrictEqual(store.getByGenre("Pop"), [record2])
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

    it("Customer should be able to get value of genre in their collection", function(){
        customer1.buyRecordFromShop(record1, store);
        customer1.buyRecordFromShop(record1, store);
        assert.strictEqual(customer1.getGenreValue("Country"), 20)
    })

    it("Customer should be able to sort collection by most valuable", function(){
        customer1.buyRecordFromShop(record1, store);
        customer1.buyRecordFromShop(record2, store);
        assert.deepStrictEqual(customer1.sortRecordsByValue(), [record2, record1])
    })

    it("Customer should be able to get most valuable record", function(){
        customer1.buyRecordFromShop(record1, store);
        customer1.buyRecordFromShop(record2, store);
        assert.deepStrictEqual(customer1.getMostValuableRecord(), [record2])
    })

    it("Customer should be able to compare their collection to another", function(){
        store.addRecord(record3);
        store.addRecord(record4);
        store.addRecord(record5);
        customer1.buyRecordFromShop(record1, store);
        customer1.buyRecordFromShop(record2, store);
        customer2.buyRecordFromShop(record3, store);
        customer2.buyRecordFromShop(record4, store);
        customer2.buyRecordFromShop(record5, store);
        assert.strictEqual(store.compareCustomerCollections(customer1, customer2), customer2)
    })
    
})