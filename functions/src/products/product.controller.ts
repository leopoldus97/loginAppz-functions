import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';

export interface ProductController {
  updateStock(change: Change<DocumentSnapshot>, context: EventContext): Promise<any>;

  createOrder(snap: DocumentSnapshot, context: EventContext): Promise<any>;

  writeProduct(change: Change<DocumentSnapshot>, context: EventContext): Promise<any>;

  deleteProduct(snap: DocumentSnapshot, context: EventContext): Promise<any>;
}
