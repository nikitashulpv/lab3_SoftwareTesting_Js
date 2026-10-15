class Product {
    constructor(id, name, price, stock) {
        if (price < 0) {
            throw new Error("Цена не может быть отрицательной");
        }
        if (stock < 0) {
            throw new Error("Количество на складе не может быть отрицательным");
        }

        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    isAvailable() {
        return this.stock > 0;
    }

    reduceStock(amount) {
        if (amount > this.stock) {
            throw new Error("Недостаточно товара на складе")
        }
        this.stock -= amount;
    }

    toString() {
        return `Product{id='${this.id}', name='${this.name}', price=${this.price}, stock=${this.stock}}`;
    }
}

module.exports = Product;