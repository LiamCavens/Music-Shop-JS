let Store = function(name, city, balance){
    this.name = name;
    this.city = city;
    this.balance = balance;
    this.inventory = [];
}

Store.prototype.addRecord = function(record){
    this.inventory.push(record);
}

module.exports = Store;