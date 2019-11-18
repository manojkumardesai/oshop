import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products').snapshotChanges().pipe(map((products) => {
      console.log(products);
      return products.map(product => ({ key: product.payload.key, ...product.payload.val() }));
    }));
  }

  onCreate() {
    return this.db.list('/products').valueChanges();
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
