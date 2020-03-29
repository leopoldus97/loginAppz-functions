import {Stock} from '../models/stock';
import {Order} from '../models/order';
import {Product} from '../models/product';
import {ProductRepository} from './product.repository';

export class ProductService {

  constructor(private repo: ProductRepository) {}

  updateStock(prodID: string, stockBef: Stock, stockAft: Stock): Promise<any> {
    if (stockBef.count < 0)
      stockBef.count = 0;
    if (stockAft.count === 0)
      return this.repo.updateInStock(prodID, false);
    else {
      return this.repo.updateInStock(prodID, true);
    }
  }

  createOrder(userID: string, order: Order): Promise<any> {
    this.repo.timeStampForOrder(userID, order.id).catch(error => console.log(error));
    return this.repo.updateStockAtPurchase(order.purchasedProduct, order.purchasedCount);
  }

  writeProduct(prodID: string, productBef: Product, productAft: Product): Promise<any> {
    if (!productBef)
    {
      const stock: Stock = {productID: prodID, count: 5};
      return this.repo.createStockForNewProduct(stock);
    }
    if (productBef.name.toUpperCase() !== productAft.name)
    {
      const name = productAft.name.toUpperCase();
      const product = {
        inStock: productAft.inStock,
        name: name,
        price: productAft.price
      };
      return this.repo.setProduct(prodID, product);
    }
    return null as any;
  }

  deleteProduct(prodID: string): Promise<any> {
    console.log('service');
    return this.repo.deleteStock(prodID);
  }
}
