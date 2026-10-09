import { data } from '../data.js';
import { Product } from '../interfaces/productInterface.js';

export const products: Product[] = data.map((element) => ({
    name: element.name,
    category: element.category,
    price: element.price,
    stock: element.stock,
}));
