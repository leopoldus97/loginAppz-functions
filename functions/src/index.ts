import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependency-factory';

const serviceAccount = require("../secret.json");
const difa = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loginappz-58eae.firebaseio.com"
});

// User controller

exports.setCreationDate = functions.firestore
  .document('users/{userID}')
  .onCreate((snap, context) => {
    return difa.getUserController().setCreationDate(snap, context);
  });

exports.deleteUserFromAuth = functions.auth
  .user()
  .onDelete((userData, context) => {
    return difa.getUserController().deleteUserFromAuth(userData, context);
  });

exports.deleteUserFromFirestore = functions.firestore
  .document('users/{userID}')
  .onDelete((snap, context) => {
    return difa.getUserController().deleteUserFromFirestoreUsers(snap, context);
  });

exports.changeUserAccess = functions.firestore
  .document('users/{userID}')
  .onUpdate((change, context) => {
    return difa.getUserController().changeUserAccess(change, context);
  });

// Product controller

exports.createOrder = functions.firestore
  .document('users/{userID}/orders/{orderID}')
  .onCreate((snap, context) => {
    return difa.getProductController().createOrder(snap, context);
  });

exports.deleteStockOfProduct = functions.firestore
  .document('products/{productID}')
  .onDelete((snap, context) => {
    console.log('index');
    return difa.getProductController().deleteProduct(snap, context);
  });

exports.updateProductAvailability = functions.firestore
  .document('stock/{productID}')
  .onUpdate((change, context) => {
    return difa.getProductController().updateStock(change, context);
  });

exports.productWritten = functions.firestore
  .document('products/{productID}')
  .onWrite((change, context) => {
    return difa.getProductController().writeProduct(change, context);
  });
