import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Statistic } from "../models/statistic";
import { Product } from "../models/product";
import { Company } from "../models/company";
import { NewsStatistic } from '../models/newsStatistics';

@Component({
  selector: "app-statistic",
  templateUrl: "./statistic.component.html",
  styleUrls: ["./statistic.component.css"]
})
export class StatisticComponent implements OnInit {
  statistic: Statistic = new Statistic();
  newsStatistics: NewsStatistic = new NewsStatistic();
  lastAddedProduct: Product = new Product();
  lastAddedCompany: Company = new Company();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getStatistic();
    this.getNewsStatistic();
    this.getLastProduct();
    this.getLastCompany();
  }

  getStatistic(): void {
    this.dataService
      .getObjectByUrl(Statistic, "api/Statistic/getallcount")
      .subscribe(result => {
        this.statistic = result.object;
      });
  }

  getNewsStatistic(): void {
    this.dataService
      .getObjectByUrl(NewsStatistic, "api/Statistic/LastMonthCount")
      .subscribe(result => {
        this.newsStatistics = result.object;
      });
  }

  getLastProduct(): void {
    this.dataService
      .getObjectByUrl(Product, "api/Product/Newest")
      .subscribe(result => {
        this.lastAddedProduct = result.object;
      });
  }

  getLastCompany(): void {
    this.dataService
      .getObjectByUrl(Company, "api/Company/Newest")
      .subscribe(result => {
        this.lastAddedCompany = result.object;
      });
  }

  currentLastMonthCompanyDifference(): number {
    return this.statistic.companiesCount - this.newsStatistics.lastMonthCompanyCount;
  }

  currentLastMonthProductDifference(): number {
    return this.statistic.allProductsCount - this.newsStatistics.lastMonthProductCount;
  }
}
