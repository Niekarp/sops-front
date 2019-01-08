import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DataService } from "../data.service";
import { FormGenerator } from "../form-generator/form-generator";
import { Observable } from "rxjs";
import { ProductAvarageRating } from "../models/product-avarage-rating";
import { UserInfo } from "../models/user-info";
import { ProfileDetails } from "../models/profile-details";

@Component({
  selector: "app-product-panel",
  templateUrl: "./product-panel.component.html",
  styleUrls: ["./product-panel.component.css"]
})
export class ProductPanelComponent implements OnInit {
  product: Product = new Product();
  rating: ProductAvarageRating = new ProductAvarageRating();
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id == null) {
      return;
    }
    this.dataService.getObject(Product, +id).subscribe(result => {
      this.product = result.object;
      this.dataService
        .getObjectByUrl(
          ProductAvarageRating,
          `api/ProductRating/Avarage/${this.product.id}`
        )
        .subscribe(result => {
          this.rating = result.object;
        });
      for (let i = 0; i < this.product.productComments.length; i++) {
        this.dataService
          .getObjectByUrl(
            ProfileDetails,
            `api/User/Profile?id=${
              this.product.productComments[i].applicationUserId
            }`
          )
          .subscribe(result => {
            this.product.productComments[i].user = result.object;
          });
      }
    });
  }
}