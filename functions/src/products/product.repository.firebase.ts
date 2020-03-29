import {Stock} from '../models/stock';
import * as admin from 'firebase-admin';
import {Product} from '../models/product';
import {ProductRepository} from './product.repository';
import Timestamp = admin.firestore.Timestamp;

export class ProductRepositoryFirebase implements ProductRepository{

  usersPath = 'users';
  stockPath = 'stock';
  productsPath = 'products';

  timeStampForOrder(userID: string, orderID: string): Promise<any> {
    return this.db().doc(`${this.usersPath}/${userID}/orders/${orderID}`).update({
      creationDate: Timestamp.now()
    });
  }

  createStockForNewProduct(stock: Stock): Promise<any> {
    return this.db().doc(`${this.stockPath}/${stock.productID}`).create({count: stock.count});
  }

  updateStockAtPurchase(productID: string, count: number): Promise<any> {
    return this.db().doc(`${this.stockPath}/${productID}`).get().then(function(doc) {
      const stock: Stock = doc.data() as Stock;
      stock.count -= count;
      admin.firestore().doc(`stock/${productID}`).update(stock).catch(error => console.log(error));
    });
  }

  updateInStock(productID: string, inStock: boolean): Promise<any> {
    return this.db().doc(`${this.productsPath}/${productID}`).update({inStock: inStock});
  }

  deleteStock(productID: string): Promise<any> {
    console.log('repository');
    return this.db().doc(`${this.stockPath}/${productID}`).delete();
  }

  setProduct(productID: string, product: Product): Promise<any> {
    return this.db().doc(`${this.productsPath}/${productID}`).set(product);
  }

  setProducts(productID: string, product: Product): Promise<any> {
    return this.db().doc(`${this.productsPath}/${productID}`).set(product);
  }

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }
}
