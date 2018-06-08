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

module.exports = Store;