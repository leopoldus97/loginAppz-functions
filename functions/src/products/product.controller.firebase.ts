import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {Order} from '../models/order';
import {Stock} from '../models/stock';
import {Product} from '../models/product';

export class ProductControllerFirebase implements ProductController{
  constructor(private service: ProductService) {}

  createOrder(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    const id = context.params.userID;
    const ordID = context.params.orderID;
    const order: Order = snap.data() as Order;
    order.id = ordID;
    return this.service.createOrder(id, order);
  }

  deleteProduct(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    console.log('controller');
    const id = context.params.productID;
    return this.service.deleteProduct(id);
  }

  updateStock(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const id = context.params.productID;
    const stockBef: Stock = change.before.data() as Stock;
    const stockAft: Stock = change.after.data() as Stock;
    return this.service.updateStock(id, stockBef, stockAft);
  }

  writeProduct(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const id = context.params.productID;
    const productBef: Product = change.before.data() as Product;
    const productAft: Product = change.after.data() as Product;
    return this.service.writeProduct(id, productBef, productAft);
  }

}
