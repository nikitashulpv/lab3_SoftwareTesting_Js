const Product = require('../src/Product');
const ShoppingCart = require('../src/ShoppingCart');

describe('ShoppingCart', () => {

    let cart;

    beforeEach(() => {
        const catalog = {
            "prod_1": new Product("prod_1", "Смартфон", 29999, 10),
            "prod_2": new Product("prod_2", "Наушники", 3000, 5),
        };
        cart = new ShoppingCart(catalog);
    });

    test('промокод 10%', () => {
        cart.addProduct("prod_1", 1);
        cart.applyPromotion(10);
        expect(cart.totalSum()).toBeCloseTo(26999.1, 2);
    });

    test('промокод 0% - без скидки', () => {
        cart.addProduct("prod_1", 1);
        cart.applyPromotion(0);
        expect(cart.totalSum()).toBeCloseTo(29999, 2);
    });

    test('промокод -1 - исключение', () => {
        cart.addProduct("prod_1", 1);
        expect(() => cart.applyPromotion(-1)).toThrow();
    });

    test('промокод 101 - исключение', () => {
        cart.addProduct("prod_1", 1);
        expect(() => cart.applyPromotion(101)).toThrow();
    });

    test('промокод 100% - бесплатно', () => {
        cart.addProduct("prod_1", 1);
        cart.applyPromotion(100);
        expect(cart.totalSum()).toBe(0);
    });

    test('промокод на пустой корзине', () => {
        cart.applyPromotion(10);
        expect(cart.totalSum()).toBe(0);
    });

    test('промокод 10% на несколько товаров', () => {
        cart.addProduct("prod_1", 2);
        cart.addProduct("prod_2", 3);
        cart.applyPromotion(10);
        expect(cart.totalSum()).toBeCloseTo((59998 + 9000) * 0.9, 2);
    });

    test('добавление нового товара', () => {
        cart.addProduct("prod_1", 3);
        expect(cart.items).toEqual({ "prod_1": 3 });
    });

    test('добавление существующего - суммирование', () => {
        cart.addProduct("prod_1", 3);
        cart.addProduct("prod_1", 2);
        expect(cart.items).toEqual({ "prod_1": 5 });
    });

    test('добавление 0 - исключение', () => {
        expect(() => cart.addProduct("prod_1", 0)).toThrow();
    });

    test('добавление отрицательного - исключение', () => {
        expect(() => cart.addProduct("prod_1", -1)).toThrow();
    });

    test('добавление неизвестного товара - исключение', () => {
        expect(() => cart.addProduct("nonexistent", 1)).toThrow();
    });

    test('превышение склада - исключение', () => {
        expect(() => cart.addProduct("prod_1", 11)).toThrow();
    });

    test('превышение склада с уже добавленным', () => {
        cart.addProduct("prod_1", 8);
        expect(() => cart.addProduct("prod_1", 5)).toThrow();
    });

    test('частичное удаление', () => {
        cart.addProduct("prod_1", 5);
        cart.deleteProduct("prod_1", 2);
        expect(cart.items).toEqual({ "prod_1": 3 });
    });

    test('полное удаление', () => {
        cart.addProduct("prod_1", 5);
        cart.deleteProduct("prod_1", 5);
        expect(cart.items).not.toHaveProperty("prod_1");
    });

    test('удаление 0 - исключение', () => {
        cart.addProduct("prod_1", 5);
        expect(() => cart.deleteProduct("prod_1", 0)).toThrow();
    });

    test('удаление неизвестного - исключение', () => {
        expect(() => cart.deleteProduct("prod_1", 1)).toThrow();
    });

    test('удаление больше чем есть - исключение', () => {
        cart.addProduct("prod_1", 3);
        expect(() => cart.deleteProduct("prod_1", 5)).toThrow();
    });

    test('стоимость пустой корзины', () => {
        expect(cart.totalSum()).toBe(0);
    });

    test('стоимость одного товара', () => {
        cart.addProduct("prod_1", 2);
        expect(cart.totalSum()).toBe(59998);
    });

    test('стоимость нескольких товаров', () => {
        cart.addProduct("prod_1", 2);
        cart.addProduct("prod_2", 3);
        expect(cart.totalSum()).toBe(68998);
    });
});