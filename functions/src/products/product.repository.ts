import {Stock} from '../models/stock';
import {Product} from '../models/product';

export interface ProductRepository {
  timeStampForOrder(userID: string, orderID: string): Promise<any>;

  createStockForNewProduct(stock: Stock): Promise<any>;

  updateStockAtPurchase(productID: string, count: number): Promise<any>;

  updateInStock(productID: string, inStock: boolean): Promise<any>;

  deleteStock(prodID: string): Promise<any>;

  setProduct(productID: string, product: Product): Promise<any>;

  setProducts(productID: string, product: Product): Promise<any>;
}
