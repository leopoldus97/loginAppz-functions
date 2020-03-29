import {Order} from './order';

export interface User {
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  orders: Order[];
  role: string;
  uid: string;
}
