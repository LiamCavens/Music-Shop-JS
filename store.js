let Store = function(name, city, balance){
    this.name = name;
    this.city = city;
    this.balance = balance;
    this.inventory = [];
}

Store.prototype.addRecord = function(record){
    this.inventory.push(record);
}

Store.prototype.showRecords = function(){
    return this.inventory.map(function (record){
        return record.info();
    });
}

Store.prototype.sellRecord = function(record){
    this.balance += record.price;
}

Store.prototype.showFinancialStatus = function(){
    let financialBalance = this.balance;

    this.inventory.forEach(function(record){
        financialBalance += record.price;
    });
    return financialBalance;
}

Store.prototype.getByGenre = function(genre){
    let recordsByGenre = [];

    this.inventory.forEach(function (record){
        if(record.genre === genre){
            recordsByGenre.push(record);
        }
    });
    return recordsByGenre;
}

Store.prototype.compareCustomerCollections = function(cust1, cust2){
    if (cust1.getCollectionValue() > cust2.getCollectionValue()){
        return cust1;
    } else if (cust1.getCollectionValue() < cust2.getCollectionValue()){
        return cust2;
    } else {
        return "Both are equal";
    }
}

module.exports = Store;