const Product = require('../src/Product');

describe('Product', () => {

    test('создание с валидными данными', () => {
        const p = new Product("prod_1", "Смартфон", 29999, 10);
        expect(p.id).toBe("prod_1");
        expect(p.name).toBe("Смартфон");
        expect(p.price).toBe(29999);
        expect(p.stock).toBe(10);
    });

    test('отрицательная цена - исключение', () => {
        expect(() => new Product("prod_1", "X", -1, 10)).toThrow();
    });

    test('отрицательный stock - исключение', () => {
        expect(() => new Product("prod_1", "X", 100, -1)).toThrow();
    });

    test('isAvailable true при stock > 0', () => {
        const p = new Product("prod_1", "X", 100, 5);
        expect(p.isAvailable()).toBe(true);
    });

    test('isAvailable false при stock = 0', () => {
        const p = new Product("prod_1", "X", 100, 0);
        expect(p.isAvailable()).toBe(false);
    });

    test('reduceStock уменьшает stock', () => {
        const p = new Product("prod_1", "X", 100, 10);
        p.reduceStock(3);
        expect(p.stock).toBe(7);
    });

    test('reduceStock слишком много - исключение', () => {
        const p = new Product("prod_1", "X", 100, 5);
        expect(() => p.reduceStock(10)).toThrow();
    });

    test('toString содержит id и name', () => {
        const p = new Product("prod_1", "Смартфон", 29999, 10);
        const s = p.toString();
        expect(s).toContain("prod_1");
        expect(s).toContain("Смартфон");
    });
});