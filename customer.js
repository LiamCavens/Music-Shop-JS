let Customer = function(name, wallet){
    this.name = name;
    this.wallet = wallet;
    this.recordCollection = [];
}

Customer.prototype.buyRecordFromShop = function(record, store){
    if(this.wallet >= record.price){
    this.wallet -= record.price;
    this.recordCollection.push(record);
    store.sellRecord(record);
}};

Customer.prototype.getCollectionValue = function(){

    return this.recordCollection.reduce(function(acc, record){
        return acc += record.price;
    }, 0)
}

Customer.prototype.getGenreValue = function(genre){

    return this.recordCollection.reduce(function(acc, record){
        if( record.genre === genre){
          return acc += record.price;
        }
        return acc;
    }, 0)
}

Customer.prototype.sortRecordsByValue = function () {
    return this.recordCollection.sort(function(recordA, recordB){
        return recordB.price - recordA.price;
    });
}

Customer.prototype.getMostValuableRecord = function(){
    return this.sortRecordsByValue().slice(0,1);
}

module.exports = Customer;