class ShoppingCart {
    constructor(catalog) {
        this.catalog = catalog;
        this.items = {} ;
        this.discount = 0;
    }

    addProduct(productId, quantity) {
        if (quantity <= 0) {
            throw new Error("Количество товара должно быть положительным");
        }
        if (!(productId in this.catalog)) {
            throw new Error(`Товар '${productId}' не найден в каталоге`);
        }

        const product = this.catalog[productId];
        const currentInCart = this.items[productId] || 0;

        if (currentInCart + quantity > product.stock) {
            throw new Error(
            `Недостаточно товара '${productId}' на складе: ` +
            `доступно ${product.stock}, ` +
            `в корзине уже ${currentInCart}, ` +
            `запрошено ещё ${quantity}`
            );
        }
        this.items[productId] = currentInCart + quantity;
    }

    deleteProduct(productId, quantity) {
        if (quantity <= 0) {
           throw new Error("Количество товара должно быть положительным")
        }
        if (!(productId in this.items)) {
            throw new Error(`Товар '${productId}' не найден в корзине`);
        }
        if (quantity > this.items[productId]) {
            throw new Error("Недостаточно товара в корзине");
        }

        if (quantity === this.items[productId]) {
            delete this.items[productId];
        }
        else {
            this.items[productId] -= quantity;
        }
    }

    applyPromotion(percent) {
        if (percent < 0 || percent > 100) {
            throw new Error("Скидка должна быть в диапазоне 0..100")
        }
        this.discount = percent;
    }

    totalSum() {
        let total = 0;
        for (const productId in this.items) {
            const quantity = this.items[productId];
            const product = this.catalog[productId];
            total += product.price * quantity;
        }
        return total * (1 - this.discount / 100);
    }
}

module.exports = ShoppingCart;