import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$;
  public product = {};
  public id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
   }

  ngOnInit() {
    this.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).subscribe((p) => {
        this.product = p;
        console.log('fetched Product', p);
      });
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((val) => {
      this.categories$ = val;
      console.log(val);
    });
  }

  save(product) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
    // this.productService.onCreate().subscribe((value) => {
    //   console.log(value);
    // });
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
